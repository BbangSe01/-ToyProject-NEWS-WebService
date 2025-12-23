<template>
  <div v-if="isLoading" class="token-refresh-screen"></div>
  <div class="fullScreen" v-else>
    <main-nav />
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import MainNav from "./components/parts/navbar/MainNav.vue";
  import { onMounted, ref } from "vue";
  import { useTokenDataStore } from "./stores/tokenData";
  import { refresh } from "./apis/AuthApis";

  const tokenStore = useTokenDataStore();
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      const res = await refresh();
      tokenStore.setAccessToken(res.data.accessToken);
    } catch {
      tokenStore.setAccessToken("");
    } finally {
      isLoading.value = false;
    }
  });
</script>

<style>
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
  .token-refresh-screen {
    min-height: 100dvh;
  }
</style>
