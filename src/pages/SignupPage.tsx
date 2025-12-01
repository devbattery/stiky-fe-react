import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";
import type { SignupRequest } from "../types/auth.ts";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupRequest>({
    email: "",
    password: "",
    repeatPassword: "",
    nickname: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. 프론트엔드 유효성 검사
    if (formData.password !== formData.repeatPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (formData.nickname.length < 2 || formData.nickname.length > 10) {
      setErrorMsg("닉네임은 2자 이상 10자 이하여야 합니다.");
      return;
    }

    try {
      // 2. 회원가입 API 호출
      await signup(formData);
      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      navigate("/login");
    } catch (error: any) {
      // 백엔드 에러 메시지 처리 (예: 이미 가입된 이메일 등)
      console.error(error);
      if (error.response && error.response.data) {
        // 백엔드 에러 응답 구조에 따라 메시지 추출
        // 예: GlobalExceptionHandler가 message 필드를 줄 경우
        const message =
          error.response.data.message || "회원가입에 실패했습니다.";
        setErrorMsg(message);
      } else {
        setErrorMsg("서버와 통신 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>회원가입</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@stiky.site"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>닉네임</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            placeholder="2~10자"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="8~20자"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
            placeholder="비밀번호 재입력"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {errorMsg && (
          <p style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>
        )}

        <button
          type="submit"
          style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
