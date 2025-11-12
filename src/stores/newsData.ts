import { defineStore } from "pinia";
import { ref } from "vue";
import type { NewsType } from "../types/newsType";

export const useNewsDataStore = defineStore("newsData", () => {
  const detailData = ref<NewsType>({
    author: "",
    content: "",
    description: "",
    publishedAt: "",
    source: { name: "", id: "" },
    title: "",
    url: "",
    urlToImage: "",
  });

  const setDetailData = (newData: NewsType) => {
    detailData.value = newData;
  };

  return { detailData, setDetailData };
});
