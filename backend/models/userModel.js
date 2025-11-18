import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    isAccountVerified: { type: Boolean, default: false },
    // Email verification token
    verifyToken: { type: String, default: "" },
    verifyTokenExpireAt: { type: Number, default: 0 },
    // Password reset token
    resetToken: { type: String, default: "" },
    resetTokenExpireAt: { type: Number, default: 0 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
