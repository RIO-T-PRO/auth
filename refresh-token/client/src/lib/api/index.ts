import {
  clearAccessToken,
  getAccessToken,
  rawFetch,
  refreshAccessToken,
} from "./refresh";

export const BASE_URL = "/api";

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean;
  skipRefresh?: boolean;
  _retry?: boolean;
};

const buildHeaders = (options: RequestInit = {}) => {
  const headers = new Headers(options.headers);

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  return headers;
};

const apiFetch = async <T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> => {
  const { skipAuth, skipRefresh, _retry, ...fetchOptions } = options;

  const headers = buildHeaders(fetchOptions);

  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const res = await rawFetch(path, {
    ...fetchOptions,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (res.status === 401 && !skipRefresh && !_retry) {
    try {
      const newToken = await refreshAccessToken();

      const retryHeaders = buildHeaders(fetchOptions);
      retryHeaders.set("Authorization", `Bearer ${newToken}`);

      const retryRes = await rawFetch(path, {
        ...fetchOptions,
        headers: retryHeaders,
      });

      const retryData = await retryRes.json().catch(() => null);

      if (!retryRes.ok) {
        const message =
          retryData?.message ||
          (typeof retryData?.error === "string" ? retryData.error : null) ||
          `Request failed: ${retryRes.status}`;

        throw new Error(message);
      }

      return retryData as T;
    } catch (error) {
      clearAccessToken();
      throw error instanceof Error ? error : new Error("Unauthorized");
    }
  }

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
