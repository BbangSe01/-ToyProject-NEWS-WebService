import { createRouter, createWebHistory } from "vue-router";
import HeadLinePage from "../components/templates/HeadLinePage.vue";
import SearchPage from "../components/templates/SearchPage.vue";
import LoginPage from "../components/templates/auth/LoginPage.vue";
import SignupPage from "../components/templates/auth/SignupPage.vue";
const routes = [
  { path: "/", name: "Headline", component: HeadLinePage },
  { path: "/search", name: "Search", component: SearchPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/signup", name: "Signup", component: SignupPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
