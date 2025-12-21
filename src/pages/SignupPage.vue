<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "../api/authApi";

const router = useRouter();
const formData = reactive({
  email: "",
  password: "",
  repeatPassword: "",
  nickname: "",
});
const errorMsg = ref("");

const handleSubmit = async () => {
  errorMsg.value = "";

  if (formData.password !== formData.repeatPassword) {
    errorMsg.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  if (formData.nickname.length < 2 || formData.nickname.length > 10) {
    errorMsg.value = "닉네임은 2자 이상 10자 이하여야 합니다.";
    return;
  }

  try {
    await signup({ ...formData });
    alert("회원가입이 완료되었습니다! 로그인해주세요.");
    router.push({ name: "login" });
  } catch (error) {
    console.error(error);
    if (error?.response?.data?.message) {
      errorMsg.value = error.response.data.message;
    } else {
      errorMsg.value = "서버와 통신 중 오류가 발생했습니다.";
    }
  }
};
</script>

<template>
  <div class="signup-page">
    <h2>회원가입</h2>
    <form class="signup-form" @submit.prevent="handleSubmit">
      <label>이메일</label>
      <input
        type="email"
        name="email"
        v-model="formData.email"
        required
        placeholder="example@stiky.site"
      />

      <label>닉네임</label>
      <input
        type="text"
        name="nickname"
        v-model="formData.nickname"
        required
        placeholder="2~10자"
      />

      <label>비밀번호</label>
      <input
        type="password"
        name="password"
        v-model="formData.password"
        required
        placeholder="8~20자"
      />

      <label>비밀번호 확인</label>
      <input
        type="password"
        name="repeatPassword"
        v-model="formData.repeatPassword"
        required
        placeholder="비밀번호 재입력"
      />

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <button type="submit">가입하기</button>
    </form>
  </div>
</template>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
