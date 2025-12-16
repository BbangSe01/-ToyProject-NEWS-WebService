import type { SignupType } from "../types";
import { backendInstance } from "./instance/TokenHttp";
export const signup = async ({ username, password }: SignupType) => {
  return await backendInstance.post("/register", {
    username,
    password,
  });
};

export const login = async ({ username, password }: SignupType) => {
  return await backendInstance.post("/login", {
    username,
    password,
  });
};

export const logout = async () => {
  return await backendInstance.post("/logout");
};

export const refresh = async () => {
  return await backendInstance.post("/refresh");
};
