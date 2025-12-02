import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from "../types/auth.ts";
import http from "./http.ts";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await http.post<LoginResponse>("/api/auth/login", data);
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<void> => {
  await http.post("/api/auth/signup", data);
};

export const getTokenByCode = async (code: string): Promise<LoginResponse> => {
  const response = await http.post("/api/auth/token", { code });
  return response.data;
};

export const logoutApi = async (): Promise<void> => {
  await http.post("/api/auth/logout");
};
