export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  data: {
    user: User;
  };
  accessToken: string;
};

export type MeResponse = {
  message: string;
  data: User;
};

export type RefreshTokenResponse = {
  message: string;
  accessToken: string;
};

export type SignoutResponse = {
  message: string;
};

export type ErrorResponse = {
  message?: string;
  error?: string;
};
