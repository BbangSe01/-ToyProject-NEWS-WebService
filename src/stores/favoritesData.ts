import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { useNewsType } from "../types/newsType";
import { postFavRequest, deleteFavRequest } from "../apis/FavoritesApis";
import { warningToast } from "../utils/warningtoast";
export const useFavoritesDataStore = defineStore("favoritesData", () => {
  const favoritesData = ref<useNewsType[]>([]);
  const favUrlList = computed(() => favoritesData.value.map((x) => x.url));
  const isLoaded = ref<boolean>(false);

  const setFavoritesData = (
    newData: Omit<useNewsType, "content" | "source">[]
  ) => {
    favoritesData.value = newData;
  };

  const postFavorites = async (newsData: useNewsType) => {
    try {
      await postFavRequest(newsData);
      favoritesData.value = [...favoritesData.value, newsData];
      return true;
    } catch (err) {
      console.error(err);
      warningToast("Failed to register favorites!");
      return false;
    }
  };

  const deleteFavorites = async (url: string) => {
    try {
      await deleteFavRequest(url);
      const idx = favoritesData.value.findIndex((x) => x.url === url);
      if (idx !== -1) {
        favoritesData.value.splice(idx, 1);
      }
      return true;
    } catch (err) {
      console.error(err);
      warningToast("Failed to delete favorites!");
      return false;
    }
  };

  return {
    favoritesData,
    favUrlList,
    isLoaded,
    setFavoritesData,
    postFavorites,
    deleteFavorites,
  };
});
