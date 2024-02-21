<template>
  <div class="login-container">
    <h1>Вход</h1>
    <div class="form-container">
      <form @submit.prevent="login">
        <input id="username" v-model="username" class="form-input" type="text" required placeholder="Имя пользователя">
        <input id="password" v-model="password" class="form-input" type="password" required placeholder="Пароль">
        <button type="submit">Войти</button>
        <p>Нет аккаунта? <NuxtLink to="/register">Зарегистрироваться</NuxtLink></p>
      </form>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { API_URL } from '~/consts/consts';

definePageMeta({
  middleware: ['auth']
});

useHead({ title: 'EE | Авторизация' })

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();
const authStore = useAuthStore()

// const login = async () => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/login`, {
//       username: username.value,
//       password: password.value
//     });

//     // Сохранение токена
//     authStore.login(username.value, response.data.token);

//     // Перенаправление на главную страницу
//     router.push('/');
//   } catch (error) {
//     errorMessage.value = error.response.data.msg || 'Ошибка при авторизации';
//   }
// };

const login = () => {
  $fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    }
  })
  .then(response => {
    authStore.login(username.value, response.token)
    router.push('/')
  })
  .catch(error => {
    errorMessage.value = error.message || 'Ошибка при авторизации'
  })
}
</script>

<style scoped>
.login-container {
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
