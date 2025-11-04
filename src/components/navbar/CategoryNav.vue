<template>
  <div class="button-line">
    <button
      v-for="(category, idx) in props.categories.list"
      :class="{ active: idx === props.categories.index }"
      v-on:click="clickCategory(idx)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  import type { CategoryType } from "../../types";

  const props = defineProps<{
    categories: CategoryType;
  }>();

  console.log(props.categories);
  console.log(props.categories);
  const emit = defineEmits(["update-category"]);

  const clickCategory = (index: number) => {
    emit("update-category", index);
  };
</script>
<style scoped>
  .button-line {
    display: flex;
    margin-bottom: 2rem;
  }
  button {
    background-color: white;
    margin-right: 1rem;
    border: 1px solid black;
    border-radius: 10px;
  }
  button.active {
    background-color: black;
    color: white;
    border-color: white;
  }
</style>
