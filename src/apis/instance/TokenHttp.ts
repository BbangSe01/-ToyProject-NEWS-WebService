import axios, { type AxiosRequestConfig } from "axios";
import { useTokenDataStore } from "../../stores/tokenData";
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;
export const backendInstance = axios.create({
  baseURL: backendURL,
  timeout: 2000,
});

backendInstance.interceptors.request.use(
  (config) => {
    const useAuthStore = useTokenDataStore();
    const token = useAuthStore.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
