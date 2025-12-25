import { useEffect, useRef } from "react";
import { useToastStore } from "../../stores/toastStore";

export function useOpenToast() {
  const { setOpenToast, setCloseToast } = useToastStore();
  const timerRef = useRef<number | null>(null);

  const openToast = ({
    time = 3000,
    message = "원인을 알 수 없는 오류가 발생하였습니다",
  }: {
    time?: number;
    message?: string;
  }) => {
    setOpenToast(message);
    timerRef.current = window.setTimeout(() => {
      setCloseToast();
    }, time);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return openToast;
}
