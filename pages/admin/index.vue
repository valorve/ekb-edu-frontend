<template>
  <div class="content">
    <h1>Панель администратора</h1>

    <h4><NuxtLink to="/admin/courses">Мои курсы</NuxtLink></h4>
    <h4><NuxtLink to="/admin/users">Пользователи</NuxtLink></h4>
    
  </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] });
useHead({ title: `EE Admin` })
</script>

<style scoped>
</style>