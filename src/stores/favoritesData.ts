import { defineStore } from "pinia";
import { ref } from "vue";
import type { NewsType } from "../types/newsType";

export const useFavoritesDataStore = defineStore("favoritesData", () => {
  const favoritesData = ref<Omit<NewsType, "content" | "source">[]>([]);
  const isLoaded = ref<boolean>(false);

  const setFavoritesData = (
    newData: Omit<NewsType, "content" | "source">[]
  ) => {
    favoritesData.value = newData;
  };
  const addFavorites = (newData: Omit<NewsType, "content" | "source">) => {
    favoritesData.value = [...favoritesData.value, newData];
  };
  const deleteFavorites = (newData: Omit<NewsType, "content" | "source">) => {};

  return { favoritesData, isLoaded, setFavoritesData, addFavorites };
});
