import { authInstance } from "./instance/PublicHttp";
import type { SignupType } from "../types";
export const signup = async ({ username, password }: SignupType) => {
  return await authInstance.post("register", {
    username,
    password,
  });
};

export const login = async ({ username, password }: SignupType) => {
  return await authInstance.post("login", {
    username,
    password,
  });
};
