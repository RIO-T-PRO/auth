export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
};

export type MeResponse = {
  sub: string;
  email: string;
  name: string | null;
  picture: string | null;
};

export type RefreshTokenResponse = {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
};

export type SignoutResponse = {
  success: true;
};

export type ApiErrorResponse = {
  error?: string;
  message?: string;
};
