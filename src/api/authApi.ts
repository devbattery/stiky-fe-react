import type { LoginRequest, SignupRequest, TokenDto } from "../types/auth.ts";
import http from "./http.ts";

export const login = async (data: LoginRequest): Promise<TokenDto> => {
  const response = await http.post<TokenDto>("/api/auth/login", data);
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<void> => {
  await http.post("/api/auth/signup", data);
};

export const getTokenByCode = async (
  code: string,
): Promise<{ accessToken: string }> => {
  const response = await http.post("/api/auth/token", { code });
  return response.data;
};
