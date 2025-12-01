import axios from "axios";
import { useAuthStore } from "../stores/authStore.ts";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request Interceptor
http.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.statue === 401) {
      // TODO: RefreshToken 재발급 로직 백엔드 구현 후 여기에도 추가
      // 일단 로그아웃 처리로
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default http;
