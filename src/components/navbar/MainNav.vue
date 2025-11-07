<template>
  <div class="nav-area">
    <p class="nav-title">News</p>
    <SearchBar />
  </div>
</template>

<script setup lang="ts">
  import SearchBar from "../parts/SearchBar.vue";
</script>

<style scoped>
  @font-face {
    font-family: "Continuous";
    src: url("../../assets/fonts/continuous.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  .nav-area {
    font-family: "Continuous", serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    z-index: 10;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    gap: 50rem;
    font-size: 55px;
  }
  .nav-title {
    margin-top: 0.4rem;
    display: flex;
  }
</style>
