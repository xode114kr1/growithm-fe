import { create } from "zustand";

interface ToastState {
  isOpenToast: boolean;
  setOpenToast: () => void;
  setCloseToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isOpenToast: false,
  setOpenToast: () => {
    set({
      isOpenToast: true,
    });
  },
  setCloseToast: () => {
    set({ isOpenToast: false });
  },
}));
