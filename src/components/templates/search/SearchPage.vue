<template>
  <div class="search-area">
    <div class="search-area__ex">
      Search results for
      <span class="keyword">"{{ route.query.keyword }}"</span>
    </div>
    <VueSpinnerClock
      v-if="isFetching"
      size="150"
      class="search-area__loading"
      :speedMultiplier="1.5"
    />
    <img
      v-else-if="isError"
      :src="ErrorImg"
      alt="에러 이미지"
      class="search-area__error-img"
    />
    <div class="search-area__news-area" v-else>
      <SearchDropdown
        :list="searchCategory.list"
        v-model="searchCategory.index"
      />
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
  import { ref, watch, computed, reactive } from "vue";
  import { VueSpinnerClock } from "vue3-spinners";
  import NewsCard from "../../parts/common/NewsCard.vue";
  import DetailNews from "../detail/DetailNews.vue";
  import SearchDropdown from "./parts/SearchDropdown.vue";
  import { useNewsDataStore } from "../../../stores/newsData.ts";
  import { useSearchDataStore } from "../../../stores/searchData.ts";
  import { getSearchData } from "./logic/getSearchData.ts";
  import ErrorImg from "../../../assets/images/error-img.jpg";
  import type { useNewsType } from "../../../types";
  const route = useRoute();
  const keyword = computed(() => (route.query.keyword as string) || "");
  const newsStore = useNewsDataStore();
  const searchStore = useSearchDataStore();

  const isFetching = ref<boolean>(false);
  const isError = ref<boolean>(false);

  const searchData = ref<useNewsType[]>([]);
  const nowPage = ref<number>(1);

  const isNext = computed(
    () => nowPage.value * 10 < searchStore.searchData.length
  );

  const searchCategory = reactive({
    list: ["publishedAt", "relevancy", "popularity"],
    index: 0,
  });

  const fetchSearchData = async () => {
    isError.value = false;
    try {
      isFetching.value = true;
      searchStore.searchData = [];
      nowPage.value = 1;
      // throw new Error();
      await getSearchData({
        keyword: keyword.value,
        sortBy: searchCategory.list[searchCategory.index] as string,
      });
      searchData.value = searchStore.searchData.slice(0, 10);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      isError.value = true;
    } finally {
      isFetching.value = false;
    }
  };

  watch(
    keyword,
    async () => {
      searchCategory.index = 0;
      await fetchSearchData();
    },
    { immediate: true }
  );

  watch(
    () => searchCategory.index,
    async () => {
      await fetchSearchData();
    }
  );

  watch(nowPage, () => {
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

<style lang="scss">
  @import "../../../assets/css/mixin.scss";
  .search-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7rem;
    max-width: 1200px;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    margin-bottom: 0.6rem;
    @include respond(mobile) {
      font-size: 1rem;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
    }

    &__ex {
      font-size: 1.5rem;
      @include respond(mobile) {
        font-size: 1rem;
      }
    }

    &__loading {
      margin-top: 5rem;
    }

    &__news-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
      @include respond(mobile) {
        margin-top: 1rem;
        padding-top: 1rem;
        gap: 1rem;
      }

      .more-btn {
        width: 20rem;
        height: 3rem;
        border: 1px solid black;
        border-radius: 0.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        @include respond(mobile) {
          width: 15rem;
          height: 2rem;
        }
      }
    }

    &__error-img {
      width: 80%;
      height: 20rem;
      padding: 5rem;
    }
  }
</style>
