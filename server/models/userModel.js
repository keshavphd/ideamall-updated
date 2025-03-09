import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import VerifyEmailTemplate from "../Template/verifyEmailTemplate.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import sendEmail from "../configuration/sendEmail.js";
dotenv.config();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    refresh_token: {
      type: String,
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login_date: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_detail: [
      {
        type: Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: Schema.ObjectId,
        ref: "cart",
      },
    ],
    orderHistory: [
      {
        type: Schema.ObjectId,
        ref: "order",
      },
    ],
    forgot_password_otp: {
      type: Number,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: "",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${user._id}`;

    sendEmail({
      subject: "Verify email from IdeaMall",
      html: VerifyEmailTemplate({
        name: user.name,
        url: verifyEmailUrl,
      }),
    });
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  try {
    return jwt.sign(
      { userID: this._id, email: this.email },
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "5h" }
    );
  } catch (error) {
    console.error(error);
  }
};

userSchema.methods.generateRefreshToken = async function () {
  try {
    const refreshToken = await jwt.sign(
      {
        userID: this._id,
        email: this.email,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    await User.findByIdAndUpdate(
      { _id: this._id },
      {
        refresh_token: refreshToken,
        last_login_date: new Date().toLocaleString(),
      }
    );

    return refreshToken;
  } catch (error) {
    console.error(error);
  }
};

const User = new model("User", userSchema);

export default User;
