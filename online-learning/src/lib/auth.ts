import api from "./api";
import { isAxiosError } from "axios";

type RegisterPayload = { name: string; email: string; password: string };
type LoginPayload = { email: string; password: string };

export async function register(payload: RegisterPayload) {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}

export async function login(payload: LoginPayload) {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}

export async function logout() {
  try {
    const { data } = await api.post("/auth/logout");
    return data;
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}

export async function getCurrentAuth() {
  try {
    const { data } = await api.post("/auth/me");
    return data; // backend returns { success: true, user }
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const { data } = await api.post("/auth/send-reset-link", { email });
    return data;
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}

export async function resetPassword(payload: {
  token: string;
  newPassword: string;
}) {
  try {
    const { data } = await api.post("/auth/reset-password", payload);
    return data;
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}

export async function sendVerifyOtp(userId: string) {
  try {
    const { data } = await api.post("/auth/send-verify-otp", { userId });
    return data;
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}

export async function verifyEmail(payload: { userId: string; otp: string }) {
  try {
    const { data } = await api.post("/auth/verify-account", payload);
    return data;
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}

export async function loginWithGoogle(accessToken: string) {
  try {
    const { data } = await api.post("/auth/google", { accessToken });
    return data;
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (isAxiosError(err)) {
      message = err.response?.data?.message ?? err.message ?? message;
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    return { success: false, message };
  }
}
