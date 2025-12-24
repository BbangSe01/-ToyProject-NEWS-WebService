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
<style lang="scss">
  @import "../../../../assets/css/mixin.scss";
  .button-line {
    display: flex;
    margin-bottom: 2rem;

    @include respond(mobile) {
      margin-bottom: 0.5rem;
      width: 15.5rem;
      overflow: auto;
      border-bottom: 1px solid black;
      padding-bottom: 0.5rem;
    }
    &::-webkit-scrollbar {
      display: none;
    }

    button {
      font-family: "Merriweather", serif;
      padding: 0.7rem;
      background-color: white;
      margin-right: 1rem;
      border: 1px solid black;
      border-radius: 20px;
      font-size: 15px;

      @include respond(mobile) {
        font-size: 0.6rem;
        padding: 0.3rem;
        margin-right: 0.3rem;
      }
    }

    button.active {
      background-color: black;
      color: white;
      border-color: white;
    }
  }
</style>
