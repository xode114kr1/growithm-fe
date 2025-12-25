import type { User } from "./userType";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setInitialized: () => void;
}
