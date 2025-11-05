<script setup lang="ts">
  import MainNav from "./components/navbar/MainNav.vue";
</script>

<template>
  <div class="fullScreen">
    <main-nav />
    <router-view />
  </div>
</template>

<style>
  /* ✅ 전역 폰트 선언 */
  @font-face {
    font-family: "Continuous";
    src: url("./assets/fonts/continuous.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  .fullScreen {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
    font-family: "Continuous", sans-serif;
  }
</style>
