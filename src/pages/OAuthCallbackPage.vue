<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTokenByCode } from "../api/authApi";
import { useAuthStore } from "../stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isProcessing = ref(false);

onMounted(async () => {
  const code = route.query.code;
  if (typeof code !== "string") {
    alert("잘못된 접근입니다.");
    router.replace({ name: "login" });
    return;
  }

  if (isProcessing.value) return;
  isProcessing.value = true;

  try {
    const data = await getTokenByCode(code);
    authStore.setAccessToken(data.accessToken);
    router.replace({ name: "home" });
  } catch (error) {
    console.error(error);
    alert("소셜 로그인 처리 중 오류 발생");
    isProcessing.value = false;
    router.replace({ name: "login" });
  }
});
</script>

<template>
  <div>로그인 처리 중...</div>
</template>
