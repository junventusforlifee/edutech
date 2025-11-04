import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Neotisa Learning Platform",
      text: `Welcome to Neotisa online-learning platform. Your account has been created with email id: ${email}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error("sendMail error (register):", mailErr, { mailOptions });
      // don't block account creation because of mail issues; inform caller
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isAccountVerified,
        role: user.role,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    console.log("login attempt for:", email);
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }
    // debug: show that a hash exists (don't log full hash in production)
    console.log(
      "storedPasswordHash (truncated):",
      user.password ? user.password.substring(0, 10) : "no-hash"
    );
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("bcrypt.compare result:", isMatch);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isAccountVerified,
        role: user.role,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (mailErr) {
      console.error("sendMail error (verify):", mailErr, { mailOption });
    }
    res.json({ success: true, message: "Verification OTP sent to email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    // if userAuth middleware ran it should set req.body.userId
    const userId = req.body.userId;
    if (!userId)
      return res.json({ success: false, message: "Not authenticated" });
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    return res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId)
      return res.json({ success: false, message: "Not authenticated" });
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// send password reset link (token)
export const sendResetLink = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    // generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    // set token and expiry (e.g., 1 hour)
    user.resetToken = token;
    user.resetTokenExpireAt = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetUrl = `${frontendUrl}/reset-password?token=${token}&email=${encodeURIComponent(
      user.email
    )}`;

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset link",
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}

If you didn't request this, ignore this email. The link expires in 1 hour.`,
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (mailErr) {
      console.error("sendMail error (reset link):", mailErr, { mailOption });
      // Continue: don't block the response for email issues
    }

    return res.json({
      success: true,
      message: "Reset link sent to your email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Reset user password

export const resetPassword = async (req, res) => {
  const { token, newPassword, email } = req.body;

  if (!token || !newPassword) {
    return res.json({
      success: false,
      message: "Token and new password are required",
    });
  }

  try {
    // find user by token (optionally match email too)
    const user = await userModel.findOne({ resetToken: token });
    if (!user)
      return res.json({ success: false, message: "Invalid or expired token" });

    if (user.resetTokenExpireAt < Date.now()) {
      return res.json({ success: false, message: "Token expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = "";
    user.resetTokenExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
