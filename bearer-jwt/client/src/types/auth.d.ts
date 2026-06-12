export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  message?: string;
  data: T;
};

export type AuthResponse = ApiResponse<User> & {
  accessToken: string;
};

export type MeResponse = ApiResponse<User>;
