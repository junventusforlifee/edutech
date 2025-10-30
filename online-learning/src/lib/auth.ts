import api from "./api";

type RegisterPayload = { name: string; email: string; password: string };
type LoginPayload = { email: string; password: string };

export async function register(payload: RegisterPayload) {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message,
    };
  }
}

export async function login(payload: LoginPayload) {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message,
    };
  }
}

export async function logout() {
  try {
    const { data } = await api.post("/auth/logout");
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message,
    };
  }
}

export async function getCurrentAuth() {
  try {
    const { data } = await api.post("/auth/me");
    return data; // backend returns { success: true, user }
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message,
    };
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const { data } = await api.post("/auth/send-reset-otp", { email });
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message,
    };
  }
}

export async function resetPassword(payload: {
  email: string;
  otp: string;
  newPassword: string;
}) {
  try {
    const { data } = await api.post("/auth/reset-password", payload);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message,
    };
  }
}

export async function sendVerifyOtp(userId: string) {
  try {
    const { data } = await api.post("/auth/send-verify-otp", { userId });
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message,
    };
  }
}

export async function verifyEmail(payload: { userId: string; otp: string }) {
  try {
    const { data } = await api.post("/auth/verify-account", payload);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message,
    };
  }
}
