import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTokenDataStore = defineStore("tokenData", () => {
  const accessToken = ref<string>("");
  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };
  const loginState = computed(() => accessToken.value.length > 0);
  return { accessToken, setAccessToken, loginState };
});
