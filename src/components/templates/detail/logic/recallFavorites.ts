import { GetFavorites } from "../../../../apis/FavoritesApis";
import type { Ref } from "vue";
import type { StoreBundle } from "../../../../types/storeType";
export const recallFavorites = async (
  { favoritesStore, newsDataStore, tokenStore }: StoreBundle,
  isChecking: Ref<boolean>,
  isFavorites: Ref<boolean>
) => {
  const detailData = newsDataStore.detailData;
  const checkFavorites = () => {
    return favoritesStore.favUrlList.includes(detailData.url);
  };

  // 로그인 이후 즐겨찾기 데이터 GET에 실패한 상태라면 즐겨찾기 api 재호출
  try {
    if (tokenStore.loginState && !favoritesStore.isLoaded) {
      isChecking.value = true;
      const res = await GetFavorites();
      favoritesStore.setFavoritesData(res.data.favorites);
      favoritesStore.isLoaded = true;
    }
  } catch (err) {
    console.error(err);
  } finally {
    isFavorites.value = checkFavorites();
    isChecking.value = false;
  }
};
