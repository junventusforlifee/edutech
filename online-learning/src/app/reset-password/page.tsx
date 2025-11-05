"use client";
import React, { Suspense, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function ResetPasswordPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params?.get("token") || "";
  const email = params?.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return toast.error("Invalid or missing token.");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const auth = await import("@/lib/auth");
      const res = await auth.resetPassword({ token, newPassword: password });
      if (res.success) {
        toast.success("Password reset successful. Please sign in.");
        router.push("/auth");
      } else {
        toast.error(res.message || "Reset failed");
      }
    } catch (err: unknown) {
      let message = "Something went wrong";
      if (err instanceof Error) message = err.message;
      else message = String(err);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Reset your password</h2>
        {email && (
          <p className="text-sm text-gray-600 mb-4">
            Resetting password for <strong>{email}</strong>
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border rounded px-3 py-2 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div className="mt-1 relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="block w-full border rounded px-3 py-2 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-medium"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Preparing reset form...</div>}
    >
      <ResetPasswordPageContent />
    </Suspense>
  );
}
