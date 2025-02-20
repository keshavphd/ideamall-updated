import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Provide token",
      });
    }
    const isVerify = await jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY
    );

    req.userId = isVerify.userID;

    if (!isVerify) {
      return res.json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      error:true,
      success:false,
      msg: "Please Login first",
    });
  }
};

export default auth;
