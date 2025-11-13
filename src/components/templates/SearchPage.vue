<template>
  <div class="searchArea">
    <div class="search-ex">
      Search results for
      <span class="keyword">"{{ route.query.keyword }}"</span>
    </div>
    <VueSpinnerClock
      v-if="isFetching"
      size="150"
      class="loading-search"
      :speedMultiplier="1.5"
    />
    <img v-else-if="isError" :src="ErrorImg" alt="에러 이미지" class="error-img"></img>
    <div class="news-area" v-else>
      <div v-for="item in searchData" :key="item.url">
        <NewsCard :newsData="item" @click="goToDetailPage(item.url)" />
      </div>
      <div v-if="isNext" class="more-btn" @click="nowPage += 1">More</div>
    </div>
    <Teleport to="body">
      <DetailNews v-if="dialogVisible" @close="dialogVisible = $event" />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { ref, watch, computed } from "vue";
  import { searchNewsData } from "../../apis/NewsApis";
  import { VueSpinnerClock } from "vue3-spinners";
  import NewsCard from "../parts/NewsCard.vue";
  import DetailNews from "../dialog/DetailNews.vue";
  import { useNewsDataStore } from "../../stores/newsData.ts";
  import { useSearchDataStore } from "../../stores/searchData.ts";
  import ErrorImg from "../../assets/images/error-img.jpg"
  import type { NewsType } from "../../types";
  const route = useRoute();
  const keyword = computed(() => (route.query.keyword as string) || "");

  const newsStore = useNewsDataStore();
  const searchStore = useSearchDataStore();

  const isFetching = ref<boolean>(false);
  const isError = ref<boolean>(false);
  
  const searchData = ref<NewsType[]>([]);
  const nowPage = ref<number>(1);

  const isNext = computed(
    () => nowPage.value * 10 < searchStore.searchData.length
  );

  watch(
    keyword,
    async (newVal, oldVal) => {
      isError.value = false;
      try {
        isFetching.value = true;
        searchStore.searchData = [];
        nowPage.value = 1;
        const results = await searchNewsData(keyword.value);
        searchStore.setSearchData(results);
        searchData.value = searchStore.searchData.slice(0, 10);
      } catch {
        isError.value = true;
      } finally {
        isFetching.value = false;
      }
    },
    { immediate: true }
  );

  watch(nowPage, async (newVal, oldVal) => {
    const addData = searchStore.searchData.slice(
      (nowPage.value - 1) * 10,
      nowPage.value * 10
    );
    searchData.value = [...searchData.value, ...addData];
  });

  const dialogVisible = ref(false);
  const goToDetailPage = (url: string) => {
    const newData = searchData.value.find((x) => x.url === url);
    if (newData) {
      newsStore.setDetailData(newData);
    }
    dialogVisible.value = true;
  };
</script>

<style scoped>
  .searchArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    margin-top: 7rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
  }
  .search-ex {
    font-size: 1.5rem;
  }
  .keyword {
    text-decoration: underline;
  }
  .loading-search {
    margin-top: 5rem;
  }
  .news-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }
  .more-btn {
    width: 20rem;
    height: 3rem;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .error-img {
    width: 80%;
    height:20rem;
    padding: 5rem;
  }
</style>
