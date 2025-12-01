import { axiosInstance, backendInstance } from "./axiosInstance";
import type { SearchType } from "../types";
const apikey = import.meta.env.VITE_NEWS_API_KEY;

export const getHeadLineData = async (category: string) => {
  try {
    const res = await axiosInstance.get(
      `top-headlines?country=us&pageSize=7&category=${category}&apikey=${apikey}`
    );
    return res.data.articles;
  } catch (err) {
    console.error(err);
  }
};

export const searchNewsData = async ({ keyword, sortBy }: SearchType) => {
  try {
    const res = await axiosInstance.get(
      `everything?q=${keyword}&apiKey=${apikey}&sortBy=${sortBy}`
    );
    return res.data.articles;
  } catch (err) {
    console.error(err);
  }
};

export const getSummaryNews = async (newsUrl: string) => {
  const res = await backendInstance.post(
    "/summary",
    {
      newsUrl,
    },
    {
      timeout: 20000,
    }
  );
  return res;
};
