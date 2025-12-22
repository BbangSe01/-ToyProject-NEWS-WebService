<template>
  <div class="nav-area">
    <div class="nav-area__title" @click="goToHeadline">News</div>
    <div class="nav-area__right">
      <SearchBar />
      <LoginButton />
      <BookmarkButton />
    </div>
  </div>
</template>

<script setup lang="ts">
  import SearchBar from "./parts/SearchBar.vue";
  import LoginButton from "../../parts/navbar/parts/LoginButton.vue";
  import BookmarkButton from "./parts/BookmarkButton.vue";
  import { useRouter } from "vue-router";
  import { useSearchDataStore } from "../../../stores/searchData";

  const router = useRouter();
  const searchStore = useSearchDataStore();

  const goToHeadline = () => {
    router.push({ name: "Headline" });
    searchStore.resetSearchWord();
  };
</script>

<style lang="scss">
  @font-face {
    font-family: "Continuous";
    src: url("../../../assets/fonts/continuous.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  .nav-area {
    font-family: "Continuous", serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    z-index: 10;
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 55px;

    &__title {
      padding-top: 0.7rem;
      margin-left: 5%;
      cursor: pointer;
    }

    &__right {
      display: flex;
      margin-right: 5%;
    }
  }
</style>
