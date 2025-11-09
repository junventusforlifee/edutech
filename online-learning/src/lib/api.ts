import axios from "axios";

const fallbackBaseUrl = "http://localhost:5000/api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || fallbackBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
