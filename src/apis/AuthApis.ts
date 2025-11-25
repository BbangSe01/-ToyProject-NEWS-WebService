import { authInstance } from "./axiosInstance";
import type { SignupType } from "../types";
export const signup = async ({ username, password }: SignupType) => {
  try {
    const res = await authInstance.post("user/register", {
      username,
      password,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
