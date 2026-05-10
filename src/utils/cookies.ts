import Cookie from "cookie-universal";

const cookies = Cookie();

const ACCESS_TOKEN_KEY = "access_token";
const COOKIE_MAX_AGE_DAYS = 1;

export function getAccessToken(): string | undefined {
  return cookies.get(ACCESS_TOKEN_KEY) as string | undefined;
}

export function setAccessTokenCookie(token: string) {
  cookies.set(ACCESS_TOKEN_KEY, token, {
    path: "/",
    maxAge: COOKIE_MAX_AGE_DAYS * 24 * 60 * 60,
    sameSite: "lax",
  });
}

export function removeAccessTokenCookie() {
  cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
}
