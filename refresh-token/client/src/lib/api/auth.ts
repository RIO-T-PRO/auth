import apiFetch from "@/lib/api";

import type {
  AuthResponse,
  MeResponse,
  RefreshTokenResponse,
  SigninPayload,
  SignupPayload,
  SignoutResponse,
} from "@/types/auth";

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
    skipRefresh: true,
  });
};

export const signin = async (payload: SigninPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
    skipRefresh: true,
  });
};

export const me = async (): Promise<MeResponse> => {
  return apiFetch<MeResponse>("/auth/me");
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  return apiFetch<RefreshTokenResponse>("/auth/refresh", {
    method: "POST",
    skipAuth: true,
    skipRefresh: true,
  });
};

export const signout = async (): Promise<SignoutResponse> => {
  return apiFetch<SignoutResponse>("/auth/signout", {
    method: "POST",
    skipRefresh: true,
  });
};
