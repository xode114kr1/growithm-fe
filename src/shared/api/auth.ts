import { apiClient, setAccessToken } from "./index";
import type { User } from "../../types/userType";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;
const GITHUB_SCOPE = import.meta.env.VITE_GITHUB_SCOPE;

export const GITHUB_AUTH_URL =
  `https://github.com/login/oauth/authorize` +
  `?client_id=${GITHUB_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(GITHUB_SCOPE)}`;

export async function login(code: string): Promise<{ data: User }> {
  if (!code) throw new Error("인가 코드가 없습니다.");
  const res = await apiClient.post<{ data: User; accessToken: string }>(
    "/auth/github/callback",
    { code },
    { withCredentials: true }
  );
  setAccessToken(res.data.accessToken);
  return res.data;
}

export async function logout() {
  const res = await apiClient.post("/user/logout");
  return res.data;
}

export async function fetchMe(): Promise<{ data: User }> {
  const res = await apiClient.get("/auth/me");
  return res.data;
}
