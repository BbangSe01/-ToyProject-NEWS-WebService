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
  .favorites-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    margin-top: 7rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;

    &__title {
      font-size: 2rem;
      font-weight: bold;
    }

    &__card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      margin-top: 1rem;
    }
  }
</style>

<!-- https://mingeesuh.tistory.com/entry/SASSSCSS-%EB%B0%98%EB%B3%B5%EC%A0%81%EC%9D%B8-CSS%EB%8A%94-%EA%B7%B8%EB%A7%8C-SASS-%ED%95%9C%EB%B0%A9%EC%97%90-%EB%81%9D%EB%82%B4%EA%B8%B0-%EB%B3%80%EC%88%98-%EC%A4%91%EC%B2%A9-%EB%AF%B9%EC%8A%A4%EC%9D%B8 -->
