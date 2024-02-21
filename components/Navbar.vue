<template>
  <nav class="navbar">
    <router-link to="/">
      <div id="logo">
        <img style="height: 32px; margin-right: 16px" src="/logo.svg" alt="logo">
        EKB<br>EDU
      </div>
    </router-link>
    
    <ul v-if="authStore">
      <li><router-link to="/courses">Курсы</router-link></li>
      <li><router-link to="/authors">Авторы</router-link></li>
      <li v-if="authStore.isAuthenticated"><router-link to="/lessons">Уроки</router-link></li>
      <li v-if="authStore.isAuthenticated"><router-link to="/me">Личный кабинет</router-link></li>
      <li v-if="authStore.isAuthenticated && authStore.isAdmin"><router-link to="/admin">Админ панель</router-link></li>
      <li v-if="!authStore.isAuthenticated"><router-link id="login" to="/login">Войти</router-link></li>
      <li v-if="authStore.isAuthenticated" @click="logout"><div id="logout">Выйти</div></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()
const isLoading = ref(true);

if (process.client) {
  onMounted(() => {
    authStore.initializeAuth();
  });

  isLoading.value = false;
}

const logout = () => {
  authStore.logout();
  navigateTo('/');
};
</script>

<style scoped>
.navbar {
  display: flex;
  overflow: hidden;
  justify-content: center;
  margin-top: 32px;
}

.navbar a {
  color: #DCD7BA;
}

.navbar, a:hover {
    color: #7E9CD8;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center; /* Выравнивает элементы по центру */
}

.navbar li {
  float: left;
}

.navbar li a {
  display: block;
  text-align: center;
  padding: 8px 16px;
  text-decoration: none;
  color: #DCD7BA;
  margin: 0px 8px 16px 0px;
  border-radius: 12px;
}

/* Изменение стилей при наведении */
.navbar li a:hover {
  background-color: #DCD7BA;
  color: #16161D;
}

.navbar li a.router-link-exact-active {
  background-color: #DCD7BA;
  color: #16161D;
}

#login {
  background-color: #1F1F28;
  color: #727169;
  margin: 0px 25px 0px 25px;
}

#logout {
  cursor: pointer;
  background-color: #1F1F28;
  color: #727169;
  padding: 8px 16px;
  margin-left: 32px;
  border-radius: 12px;
}

#logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 48px;
  user-select: none;
  font-weight: 600;
}
</style>