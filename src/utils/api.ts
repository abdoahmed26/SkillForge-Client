import axios, { AxiosError } from "axios";
import { getAccessToken, removeAccessTokenCookie } from "./cookies";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1",
  withCredentials: true,
});

export const setAccessToken = (accessToken: string | null) => {
  if (accessToken) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// Restore token from cookie on module load
const savedToken = getAccessToken();
if (savedToken) {
  setAccessToken(savedToken);
}

const AUTH_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"];

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isAuthEndpoint = AUTH_ENDPOINTS.some((ep) => error.config?.url?.includes(ep));

    if (error.response?.status === 401 && !isAuthEndpoint) {
      setAccessToken(null);
      removeAccessTokenCookie();
      window.dispatchEvent(new Event("auth:expired"));
      window.location.assign("/#/login");
    }

    return Promise.reject(error);
  },
);
