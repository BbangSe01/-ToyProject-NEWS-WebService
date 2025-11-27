import { backendInstance } from "./axiosInstance";
import type { SignupType } from "../types";
export const signup = async ({ username, password }: SignupType) => {
  return await backendInstance.post("user/register", {
    username,
    password,
  });
};

export const login = async ({ username, password }: SignupType) => {
  return await backendInstance.post("user/login", {
    username,
    password,
  });
};
