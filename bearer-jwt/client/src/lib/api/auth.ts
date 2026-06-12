import type {
  AuthResponse,
  MeResponse,
  SigninPayload,
  SignupPayload,
} from "@/types/auth";
import apiFetch from "@/lib/api/index";

export const signin = (payload: SigninPayload): Promise<AuthResponse> =>
  apiFetch<AuthResponse>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const signup = (payload: SignupPayload): Promise<AuthResponse> =>
  apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const me = (): Promise<MeResponse> => apiFetch<MeResponse>("/auth/me");

export const logout = (): Promise<null> =>
  apiFetch<null>("/auth/logout", {
    method: "POST",
  });
