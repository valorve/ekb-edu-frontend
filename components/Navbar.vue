<template>
  <nav v-if="!isLoading" class="navbar">
    <ul v-if="authStore">
      <li><router-link to="/">Главная</router-link></li>
      <li v-if="authStore.isAuthenticated"><router-link to="/me">Личный кабинет</router-link></li>
      <li v-if="!authStore.isAuthenticated"><router-link to="/login">Войти</router-link></li>
      <li v-if="authStore.isAuthenticated" @click="logout"><div class="logout">Выйти</div></li>
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
  overflow: hidden;
  margin-top: 15px;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
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
  margin: 0px 10px 0px 10px;
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

.logout {
  display: flex;
  cursor: pointer;
  background-color: #1F1F28;
  color: #727169;
  width: 100%;
  height: 100%;
  margin: 0px 25px 0px 25px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}
</style>