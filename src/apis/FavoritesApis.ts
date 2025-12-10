import { backendInstance } from "./instance/TokenHttp";
import type { NewsType } from "../types";
export const getFavorites = async () => {
  const res = await backendInstance.get("/favorites", {
    timeout: 20000,
  });
  return res;
};

export const postFavRequest = async (
  sendData: Omit<NewsType, "content" | "source">
) => {
  const res = await backendInstance.post(
    "/favorites",
    {
      ...sendData,
    },
    {
      timeout: 20000,
    }
  );
  return res;
};

export const deleteFavRequest = async (url: string) => {
  const res = await backendInstance.delete("/favorites", {
    data: { url },
    timeout: 20000,
  });
  return res;
};
