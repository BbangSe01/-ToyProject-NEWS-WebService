import { createRouter, createWebHistory } from "vue-router";
import HeadLinePage from "../components/templates/HeadLinePage.vue";
import SearchPage from "../components/templates/SearchPage.vue";
const routes = [
  { path: "/", name: "Headline", component: HeadLinePage },
  { path: "/search", name: "Search", component: SearchPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
