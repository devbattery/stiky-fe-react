<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import http from "./api/http";
import { useAuthStore } from "./stores/authStore";

const authStore = useAuthStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    const { data } = await http.post("/api/auth/reissue");
    authStore.setAccessToken(data.accessToken);
  } catch (error) {
    console.log("비로그인 유저 또는 토큰 만료.");
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <RouterView v-else />
</template>
