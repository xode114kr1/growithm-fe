import { useToastStore } from "../../stores/toastStore";

export function useOpenToast() {
  const { setOpenToast, setCloseToast } = useToastStore();
  return (time: number = 3000) => {
    setOpenToast();
    setTimeout(() => {
      setCloseToast();
    }, time);
  };
}
