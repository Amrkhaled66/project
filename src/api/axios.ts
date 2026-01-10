import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const axiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
