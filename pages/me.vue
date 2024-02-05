<template>
  <div v-if="!isLoading">
    <h1>Профиль</h1>
    <p>Привет, {{ authStore.username }}!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
});

import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()
const isLoading = ref(true);

if (process.client) {
  onMounted(() => {
    authStore.initializeAuth();
  });

  isLoading.value = false;
}
</script>

<style scoped> 
</style>