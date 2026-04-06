// stores/auth.store.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
  },
})
