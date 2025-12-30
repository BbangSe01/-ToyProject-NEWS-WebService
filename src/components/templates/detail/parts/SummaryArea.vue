<template>
  <div class="summary-area">
    <p class="summary-area__title">Summary</p>
    <div class="summary-area__content">{{ props.content }}</div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    content: string;
  }>();
</script>

<style lang="scss">
  @use "../../../../assets/css/mixin.scss" as mixin;

  .summary-area {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    &__title {
      font-weight: bold;
      font-size: 2rem;
      @include mixin.respond(mobile) {
        font-size: 1.2rem;
      }
    }
    &__content {
      line-height: 1.5rem;
      @include mixin.respond(mobile) {
        font-size: 0.8rem;
      }
    }
  }
</style>
