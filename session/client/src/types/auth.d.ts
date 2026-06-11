export type User = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  email: string;
  username: string;
  password: string;
};

export type ApiResponse<T> = {
  status?: string;
  message?: string;
  data: T;
};

export type AuthResponse = ApiResponse<{
  user: User;
}>;

export type MeResponse = ApiResponse<{
  user: User;
}>;
