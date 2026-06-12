const BASE_URL = "/api";

const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = new Headers(options.headers);

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = localStorage.getItem("accessToken");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.message ||
      (typeof data?.error === "string"
        ? data.error
        : JSON.stringify(data?.error)) ||
      `Request failed: ${res.status}`;

    throw new Error(message);
  }

  return data as T;
};

export default apiFetch;
