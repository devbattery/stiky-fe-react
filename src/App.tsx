import "./App.css";
import { useAuthStore } from "./stores/authStore.ts";
import { useEffect, useState } from "react";
import http from "./api/http.ts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import OAuthCallbackPage from "./pages/OAuthCallbackPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await http.post("/api/auth/reissue");
        setAccessToken(data.accessToken);
      } catch (e) {
        console.log("비로그인 유저 또는 토큰 만료.");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [setAccessToken]);

  const handleLogout = async () => {
    try {
      await http.post("/api/auth/logout");
    } catch (error) {
      console.log("로그아웃 요청 중 에러 발생: ", error);
    } finally {
      logout();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage />}></Route>
        <Route path={"/signup"} element={<SignupPage />} />
        <Route path={"/login/callback"} element={<OAuthCallbackPage />}></Route>
        <Route
          path={"/"}
          element={
            isAuthenticated ? (
              <div style={{ padding: "20px" }}>
                <h1>Main Page</h1>
                <p>안녕?</p>
                <button onClick={handleLogout}>로그아웃~</button>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
