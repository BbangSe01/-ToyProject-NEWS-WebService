import { authInstance } from "./axiosInstance";
import type { SignupType } from "../types";
export const signup = async ({ username, password, password2 }: SignupType) => {
  try {
    const res = await authInstance.post("user/register", {
      username,
      password,
      password2,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
