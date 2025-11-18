import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetLink,
  sendVerifyEmail,
  verifyEmail,
  me,
  googleAuth,
  googleAuthCallback,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-email", userAuth, sendVerifyEmail);
authRouter.post("/verify-account", verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/me", userAuth, me);
authRouter.post("/send-reset-link", sendResetLink);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google", googleAuth);

export default authRouter;
