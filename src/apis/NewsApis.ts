import axiosInstance from "./axiosInstance";

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

export const searchNewsData = async (keyword: string) => {
  try {
    const res = await axiosInstance.get(
      `everything?q=${keyword}&apiKey=${apikey}`
    );
    return res.data.articles;
  } catch (err) {
    console.error(err);
  }
};
