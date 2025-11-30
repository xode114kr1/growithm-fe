import axios from "axios";
import { Cookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_URL;
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;
const GITHUB_SCOPE = import.meta.env.VITE_GITHUB_SCOPE;

// const cookies = new Cookies();

export const GITHUB_AUTH_URL =
  `https://github.com/login/oauth/authorize` +
  `?client_id=${GITHUB_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(GITHUB_SCOPE)}`;

export async function login(code: string) {
  if (!code) throw new Error("인가 코드가 없습니다.");
  // Todo : 백엔드 주소 수정
  const res = await axios.post(
    `${API_URL}/auth/github/callback`,
    { code },
    { withCredentials: true }
  );

  // Todo : 토큰 오면 처리
  //   cookies.set("accessToken", res.data.access_token, { path: "/" });
  //   cookies.set("refreshToken", res.data.refresh_token, { path: "/" });
  return res.data;
}
