import axios, { AxiosError } from "axios";
import { useToastStore } from "../../stores/toastStore";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

export function setAccessToken(token: string) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}

let toastTimer: number | null = null;

apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const status = error.response?.status;
    const { setOpenToast, setCloseToast } = useToastStore.getState();

    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
    }

    if (status === 400) {
      setOpenToast("요청이 올바르지 않습니다.");
    } else if (status === 401) {
      return Promise.reject(error);
    } else if (status === 403) {
      setOpenToast("권한이 없습니다.");
    } else if (status === 404) {
      setOpenToast("요청한 리소스를 찾을 수 없습니다.");
    } else if (status === 409) {
      setOpenToast("이미 처리된 요청입니다.");
    } else if (status && status >= 500) {
      setOpenToast("서버 오류가 발생했습니다.");
    } else {
      setOpenToast("요청에 실패했습니다.");
    }

    toastTimer = window.setTimeout(() => {
      setCloseToast();
      toastTimer = null;
    }, 3000);

    return Promise.reject(error);
  }
);
