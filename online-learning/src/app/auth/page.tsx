"use client";
import React, { Suspense, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useGoogleConfig } from "@/providers/GoogleAuthProvider";
import AuthForm from "@/components/AuthForm";

function AuthPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params?.get("redirect") || "/dashboard";
  const { setUser, setAuthenticated } = useAuthStore();
  const { isConfigured: googleConfigured } = useGoogleConfig();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
  }>({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const startGoogleLogin = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      if (!tokenResponse.access_token) {
        toast.error("Google sign-in failed: missing token");
        return;
      }

      setLoading(true);
      try {
        const auth = await import("@/lib/auth");
        const res = await auth.loginWithGoogle(tokenResponse.access_token);
        if (res.success) {
          if (res.user) setUser(res.user);
          else setUser({ name: "Google User", email: "" });
          setAuthenticated(true);
          toast.success("Signed in with Google");
          const destination = res.user?.role === "admin" ? "/admin" : redirect;
          router.push(destination);
        } else {
          toast.error(res.message || "Google sign-in failed");
        }
      } catch (err: unknown) {
        let message = "Something went wrong";
        if (err instanceof Error) message = err.message;
        else message = String(err);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google sign-in error", errorResponse);
      toast.error("Google sign-in failed");
    },
  });

  const handleGoogle = () => {
    if (!googleConfigured) {
      toast.error("Google sign-in is not configured.");
      return;
    }
    startGoogleLogin();
  };

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = await import("@/lib/auth");
      const res = await auth.requestPasswordReset(form.email);
      if (res.success) {
        toast.success("Password reset link sent to your email!");
        setForgotPassword(false);
      } else {
        toast.error(res.message || "Could not send reset link");
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

  if (forgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-gray-600 mt-2">
              Enter your email to receive reset instructions
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>

            <button
              type="button"
              onClick={() => setForgotPassword(false)}
              className="w-full text-gray-600 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all"
            >
              Back to Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Sign in to your account" : "Join us today"}
          </p>
        </div>

        {/* Toggle between Login and Signup */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              isLogin
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              !isLogin
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <AuthForm
          mode={isLogin ? "login" : "register"}
          loading={loading}
          initial={form}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const auth = await import("@/lib/auth");
              if (isLogin) {
                const res = await auth.login({
                  email: values.email,
                  password: values.password,
                });
                if (res.success) {
                  // use returned user info when available
                  if (res.user) setUser(res.user);
                  else setUser({ name: values.name, email: values.email });
                  setAuthenticated(true);
                  const destination =
                    res.user?.role === "admin" ? "/admin" : redirect;
                  router.push(destination);
                } else {
                  toast.error(res.message || "Login failed");
                }
              } else {
                const res = await auth.register({
                  name: values.name,
                  email: values.email,
                  password: values.password,
                });
                if (res.success) {
                  toast.success(
                    "Account created successfully! Please sign in."
                  );
                  setIsLogin(true);
                } else {
                  toast.error(res.message || "Registration failed");
                }
              }
            } catch (err: unknown) {
              let message = "Something went wrong";
              if (err instanceof Error) message = err.message;
              else message = String(err);
              toast.error(message);
            } finally {
              setLoading(false);
            }
          }}
          onForgot={() => setForgotPassword(true)}
          onGoogle={handleGoogle}
          googleDisabled={!googleConfigured}
        />

        {/* Terms */}
        {!isLogin && (
          <p className="text-xs text-gray-500 text-center mt-6">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy Policy
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
