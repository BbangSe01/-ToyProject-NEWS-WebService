import { backendInstance } from "./instance/TokenHttp";

export const GetFavorites = async () => {
  const res = await backendInstance.get("/favorites", {
    timeout: 20000,
  });
  return res;
};
