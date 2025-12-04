import { create } from "zustand";
import type { AuthState } from "../types/authType";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  initialized: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setInitialized: () =>
    set({
      initialized: true,
    }),
}));
