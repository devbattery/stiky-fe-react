import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue";
import OAuthCallbackPage from "../pages/OAuthCallbackPage.vue";
import MainPage from "../pages/MainPage.vue";
import BlogSettingsPage from "../pages/BlogSettingsPage.vue";
import PostEditorPage from "../pages/PostEditorPage.vue";
import PostDetailPage from "../pages/PostDetailPage.vue";
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
    {
      path: "/me/blog",
      name: "blogSettings",
      component: BlogSettingsPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/editor/new",
      name: "postCreate",
      component: PostEditorPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/editor/:id",
      name: "postEdit",
      component: PostEditorPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/posts/:id",
      name: "postDetail",
      component: PostDetailPage,
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
