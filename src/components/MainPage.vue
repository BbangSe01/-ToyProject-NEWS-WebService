<template>
  <div class="main-page">
    <section class="headline-section">
      <HeadLine />
    </section>
  </div>
</template>

<script setup lang="ts">
  import HeadLine from "./templates/HeadLine.vue";
</script>

<style scoped>
  .main-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  section {
    padding: 2rem 1.5rem;
    max-width: 1200px;
    /* margin: 0 auto; */
  }

  .headline-section {
    border-bottom: 1px solid #e5e7eb;
    margin-top: 5rem;
  }
</style>
