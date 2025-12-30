<template>
  <button class="login-button" @click="changeLoginState">
    {{ tokenStore.loginState ? "Logout" : "Login" }}
  </button>
</template>

<script setup lang="ts">
  import { watch } from "vue";
  import { useTokenDataStore } from "../../../../stores/tokenData";
  import { useFavoritesDataStore } from "../../../../stores/favoritesData.ts";
  import { getFavorites } from "../../../../apis/FavoritesApis";
  import { changeLoginState } from "../logic/changeLoginState.ts";

  const tokenStore = useTokenDataStore();
  const favoritesStore = useFavoritesDataStore();

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
<style lang="scss">
  @use "../../../../assets/css/mixin.scss" as mixin;

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

    @include mixin.respond(mobile) {
      display: none;
    }
    @include mixin.respond(tablet) {
      margin-left: 0.5rem;
    }
  }
  .login-button:hover {
    background-color: white;
    color: black;
  }
</style>
