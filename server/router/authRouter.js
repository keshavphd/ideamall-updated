import { Router } from "express";
import authController from "../controller/authController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = Router();

router.route("/register-user").post(authController.registerUser);
router.route("/verify-user").post(authController.verifyUser);
router.route("/login-user").post(authController.loginUser);
router.route("/logout-user").get(auth, authController.logoutUser);
router
  .route("/upload-avatar")
  .put(auth, upload.single("avatar"), authController.uploadAvatar);
router.route("/update-user").put(auth, authController.updateUser);
router.route("/forgot-password").put(authController.forgotPassword);
router.route("/verify-otp").put(authController.verifyForgotPasswordOTP);
router.route("/reset-password").put(authController.resetPassword);
router.route("/refresh-token").post(authController.refreshToken);
router.route("/user-detail").get(auth, authController.userDetail);

export default router;
