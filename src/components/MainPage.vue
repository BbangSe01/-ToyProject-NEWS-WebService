<template>
  <CategoryNav class="categoryBtn" />
</template>

<script setup lang="ts">
import CategoryNav from './navbar/CategoryNav.vue';
import { getHeadLineData } from '../apis/NewsApis';

getHeadLineData();
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
