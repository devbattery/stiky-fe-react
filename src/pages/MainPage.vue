<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logoutApi } from "../api/authApi";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const router = useRouter();
const isProcessing = ref(false);

const handleLogout = async () => {
  if (isProcessing.value) return;
  isProcessing.value = true;
  try {
    await logoutApi();
  } catch (error) {
    console.log("로그아웃 요청 중 에러 발생", error);
  } finally {
    authStore.logout();
    isProcessing.value = false;
    router.replace({ name: "login" });
  }
};
</script>

<template>
  <div class="main-page">
    <h1>Main Page</h1>
    <p>안녕?</p>
    <button type="button" @click="handleLogout" :disabled="isProcessing">
      로그아웃~
    </button>
  </div>
</template>

<style scoped>
.main-page {
  padding: 20px;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
