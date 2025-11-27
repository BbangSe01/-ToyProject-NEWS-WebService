import axios from "axios";

const baseURL = import.meta.env.VITE_NEWS_BASE_URL;
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;
export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 2000,
});

export const backendInstance = axios.create({
  baseURL: backendURL,
  timeout: 2000,
});
