<template>
  <button class="bookmark-btn" @click="goToFavPage">
    <img :src="bookmarkImg" alt="북마크" class="bookmark-img" />
    Bookmarks
  </button>
</template>

<script setup lang="ts">
  import bookmarkImg from "../../../../assets/images/bookmark-btn-img.png";
  import { useTokenDataStore } from "../../../../stores/tokenData";
  import { warningToast } from "../../../../utils/warningtoast";
  import { useRouter } from "vue-router";

  const tokenStore = useTokenDataStore();

  const router = useRouter();
  const goToFavPage = () => {
    if (tokenStore.loginState) {
      router.push({ name: "Favorites" });
    } else {
      warningToast("Available after logging in.");
    }
  };
</script>

<style>
  .bookmark-btn {
    font-family: "Merriweather", serif;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 0.5rem;
    background-color: white;
    color: black;
    border: 1px solid white;
    border-radius: 10px;
    font-size: 1rem;
  }
  .bookmark-img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
</style>
