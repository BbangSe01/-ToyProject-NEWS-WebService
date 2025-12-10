import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { NewsType } from "../types/newsType";
import { postFavRequest, deleteFavRequest } from "../apis/FavoritesApis";
import { warningToast } from "../utils/warningtoast";
export const useFavoritesDataStore = defineStore("favoritesData", () => {
  const favoritesData = ref<Omit<NewsType, "content" | "source">[]>([]);
  const favUrlList = computed(() => favoritesData.value.map((x) => x.url));
  const isLoaded = ref<boolean>(false);

  const setFavoritesData = (
    newData: Omit<NewsType, "content" | "source">[]
  ) => {
    favoritesData.value = newData;
  };

  const postFavorites = async (newsData: NewsType) => {
    try {
      const { content, source, ...sendData } = newsData;
      await postFavRequest(sendData);
      favoritesData.value = [...favoritesData.value, sendData];
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
