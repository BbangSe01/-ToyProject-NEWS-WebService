<template>
  <div></div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";
  import type { NewsType } from "../../types";
  import { useNewsDataStore } from "../../stores/newsData";

  const newsStore = useNewsDataStore();
  console.log(newsStore.detailData);
</script>
