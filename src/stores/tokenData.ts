import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 안전을 위해 accessToken은 메모리, refreshToken을 session storage에 위치시켜야 하나,
// 현재 서버에 로그인 이외 로직이 없기 때문에 추후 서버 로직이 늘어나면 refreshToken 발급을 추가하여
// accessToken을 메모리에서 관리하겠습니다. 현재는 session storage에 accessToken 고정
export const useTokenDataStore = defineStore(
  "tokenData",
  () => {
    const accessToken = ref<string>("");
    const setAccessToken = (token: string) => {
      accessToken.value = token;
    };
    const loginState = computed(() => accessToken.value.length > 0);
    return { accessToken, setAccessToken, loginState };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["accessToken"],
    },
  }
);
