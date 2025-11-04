<template>
  <CategoryNav
    :categories="categories"
    @update-category="categories.index = $event"
    class="categoryBtn"
  />
  <div v-for="item in headlineData" key="item.title">
    <NewsCard :newsData="item" />
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch, ref } from "vue";
  import NewsCard from "../parts/NewsCard.vue";
  import CategoryNav from "../navbar/CategoryNav.vue";
  import type { CategoryType, NewsType } from "../../types";
  import { getHeadLineData } from "../../apis/NewsApis";

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
  watch(
    () => categories.index,
    async (newVal: number, oldVal: number) => {
      headlineData.value = await getHeadLineData(categories.list[newVal]!);
    }
  );
</script>

<style>
  .read-the-docs {
    color: #888;
  }

  .categoryBtn {
    margin-top: 1rem;
    margin-left: 1rem;
  }
</style>
