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
          <label for="acceptRules">Согласен на обработку персональных данных</label>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { API_URL } from '~/consts/consts';

useHead({ title: 'EE | Регистрация' })

const username = ref('');
const password = ref('');
const email = ref('');
const errorMessage = ref('');

const router = useRouter();
const authStore = useAuthStore()

const register = () => {
  $fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: {
      username: username.value,
      email: email.value,
      password: password.value
    },
  })
  .then(response => {
    authStore.login(username.value, response.token)
    router.push('/')
  })
  .catch(error => {
    errorMessage.value = error.message || 'Ошибка при регистрации'
  })
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
