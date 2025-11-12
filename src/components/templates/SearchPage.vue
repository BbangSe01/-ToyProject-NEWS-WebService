<template>
  <div>검색</div>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();

  console.log("keywords", route.query.keyword);
</script>
