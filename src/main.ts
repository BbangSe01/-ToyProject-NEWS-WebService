import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap JS (bundle: collapse, dropdown 등 포함)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const app = createApp(App);
app.use(router); // router 등록
app.mount("#app");
