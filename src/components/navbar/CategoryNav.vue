<template>
    <div class="dropdown">
        <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            {{ props.categories.list[props.categories.index] }}
        </button>
        <ul class="dropdown-menu">
            <li
                v-for="(category, index) in props.categories.list"
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
import { defineProps, defineEmits } from 'vue';
import type { CategoryType } from '../../types';

const props = defineProps<{
    categories: CategoryType
}>();

const emit = defineEmits(['update-category']);

const clickCategory = (index: number) => {
    emit('update-category', index)
}
</script>
<style></style>