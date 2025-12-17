import axios from "axios";
import router from "../../router";
import {
  ACCESS_TOKEN_ERR,
  REFRESH_TOKEN_ERR,
} from "../../assets/data/tokenErrArray";
import { refresh, logout } from "../AuthApis";
import { openAlert } from "../../utils/alert";
import { useTokenDataStore } from "../../stores/tokenData";
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;
export const backendInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
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

backendInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const useAuthStore = useTokenDataStore();
    const originalRequest = error.config;
    const { data } = error.response;
    const code = data.code;

    // accessToken 만료 시
    if (ACCESS_TOKEN_ERR.includes(code)) {
      const res = await refresh();
      const newAccessToken = res.data.accessToken;
      useAuthStore.setAccessToken(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // accessToken 갱신 후 재시도
      return await axios(originalRequest);

      // refreshToken 만료 시
    } else if (
      REFRESH_TOKEN_ERR.includes(code) &&
      code !== "REFRESH_TOKEN_MISSING" // 초기 화면에서 강제 로그아웃 실행 방지
    ) {
      // 강제 로그아웃
      await logout();
      useAuthStore.setAccessToken("");
      openAlert({
        title: "Session Expired",
        text: "Your session has expired. Please log in again to continue.",
        icon: "error",
      });
      router.push({ name: "Login" });
    }

    return Promise.reject(error);
  }
);
