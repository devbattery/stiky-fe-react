import * as React from "react";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore.ts";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi.ts";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      setAccessToken(data.accessToken);
      navigate("/");
    } catch (error) {
      alert("로그인 실패");
    }
  };

  const handleSocialLogin = (provider: string) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Email"}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Password"}
        />
        <button type={"submit"}>로그인</button>

        <hr />
        <button type={"button"} onClick={() => handleSocialLogin("google")}>
          Google Login
        </button>
        <button type={"button"} onClick={() => handleSocialLogin("kakao")}>
          Kakao Login
        </button>
        <button type={"button"} onClick={() => handleSocialLogin("naver")}>
          Naver Login
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <p>아직 계정이 없으신가요?</p>
        <Link to="/signup">회원가입 하러 가기</Link>
      </div>
    </div>
  );
};

export default LoginPage;
