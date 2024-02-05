import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: null,
    token: null,
  }),
  actions: {
    initializeAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        const decoded = jwtDecode(token); // Проверяем, что токен валидный
        this.username = decoded.name;
      }
    },
    login(username, token) {
      this.username = username;
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.username = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  }
});
