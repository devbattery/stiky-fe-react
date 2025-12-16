<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { login } from "../api/authApi";
import { useAuthStore } from "../stores/authStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    const data = await login({ email: email.value, password: password.value });
    authStore.setAccessToken(data.accessToken);
    router.replace({ name: "home" });
  } catch (error) {
    alert("로그인 실패");
    console.error(error);
  }
};

const handleSocialLogin = (provider: string) => {
  window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/${provider}`;
};
</script>

<template>
  <div class="login-page">
    <h2>로그인</h2>
    <form class="login-form" @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">로그인</button>

      <hr />
      <button type="button" @click="handleSocialLogin('google')">Google Login</button>
      <button type="button" @click="handleSocialLogin('kakao')">Kakao Login</button>
      <button type="button" @click="handleSocialLogin('naver')">Naver Login</button>
    </form>

    <div class="signup-link">
      <p>아직 계정이 없으신가요?</p>
      <RouterLink to="/signup">회원가입 하러 가기</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.signup-link {
  margin-top: 20px;
}
</style>
