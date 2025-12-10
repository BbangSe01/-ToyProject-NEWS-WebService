import { defineStore } from "pinia";
import { ref } from "vue";
import type { useNewsType } from "../types/newsType";

export const useSearchDataStore = defineStore(
  "searchData",
  () => {
    const searchData = ref<useNewsType[]>([]);
    const searchWord = ref<string>("");

    const setSearchWord = (word: string) => {
      searchWord.value = word;
    };

    const setSearchData = (data: useNewsType[]) => {
      searchData.value = data;
    };

    const resetSearchWord = () => {
      searchWord.value = "";
    };

    return {
      searchData,
      searchWord,
      setSearchWord,
      setSearchData,
      resetSearchWord,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["searchWord"],
    },
  }
);
