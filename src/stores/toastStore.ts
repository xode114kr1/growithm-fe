import { create } from "zustand";

interface ToastState {
  isOpenToast: boolean;
  message: string;
  setOpenToast: (message?: string) => void;
  setCloseToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isOpenToast: false,
  message: "",
  setOpenToast: (message) => {
    set({
      isOpenToast: true,
      message: message,
    });
  },
  setCloseToast: () => {
    set({ isOpenToast: false });
  },
}));
