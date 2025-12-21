import http from "./http";

export const login = async (data) => {
  const response = await http.post("/api/auth/login", data);
  return response.data;
};

export const signup = async (data) => {
  await http.post("/api/auth/signup", data);
};

export const getTokenByCode = async (code) => {
  const response = await http.post("/api/auth/token", { code });
  return response.data;
};

export const logoutApi = async () => {
  await http.post("/api/auth/logout");
};
