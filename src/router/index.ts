import { createRouter, createWebHistory } from "vue-router";
import HeadLinePage from "../components/templates/headline/HeadLinePage.vue";
import SearchPage from "../components/templates/search/SearchPage.vue";
import LoginPage from "../components/templates/login/LoginPage.vue";
import SignupPage from "../components/templates/signup/SignupPage.vue";
import FavoritesPage from "../components/templates/favorites/FavoritesPage.vue";
const routes = [
  { path: "/", name: "Headline", component: HeadLinePage },
  { path: "/search", name: "Search", component: SearchPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/signup", name: "Signup", component: SignupPage },
  { path: "/favorites", name: "Favorites", component: FavoritesPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
