import axios from "axios";

const baseURL = import.meta.env.VITE_NEWS_BASE_URL;
const authURL = import.meta.env.VITE_AUTH_BASE_URL;
export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 2000,
});

export const authInstance = axios.create({
  baseURL: authURL,
  timeout: 2000,
});
