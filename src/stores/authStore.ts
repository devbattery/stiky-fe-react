import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware/persist";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      setAccessToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: true,
        }),
      logout: () => set({ accessToken: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
