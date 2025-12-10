<template>
  <div class="summary-area">
    <p class="summary-title">Summary</p>
    <div class="summary-content">{{ props.content }}</div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    content: string;
  }>();
</script>

<style>
  .summary-area {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  .summary-title {
    font-weight: bold;
    font-size: 2rem;
  }
  .summary-content {
    line-height: 1.5rem;
  }
</style>
