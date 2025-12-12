import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // SOP(Same-Origin Policy)를 우회하기 위함. 즉, 요청이 막히는 것을 막기 위함.
    proxy: {
      "/user": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
