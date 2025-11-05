import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../components/MainPage.vue";
import DetailNewsPage from "../components/templates/DetailNewsPage.vue";

const routes = [
  { path: "/", component: MainPage },
  { path: "/detailNews", component: DetailNewsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
