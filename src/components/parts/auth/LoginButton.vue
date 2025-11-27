<template>
  <button class="login-button" @click="changeLoginState">
    {{ loginState ? "Logout" : "Login" }}
  </button>
</template>

<script setup lang="ts">
  import { useTokenDataStore } from "../../../stores/tokenData";
  import { useRouter } from "vue-router";
  import { ref, computed, watch } from "vue";
  import { openAlert } from "../../../utils/alert";
  const tokenStore = useTokenDataStore();
  const router = useRouter();
  const loginState = computed(() => tokenStore.accessToken.length > 0);

  const changeLoginState = () => {
    if (loginState.value) {
      tokenStore.setAccessToken("");
      openAlert({
        title: "Success",
        text: "Logout!",
        icon: "success",
      });
      router.push({ name: "Headline" });
    } else {
      router.push({ name: "Login" });
    }
  };
</script>
<style>
  .login-button {
    font-family: "Merriweather", serif;
    width: 4rem;
    height: 2rem;
    border: 1px solid white;
    background-color: black;
    font-size: 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 1rem;
    color: inherit;
    text-decoration: none;
  }
  .login-button:hover {
    background-color: white;
    color: black;
  }
</style>
