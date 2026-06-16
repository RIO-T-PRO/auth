import apiFetch from "@/lib/api";
import { refreshAccessToken } from "@/lib/api/refresh";
import type {
  MeResponse,
  RefreshTokenResponse,
  SignoutResponse,
  AuthUser,
} from "@/types/auth";

export const getGoogleAuthorizeUrl = () => "/auth/google/authorize";

export const userinfo = async (): Promise<MeResponse> => {
  return apiFetch<MeResponse>("/auth/userinfo");
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  return apiFetch<RefreshTokenResponse>("/auth/refresh", {
    method: "POST",
    skipAuth: true,
    skipRefresh: true,
  });
};

export const signout = async (): Promise<SignoutResponse> => {
  return apiFetch<SignoutResponse>("/auth/logout", {
    method: "POST",
    skipRefresh: true,
  });
};

/**
 * Call this when the frontend first loads after a Google OAuth redirect.
 * It uses the refresh token cookie (already set by the backend) to:
 *   1. Obtain and store the access token in memory.
 *   2. Fetch the authenticated user's profile.
 *
 * @returns The authenticated user object, ready to be stored in your state/context.
 */
export const handleGoogleCallback = async (): Promise<AuthUser> => {
  await refreshAccessToken();

  const me: MeResponse = await userinfo();

  return {
    id: me.sub,
    email: me.email,
    name: me.name,
    avatarUrl: me.picture,
  };
};
