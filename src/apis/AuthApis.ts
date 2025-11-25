import { authInstance } from "./axiosInstance";
import type { SignupType } from "../types";
export const signup = async ({ username, password }: SignupType) => {
  return await authInstance.post("user/register", {
    username,
    password,
  });
};
