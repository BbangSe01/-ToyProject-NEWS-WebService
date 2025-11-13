import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { NewsType } from "../types/newsType";

export const useSearchDataStore = defineStore("searchData", () => {
  const searchData = ref<NewsType[]>([]);

  const setSearchData = (data: NewsType[]) => {
    searchData.value = data;
  };

  return { searchData, setSearchData };
});
