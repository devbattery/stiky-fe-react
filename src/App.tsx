import "./App.css";
import { useAuthStore } from "./stores/authStore.ts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import OAuthCallbackPage from "./pages/OAuthCallbackPage.tsx";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/login/callback"} element={<OAuthCallbackPage />} />

        <Route
          path={"/"}
          element={
            <PrivateRoute>
              <div>
                <h1>메인 페이지</h1>
                <button onClick={() => useAuthStore.getState().logout()}>
                  로그아웃
                </button>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
