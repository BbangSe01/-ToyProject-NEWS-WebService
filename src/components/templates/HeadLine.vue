<template>
  <div class="headlineArea">
    <CategoryNav
      :categories="categories"
      @update-category="categories.index = $event"
      class="categoryBtn"
    />
    <div class="cardArea">
      <div v-for="item in headlineData" key="item.title">
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
    async (newVal, oldVal) => {
      headlineData.value = await getHeadLineData(categories.list[newVal]!);
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
    /* background-color: black; */
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
</style>
