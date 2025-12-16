import { defineStore } from "pinia";

interface AuthState {
  accessToken: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.accessToken),
  },
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    logout() {
      this.accessToken = null;
    },
  },
});
