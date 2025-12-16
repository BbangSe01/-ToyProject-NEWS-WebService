<template>
  <button class="login-button" @click="changeLoginState">
    {{ tokenStore.loginState ? "Logout" : "Login" }}
  </button>
</template>

<script setup lang="ts">
  import { watch } from "vue";
  import { useTokenDataStore } from "../../../../stores/tokenData";
  import { useSearchDataStore } from "../../../../stores/searchData";
  import { useFavoritesDataStore } from "../../../../stores/favoritesData.ts";
  import { useRouter } from "vue-router";
  import { openAlert } from "../../../../utils/alert";
  import { getFavorites } from "../../../../apis/FavoritesApis";
  import { warningToast } from "../../../../utils/warningtoast.ts";
  import { logout } from "../../../../apis/AuthApis.ts";

  const tokenStore = useTokenDataStore();
  const searchStore = useSearchDataStore();
  const favoritesStore = useFavoritesDataStore();
  const router = useRouter();

  const changeLoginState = async () => {
    if (tokenStore.loginState) {
      // 로그아웃
      await logout();
      tokenStore.setAccessToken("");
      openAlert({
        title: "Success",
        text: "Logout!",
        icon: "success",
      });
      router.push({ name: "Headline" });
    } else {
      // 로그인
      router.push({ name: "Login" });
    }
    // 로그인/로그아웃 시, 검색어 초기화
    searchStore.resetSearchWord();
  };

  watch(
    () => tokenStore.loginState,
    async (newVal, oldVal) => {
      if (newVal) {
        try {
          const res = await getFavorites();
          favoritesStore.setFavoritesData(res.data.favorites);
          favoritesStore.isLoaded = true;
        } catch (err) {
          console.log(err);
        }
      } else {
        favoritesStore.setFavoritesData([]);
        favoritesStore.isLoaded = false;
      }
    },
    { immediate: true }
  );
</script>
<style>
  .login-button {
    font-family: "Merriweather", serif;
    width: 4rem;
    height: 2rem;
    border: 1px solid white;
    background-color: black;
    font-size: 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 1rem;
    color: inherit;
    text-decoration: none;
  }
  .login-button:hover {
    background-color: white;
    color: black;
  }
</style>
