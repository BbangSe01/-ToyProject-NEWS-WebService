import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;
export const backendInstance = axios.create({
  baseURL: backendURL,
  timeout: 2000,
});
