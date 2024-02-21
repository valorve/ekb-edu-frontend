<template>
  <div class="content">
    <h1>Мои курсы</h1>

    <h4 v-for="course in courses">
      <NuxtLink :to="`/admin/courses/${course.course_id}`">{{ course.title }}</NuxtLink>
    </h4>
  </div>
</template>

<script setup>
import { API_URL } from '~/consts/consts';

definePageMeta({ middleware: ['auth'] });
useHead({ title: `EE Admin | Курсы` })

const { data: courses } = await useFetch(`${API_URL}/courses`)
</script>

<style scoped>
</style>