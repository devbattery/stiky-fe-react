import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore.ts";
import { useEffect, useRef } from "react";
import { getTokenByCode } from "../api/authApi.ts";

const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const isCalled = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      if (isCalled.current) return;
      isCalled.current = true;

      getTokenByCode(code)
        .then((data) => {
          setAccessToken(data.accessToken);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error(err);
          alert("소셜 로그인 처리 중 오류 발생");
          isCalled.current = false;
          navigate("/login");
        });
    } else {
      alert("잘못된 접근입니다.");
      navigate("/login");
    }
  }, [searchParams, navigate, setAccessToken]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthCallbackPage;
