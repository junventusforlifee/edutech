import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetLink,
  sendVerifyOtp,
  verifyEmail,
  me,
  googleAuth,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/me", userAuth, me);
authRouter.post("/send-reset-link", sendResetLink);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google", googleAuth);
authRouter.get("/google", (req, res) => {
  res.status(200).send("Google OAuth GET endpoint is working.");
});

export default authRouter;
