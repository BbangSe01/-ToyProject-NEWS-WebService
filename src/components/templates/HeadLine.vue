<template>
    <CategoryNav
        :categories="categories"
        @update-category="categories.index = $event"
        class="categoryBtn"
    />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CategoryNav from '../navbar/CategoryNav.vue';
import type { CategoryType } from '../../types';

const categories = reactive<CategoryType>({
    list: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
    index: 0
})
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
