import { createRouter, createWebHistory } from "vue-router";
import HeadLinePage from "../components/templates/HeadLinePage.vue";
import SearchPage from "../components/templates/SearchPage.vue";
import LoginPage from "../components/templates/LoginPage.vue";
const routes = [
  { path: "/", name: "Headline", component: HeadLinePage },
  { path: "/search", name: "Search", component: SearchPage },
  { path: "/login", name: "Login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
