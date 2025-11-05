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
        <NewsCard :newsData="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch, ref } from "vue";
  import NewsCard from "../parts/NewsCard.vue";
  import CategoryNav from "../navbar/CategoryNav.vue";
  import type { CategoryType, NewsType } from "../../types";
  import { getHeadLineData } from "../../apis/NewsApis";
  import { VueSpinnerClock } from "vue3-spinners";

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
      headlineData.value = await getHeadLineData(categories.list[newVal]!);
      isFetching.value = false;
    },
    { immediate: true }
  );
</script>

<style scoped>
  .read-the-docs {
    color: #888;
  }

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
  }
  .loading-spinner {
    margin-top: 10rem;
    margin-bottom: 10rem;
  }
</style>
