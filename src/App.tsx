import "./App.css";
import { useAuthStore } from "./stores/authStore.ts";
import { useEffect, useState } from "react";
import http from "./api/http.ts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import OAuthCallbackPage from "./pages/OAuthCallbackPage.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await http.post("/api/auth/reissue");
        setAccessToken(data.accessToken);
      } catch (e) {
        // 로그인 상태 X
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [setAccessToken]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage />}></Route>
        <Route path={"/login/callback"} element={<OAuthCallbackPage />}></Route>
        <Route
          path={"/"}
          element={
            useAuthStore.getState().isAuthenticated ? (
              <div>Main</div>
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
