import { defineStore } from "pinia";
import { ref } from "vue";
import type { useNewsType } from "../types/newsType";

export const useNewsDataStore = defineStore("newsData", () => {
  const detailData = ref<useNewsType>({
    author: "",
    description: "",
    publishedAt: "",
    title: "",
    url: "",
    urlToImage: "",
  });

  const setDetailData = (newData: useNewsType) => {
    detailData.value = newData;
  };

  return { detailData, setDetailData };
});
