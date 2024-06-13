<template>
  <div class="content">
    <h1>{{ section.title }}</h1>
    <li v-for="lesson in lessons" :key="lesson.lesson_id">
      <NuxtLink :to="`/lessons/${lesson.lesson_id}`">
        {{ lesson.title }}
      </NuxtLink>
    </li>
  </div>
</template>

<script setup>
import { API_URL } from '~/consts/consts';

const route = useRoute();
const lessons = ref([])

const getLessons = async (section_id) => {
  const response = await $fetch(`${API_URL}/courses/sections/${section_id}/lessons`)

  response.sort((a, b) => a.order > b.order)

  lessons.value = response
  maxLesson = lessons.value.length
}

const { data: section } = await useAsyncData('sectionData', async () => {
  const response = await fetch(`${API_URL}/courses/sections/${route.params.id}`);

  if (!response.ok) {
    alert('Failed to fetch section');
    return;
  }

  return response.json();
});

await getLessons(route.params.id)

useHead({ title: `EE | ${section.value.title}` })
</script>

<style scoped>

</style>