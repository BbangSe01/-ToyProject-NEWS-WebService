<template>
    <div class="dropdown">
        <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            {{ categories[categoryIdx] }}
        </button>
        <ul class="dropdown-menu">
            <li
                v-for="(category, index) in categories"
                :key="index"
                v-on:click="clickCategory(index)"
            ><a
                    class="dropdown-item"
                    href="#"
                >{{ category }}</a></li>
        </ul>
    </div>

</template>


<script setup lang="ts">
import { ref } from 'vue';
const categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const categoryIdx = ref<number>(0);


const clickCategory = (index: number) => {
    categoryIdx.value = index;
}
</script>
<style></style>