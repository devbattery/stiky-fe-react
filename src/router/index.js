import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue";
import OAuthCallbackPage from "../pages/OAuthCallbackPage.vue";
import MainPage from "../pages/MainPage.vue";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: { requiresGuest: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
      meta: { requiresGuest: true },
    },
    {
      path: "/login/callback",
      name: "oauthCallback",
      component: OAuthCallbackPage,
    },
    {
      path: "/",
      name: "home",
      component: MainPage,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login" });
    return;
  }
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: "home" });
    return;
  }
  next();
});

export default router;
