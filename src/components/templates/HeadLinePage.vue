<template>
  <div class="headlineArea">
    <CategoryNav
      :categories="categories"
      :is-loading="isFetching"
      @update-category="categories.index = $event"
      class="categoryBtn"
    />
    <VueSpinnerClock
      v-if="isFetching"
      size="150"
      class="loading-spinner"
      :speedMultiplier="1.5"
    />
    <div class="cardArea" v-else>
      <div v-for="item in headlineData" :key="item.url">
        <NewsCard :newsData="item" @click="goToDetailPage(item.url)" />
      </div>
    </div>
    <Teleport to="body">
      <DetailNews v-if="dialogVisible" @close="dialogVisible = $event" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch, ref } from "vue";
  import NewsCard from "../parts/NewsCard.vue";
  import CategoryNav from "../navbar/CategoryNav.vue";
  import DetailNews from "../dialog/detailNews.vue";
  import type { CategoryType, NewsType } from "../../types";
  import { getHeadLineData } from "../../apis/NewsApis";
  import { VueSpinnerClock } from "vue3-spinners";
  import { useRouter } from "vue-router";
  import { useNewsDataStore } from "../../stores/newsData.ts";
  import dayjs from "dayjs";

  const router = useRouter();
  const newsStore = useNewsDataStore();

  const categories = reactive<CategoryType>({
    list: [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ],
    index: 0,
  });

  const headlineData = ref<Array<NewsType>>([]);
  const isFetching = ref(false);

  watch(
    () => categories.index,
    async (newVal, oldVal) => {
      isFetching.value = true;
      const response = await getHeadLineData(categories.list[newVal]!);
      headlineData.value = response.map((x: NewsType) => {
        const formattedDate = dayjs(x.publishedAt).format("YYYY-MM-DD");
        return {
          ...x,
          publishedAt: formattedDate,
        };
      });
      isFetching.value = false;
    },
    { immediate: true }
  );

  const dialogVisible = ref(false);

  const goToDetailPage = (url: string) => {
    const newData = headlineData.value.find((x) => x.url === url);
    if (newData) {
      newsStore.setDetailData(newData);
    }
    dialogVisible.value = true;
  };
</script>

<style scoped>
  .categoryBtn {
    margin-top: 1rem;
    margin-left: 1rem;
  }
  .headlineArea {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cardArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
  .loading-spinner {
    margin-top: 10rem;
    margin-bottom: 10rem;
  }
</style>
