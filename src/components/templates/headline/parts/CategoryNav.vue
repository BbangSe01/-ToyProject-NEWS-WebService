<template>
  <div class="button-line">
    <button
      :disabled="isLoading && idx !== props.categories.index"
      v-for="(category, idx) in props.categories.list"
      :class="[{ active: idx === props.categories.index }]"
      v-on:click="clickCategory(idx)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import type { CategoryType } from "../../../../types";

  const props = defineProps<{
    categories: CategoryType;
    isLoading: boolean;
  }>();
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
    font-family: "Merriweather", serif;
    padding: 0.7rem;
    background-color: white;
    margin-right: 1rem;
    border: 1px solid black;
    border-radius: 20px;
    font-size: 15px;
  }
  button.active {
    background-color: black;
    color: white;
    border-color: white;
  }
</style>
