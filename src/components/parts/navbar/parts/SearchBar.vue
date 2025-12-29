<template>
  <form class="search-box" @submit.prevent="goSearchPage">
    <input
      type="search"
      placeholder="  Search News"
      class="search-box__input"
      v-model="keyword"
    />
    <button type="submit" class="search-box__btn"><p>Search</p></button>
  </form>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from "vue";
  import { useSearchDataStore } from "../../../../stores/searchData";
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

<style lang="scss">
  @import "../../../../assets/css/mixin.scss";

  .search-box {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-family: "Merriweather", serif;

    &__input {
      width: 300px;
      height: 30px;
      @include respond(mobile) {
        font-size: 0.9rem;
        width: 10rem;
      }
      @include respond(tablet) {
        font-size: 1rem;
        width: 17rem;
      }
    }
    &__btn {
      width: 80px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      @include respond(mobile) {
        display: none;
      }
      @include respond(tablet) {
        width: 3.5rem;
      }
    }
  }
</style>
