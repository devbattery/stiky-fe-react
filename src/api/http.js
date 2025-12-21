import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request: 메모리에 있는 Access Token을 헤더에 넣는 역할
http.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
});

// Response: 401 발생 시 재발급하는 역할
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/reissue")
    ) {
      originalRequest._retry = true;
      const authStore = useAuthStore();
      try {
        const { data } = await http.post("/api/auth/reissue");
        authStore.setAccessToken(data.accessToken);
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        authStore.logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default http;
