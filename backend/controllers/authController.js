import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { OAuth2Client } from "google-auth-library";

// Helper to set auth cookie with correct cross-site settings
function isProdLike() {
  const frontendUrl = process.env.FRONTEND_URL || "";
  return (
    process.env.NODE_ENV === "production" ||
    (typeof frontendUrl === "string" && frontendUrl.startsWith("https://"))
  );
}

function setAuthCookie(res, token) {
  const prod = isProdLike();
  res.cookie("token", token, {
    httpOnly: true,
    secure: prod,
    sameSite: prod ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

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

    setAuthCookie(res, token);

    // Sending welcome email with verification link
    const verifyToken = crypto.randomBytes(32).toString("hex");
    user.verifyToken = verifyToken;
    user.verifyTokenExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const verifyUrl = `${frontendUrl}/verify-email?token=${verifyToken}&email=${encodeURIComponent(
      email
    )}`;

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Neotisa Learning Platform - Verify Your Email",
      text: `Welcome to Neotisa online-learning platform. Your account has been created with email id: ${email}

Please verify your email by clicking the link below:
${verifyUrl}

This link expires in 24 hours.`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error("sendMail error (register):", mailErr, { mailOptions });
      // don't block account creation because of mail issues
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

    setAuthCookie(res, token);

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
    // clear cookie using same options so browser removes it
    const prod = isProdLike();
    res.clearCookie("token", {
      httpOnly: true,
      secure: prod,
      sameSite: prod ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendVerifyEmail = async (req, res) => {
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

    const verifyToken = crypto.randomBytes(32).toString("hex");
    user.verifyToken = verifyToken;
    user.verifyTokenExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const verifyUrl = `${frontendUrl}/verify-email?token=${verifyToken}&email=${encodeURIComponent(
      user.email
    )}`;

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Your Email - Neotisa",
      text: `Please verify your email by clicking the link below:
${verifyUrl}

This link expires in 24 hours.`,
    };

    try {
      await transporter.sendMail(mailOption);
      res.json({ success: true, message: "Verification link sent to email" });
    } catch (mailErr) {
      console.error("sendMail error (verify):", mailErr, { mailOption });
      res.json({
        success: false,
        message: "Failed to send verification email. Please try again later.",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token, email } = req.body;

  if (!token || !email) {
    return res.json({ success: false, message: "Missing token or email" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    if (user.verifyToken === "" || user.verifyToken !== token) {
      return res.json({
        success: false,
        message: "Invalid verification token",
      });
    }

    if (user.verifyTokenExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Verification token expired",
      });
    }

    user.isAccountVerified = true;
    user.verifyToken = "";
    user.verifyTokenExpireAt = 0;

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
    console.log("[DEBUG /auth/me] userId from middleware:", userId);
    console.log("[DEBUG /auth/me] cookies received:", req.cookies);
    if (!userId)
      return res.json({ success: false, message: "Not authenticated" });
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    console.log("[DEBUG /auth/me] user found, role:", user.role);
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
      return res.json({
        success: true,
        message: "Reset link sent to your email",
      });
    } catch (mailErr) {
      console.error("sendMail error (reset link):", mailErr, { mailOption });
      return res.json({
        success: false,
        message:
          "Failed to send reset email. Please try again later or contact support.",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const googleAuth = async (req, res) => {
  const { accessToken } = req.body;

  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({
      success: false,
      message: "Google sign-in is not configured on the server",
    });
  }

  if (!accessToken) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Google access token" });
  }

  try {
    const oauthClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    let tokenInfo;
    try {
      tokenInfo = await oauthClient.getTokenInfo(accessToken);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Google token" });
    }

    if (tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({
        success: false,
        message: "Google token audience mismatch",
      });
    }

    oauthClient.setCredentials({ access_token: accessToken });
    const { data: profile } = await oauthClient.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    const email = profile?.email ? String(profile.email).toLowerCase() : "";
    const nameFromProfile =
      profile?.name ||
      [profile?.given_name, profile?.family_name].filter(Boolean).join(" ");
    const name = nameFromProfile?.trim() || "Google User";
    const emailVerified = Boolean(profile?.email_verified);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Google account has no email" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        isAccountVerified: emailVerified,
      });
    } else {
      let shouldSave = false;
      if (!user.name && name) {
        user.name = name;
        shouldSave = true;
      }
      if (!user.isAccountVerified && emailVerified) {
        user.isAccountVerified = true;
        shouldSave = true;
      }
      if (shouldSave) {
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    setAuthCookie(res, token);

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
    console.error("googleAuth error", error);
    return res
      .status(500)
      .json({ success: false, message: "Google sign-in failed" });
  }
};

export const googleAuthCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      success: false,
      message:
        "Authorization code is missing. This endpoint is meant to handle callbacks from Google after a successful login. Please initiate the login process from the frontend.",
    });
  }

  try {
    const oauthClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://neotisa.com/auth/google/callback" // Replace with your redirect URI
    );

    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const { data: profile } = await oauthClient.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    const email = profile?.email ? String(profile.email).toLowerCase() : "";
    const nameFromProfile =
      profile?.name ||
      [profile?.given_name, profile?.family_name].filter(Boolean).join(" ");
    const name = nameFromProfile?.trim() || "Google User";
    const emailVerified = Boolean(profile?.email_verified);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Google account has no email" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        isAccountVerified: emailVerified,
      });
    } else {
      let shouldSave = false;
      if (!user.name && name) {
        user.name = name;
        shouldSave = true;
      }
      if (!user.isAccountVerified && emailVerified) {
        user.isAccountVerified = true;
        shouldSave = true;
      }
      if (shouldSave) {
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    setAuthCookie(res, token);

    return res.redirect("https://neotisa.com/student-dashboard"); // Redirect to your frontend dashboard
  } catch (error) {
    console.error("googleAuthCallback error", error);
    return res
      .status(500)
      .json({ success: false, message: "Google sign-in failed" });
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
