<template>
  <div class="favorites-area">
    <p class="favorites-area__title">Bookmark List</p>
    <div class="favorites-area__card">
      <div v-for="item in favoritesStore.favoritesData" :key="item.url">
        <NewsCard :newsData="item" @click="goToDetailPage(item.url)" />
      </div>
    </div>
    <Teleport to="body">
      <DetailNews v-if="dialogVisible" @close="dialogVisible = $event" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useFavoritesDataStore } from "../../../stores/favoritesData";
  import { useNewsDataStore } from "../../../stores/newsData";
  import NewsCard from "../../parts/common/NewsCard.vue";
  import DetailNews from "../detail/DetailNews.vue";
  const favoritesStore = useFavoritesDataStore();
  const newsStore = useNewsDataStore();
  const dialogVisible = ref(false);
  const goToDetailPage = (url: string) => {
    const newData = favoritesStore.favoritesData.find((x) => x.url === url);
    if (newData) {
      newsStore.setDetailData(newData);
    }
    dialogVisible.value = true;
  };
</script>

<style lang="scss">
  @import "../../../assets/css/mixin.scss";
  .favorites-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    margin-top: 7rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    @include respond(mobile) {
      font-size: 1.5rem;
      margin-top: 5rem;
    }

    &__title {
      font-size: 2rem;
      font-weight: bold;
      @include respond(mobile) {
        font-size: 1.5rem;
      }
    }

    &__card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      margin-top: 1rem;
      @include respond(mobile) {
        gap: 1rem;
        margin-top: 0rem;
      }
    }
  }
</style>
