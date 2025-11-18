<template>
  <form class="search-area" @submit.prevent="goSearchPage">
    <input
      type="search"
      placeholder="  Search News"
      class="search-input"
      v-model="keyword"
    />
    <button type="submit" class="search-btn">Search</button>
  </form>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from "vue";
  import { useSearchDataStore } from "../../stores/searchData.ts";
  import { useRouter } from "vue-router";
  const keyword = ref("");
  const isInput = computed(() => keyword.value.length > 0);
  const router = useRouter();

  const searchStore = useSearchDataStore();
  const currWord = computed(() => searchStore.searchWord);

  watch(
    currWord,
    (newVal, oldVal) => {
      keyword.value = newVal;
    },
    { immediate: true }
  );
  const goSearchPage = () => {
    if (!isInput.value) return;
    searchStore.setSearchWord(keyword.value);
    router.push({ name: "Search", query: { keyword: keyword.value } });
  };
</script>
<style scoped>
  .search-area {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-family: "Merriweather", serif;
    margin-right: 5%;
  }
  .search-input {
    width: 300px;
    height: 30px;
  }

  .search-btn {
    width: 80px;
    height: 30px;
  }
</style>
