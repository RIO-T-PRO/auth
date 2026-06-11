import type {
  AuthResponse,
  MeResponse,
  SigninPayload,
  SignupPayload,
} from "@/types/auth";
import apiFetch from "@/lib/api/index";

export const signin = (payload: SigninPayload): Promise<AuthResponse> =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const signup = (payload: SignupPayload): Promise<AuthResponse> =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const me = (): Promise<MeResponse> => apiFetch("/auth/me");

export const logout = () =>
  apiFetch<null>("/auth/logout", {
    method: "POST",
  });
