import { useFavoritesDataStore } from "../stores/favoritesData";
import { useNewsDataStore } from "../stores/newsData";
import { useTokenDataStore } from "../stores/tokenData";

export type StoreBundle = {
  favoritesStore: ReturnType<typeof useFavoritesDataStore>;
  newsDataStore: ReturnType<typeof useNewsDataStore>;
  tokenStore: ReturnType<typeof useTokenDataStore>;
};
