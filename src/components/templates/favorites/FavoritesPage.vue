<template>
  <div class="favorites-area">
    <p class="favorites-title">Bookmark List</p>
    <div class="favorites-card-area">
      <div v-for="item in favoritesStore.favoritesData" :key="item.url">
        <NewsCard :newsData="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useFavoritesDataStore } from "../../../stores/favoritesData";
  import NewsCard from "../../parts/common/NewsCard.vue";
  const favoritesStore = useFavoritesDataStore();
</script>

<style scoped>
  .favorites-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    margin-top: 7rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
  }
  .favorites-title {
    font-size: 2rem;
    font-weight: bold;
  }
  .favorites-card-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
</style>
