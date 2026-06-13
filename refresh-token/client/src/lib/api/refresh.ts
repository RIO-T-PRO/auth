import { BASE_URL } from "./index";

let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const rawFetch = async (path: string, options: RequestInit = {}) => {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
  });
};

export const refreshAccessToken = async (): Promise<string> => {
  const res = await rawFetch("/auth/refresh", {
    method: "POST",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    clearAccessToken();
    const message =
      data?.message ||
      (typeof data?.error === "string" ? data.error : null) ||
      `Request failed: ${res.status}`;

    throw new Error(message);
  }

  const token = data?.accessToken as string | undefined;

  if (!token) {
    clearAccessToken();
    throw new Error("No access token returned from refresh endpoint");
  }

  setAccessToken(token);
  return token;
};
