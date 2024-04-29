<template>
  <div class="content" v-if="lesson" :key="lesson.lesson_id">
    <h1 v-if="lesson" :key="lesson.lesson_id">{{ lesson.title }}</h1>

    <article v-if="lesson" :key="lesson.lesson_id">
      <Article :content="lesson.content_text" :key="lesson.lesson_id"/>
    </article>

    <div>
      <h3>Тесты</h3>
      <p v-for="quiz in quizzes">
        <NuxtLink :href="`/quizzes/${quiz.quiz_id}`">
          {{ quiz.title }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
});

import { API_URL } from '~/consts/consts';

let token = useCookie('token', { readonly: true })
let route = useRoute()

const { data: lesson } = await useAsyncData('lessonData', async () => {
  if (!token.value) {
    alert('No token available');
    return;
  }

  const response = await fetch(`${API_URL}/lessons/${route.params.id}`, {
    headers: {
      authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    alert('Failed to fetch lesson');
    return;
  }

  return response.json();
});

useHead({ title: `EE | ${lesson.value.title}` })

const { data: quizzes } = await useAsyncData('quizzData', async () => {
  if (!token.value) {
    alert('No token available');
    return;
  }

  const response = await fetch(`${API_URL}/lessons/${route.params.id}/quizzes`, {
    headers: {
      authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    alert('Failed to fetch quizzes for lesson');
    return;
  }

  return response.json();
})

</script>

<style scoped>
</style>