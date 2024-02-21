import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: null,
    token: null,
    admin: false,
  }),
  actions: {
    initializeAuth() {
      const token = useCookie('token', { readonly: true }).value;
      if (token) {
        this.token = token;
        const decoded = jwtDecode(token); // Проверяем, что токен валидный
        this.username = decoded.name;
        this.admin = decoded.admin;
      }
    },
    login(username, token) {
      this.username = username;
      this.token = token;
      const cookie = useCookie('token', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // Примерное значение для срока жизни куки, например, одна неделя
        sameSite: 'None', // Установка SameSite=None для доступа в контекстах третьих сторон
        secure: true, // Установка Secure, обязательно для кук с SameSite=None
      })
      
      cookie.value = token;
    },
    logout() {
      this.username = null;
      this.token = null;
      useCookie("token").value = null
    },
    getToken() {
      return this.token;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.admin,
  }
});
