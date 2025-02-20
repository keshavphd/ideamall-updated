import uploadImageCloudinary from "../middleware/uploadImageCloudinary.js";
import User from "../models/userModel.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../Template/forgotPasswordTemplate.js";
import sendEmail from "../configuration/sendEmail.js";
import generateHashPassword from "../utils/generateHashPassword.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ msg: "Please fill all the details" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({
        error: true,
        msg: "Email already exist.Please enter another email",
        success: false,
      });
    }

    const userCreated = await User.create(req.body);

    res.status(200).json({
      error: false,
      success: true,
      msg: "User created successsfully",
      userCreated,
    });
  } catch (error) {
    res.json({
      msg: "Internal server error",
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { code } = req.body;
    const searchUser = await User.findOne({ _id: code });

    if (!searchUser) {
      return res.status(400).json("Invalid Code");
    }

    if (searchUser.verify_email) {
      return res.status(400).json("Email is already verified");
    }

    await User.updateOne({ _id: code }, { verify_email: true });
    res.status(200).json("Email verified successfully");
  } catch (error) {
    res.status(500).json("Error in verifying your email");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.json({
        msg: "Email not registered, Please register first",
        error: true,
        success: false,
      });
    }

    if (userExist.status !== "Active") {
      return res.json({ msg: "Contact to Admin", error: true, success: false });
    }

    const checkPassword = await userExist.comparePassword(password);
    if (!checkPassword) {
      return res.json({
        msg: "Invalid credential",
        error: true,
        success: false,
      });
    }

    const accessToken = await userExist.generateAccessToken();
    const refreshToken = await userExist.generateRefreshToken();

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    res.status(200).json({
      msg: "Login Successfull",
      error: false,
      success: true,
      userToken: { accessToken, refreshToken },
    });
  } catch (error) {
    res.status(400).json("Error in Login");
  }
};

const logoutUser = async (req, res) => {
  try {
    const userid = req.userId;

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await User.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.status(200).json({
      msg: "Logout succesfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Provide token",
      error: true,
      success: false,
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const userID = req.userId;
    const image = req.file;

    const upload = await uploadImageCloudinary(image);
    console.log(upload);

    const updateUser = await User.findByIdAndUpdate(userID, {
      avatar: upload.url,
    });

    return res.status(200).json({
      message: "Image uploaded successfully",
      success: true,
      error: false,
      data: {
        _id: userID,
        avatar: upload.url,
      },
    });
  } catch (error) {
    res.status(400).json("unable to upload avatar");
  }
};

const updateUser = async (req, res) => {
  try {
    const userID = req.userId;
    const { name, email, password, phone } = req.body;

    let hashPassword = "";
    if (password) {
      hashPassword = await generateHashPassword(password);
    }

    const changedValue = await User.findByIdAndUpdate(
      userID,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password: hashPassword }),
        ...(phone && { phone }),
      },
      { new: true }
    );
    res.status(200).json({
      success:true,
      msg:"User updated successfully",
      updatedValue: changedValue,
    });
  } catch (error) {
    res.status(400).send("Error in updating");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.json({
        msg: "Email is not Registered,Kindly register first",
        success: false,
        error: true,
      });
    }
    const otp = generateOtp();
    const date = new Date();
    const expireTime = date.setDate(date.getMinutes() + 60);
    console.log(new Date());
    console.log(new Date(expireTime));

    await User.updateOne(
      { _id: userExist._id },
      {
        $set: {
          forgot_password_otp: otp,
          forgot_password_expiry: new Date(expireTime),
        },
      }
    );

    sendEmail({
      subject: "OTP for forgot password",
      html: forgotPasswordTemplate({
        name: userExist.name,
        otp: otp,
      }),
    });

    res
      .status(200)
      .json({ msg: "Check Your Email", error: false, success: true });
  } catch (error) {
    res.status(400).json("Unable to update password");
  }
};

const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.json({
        msg: "Email not registered!Please Register first",
        error: true,
        success: false,
      });
    }

    const date = new Date();
    const currentTime = new Date(date.setDate(date.getMinutes()));

    if (currentTime > userExist.forgot_password_expiry) {
      return res.json({ msg: "Otp Expired", error: true, success: false });
    }

    if (otp != userExist.forgot_password_otp) {
      return res.json({ msg: "OTP is incorrect", error: true, success: false });
    }

    await User.updateOne(
      { _id: userExist._id },
      { forgot_password_otp: "", forgot_password_expiry: "" }
    );

    res
      .status(200)
      .json({ msg: "OTP verified successfully", error: false, success: true });
  } catch (error) {
    return res.status(400).json("Unable to chek Op");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.json({
        msg: "User not registered",
        error: true,
        success: false,
      });
    }
    if (newPassword != confirmPassword) {
      return res.json({
        msg: "Please enter same Password in both the fields",
        error: true,
        success: false,
      });
    }
    const hash_Password = await generateHashPassword(newPassword);
    await User.updateOne({ email }, { $set: { password: hash_Password } });
    res
      .status(200)
      .json({ msg: "Password updated", error: false, success: true });
  } catch (error) {
    res.status(400).json("Password updation failed");
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req.headers.authentication.split("")[1];
    if (!refreshToken) {
      return res.status(400).json("Signin again");
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY
    );

    if (!verifyToken) {
      return res.status(400).json("Token Expired");
    }
    const userId = verifyToken.userID;

    const data = await User.findOne({ _id: userId });

    const accessToken = await data.generateAccessToken();
    console.log(accessToken);

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.status(200).json({ msg: "New token generated", data: accessToken });
  } catch (error) {
    res.status(400).json("Unable to generate accessToken");
  }
};

const userDetail = async (req, res) => {
  try {
    const userID = req.userId;

    const userDetail = await User.findById(userID).select({
      password: 0,
      refresh_token: 0,
    });

    res.status(200).json({ data: userDetail });
  } catch (error) {
    res.status(400).json("Error in fetching Details");
  }
};
export default {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  uploadAvatar,
  updateUser,
  forgotPassword,
  verifyForgotPasswordOTP,
  resetPassword,
  refreshToken,
  userDetail,
};
