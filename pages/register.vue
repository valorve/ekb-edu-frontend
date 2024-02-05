<template>
  <div class="register-container">
    <h1>Регистрация</h1>
    <div class="form-container">
      <form @submit.prevent="register">
        <input id="username" v-model="username" class="form-input" type="text" required placeholder="Имя пользователя">
        <input id="username" v-model="email" class="form-input" type="email" required placeholder="Почта">
        <input id="password" v-model="password" class="form-input" type="password" required placeholder="Пароль">
        <div class="checkbox-container">
          <input type="checkbox" id="acceptRules" required>
          <label for="acceptRules">Согласен с правилами</label>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const username = ref('');
const password = ref('');
const email = ref('');
const errorMessage = ref('');

const router = useRouter();
const authStore = useAuthStore()

const register = async () => {
  try {
    const response = await axios.post('http://localhost:8000/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value
    });

    // Сохранение токена
    const token = response.data.token
    localStorage.setItem('token', token);
    authStore.login(username.value, token);

    // Перенаправление на главную страницу
    router.push('/');
  } catch (error) {
    errorMessage.value = error.response.data.msg || 'Ошибка при авторизации';
  }
};
</script>

<style scoped>
.register-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
}
.error-message {
  color: rgb(248, 163, 173);
}
</style>
