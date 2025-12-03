<script setup lang="ts">
  import MainNav from "./components/parts/navbar/MainNav.vue";
</script>

<template>
  <div class="fullScreen">
    <main-nav />
    <router-view />
  </div>
</template>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat&display=swap");

  input,
  button {
    box-sizing: border-box;
  }

  .fullScreen {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
    font-family: "Merriweather", serif;
  }
</style>
