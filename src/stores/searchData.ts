import { defineStore } from "pinia";
import { ref } from "vue";
import type { NewsType } from "../types/newsType";

export const useSearchDataStore = defineStore(
  "searchData",
  () => {
    const searchData = ref<NewsType[]>([]);
    const searchWord = ref<string>("");

    const setSearchWord = (word: string) => {
      searchWord.value = word;
    };

    const setSearchData = (data: NewsType[]) => {
      searchData.value = data;
    };

    return { searchData, searchWord, setSearchWord, setSearchData };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["searchWord"],
    },
  }
);
