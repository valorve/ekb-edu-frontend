<template>
  <div class="content">
    <h1>{{ data.quiz.title }}</h1>
    <form @submit.prevent="saveAnswers">
      <div style="display: flex; flex-direction: column;" v-for="question in data.questions" :key="question.question_id">
        <p>
          <!-- {{ question.question_text }} -->
          <div v-html="question.question_text"></div>
        </p>
        <input v-model="question.correct_answer" type="text" required placeholder="Введите ответ">
      </div>

      <button type="submit">
        <div class="button-text">Сохранить</div>
        <span class="loader" v-if="isLoading"></span>
      </button>

    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
});

import { API_URL } from '~/consts/consts';
const { toHtml } = useNuxtApp().$markdown;

let token = useCookie('token', { readonly: true })
let route = useRoute()
const isLoading = ref(false)

const { data } = await useAsyncData('quizzData', async () => {
  if (!token.value) {
    alert('No token available');
    return;
  }

  const response = await fetch(`${API_URL}/quizzes/${route.params.id}`, {
    headers: {
      authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    alert('Failed to fetch quiz');
    return;
  }

  return response.json();
});

data.questions.value.map(question => {
  question.question_text = toHtml(question.question_text)
})

useHead({ title: `EE | ${data.value.quiz.title}` })

const saveAnswers = async () => {
  isLoading.value = true
  await Promise.all(data.value.questions.map(question => {
    $fetch(`${API_URL}/quizzes/${data.value.quiz.quiz_id}/${question.question_id}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token.value}`,
      },
      body: {
        answer_text: question.correct_answer.value,
      }
    }).catch(error => {
      alert(error)
    })
  }))
  isLoading.value = false
}

</script>

<style scoped>
input {
  width: 100%;
  margin-right: 32px;
}

button {
  justify-content: center;
  align-items: center;
  display: flex;
}

ol {
  list-style-position: outside;
  margin: 0;
  padding: 0;
}

</style>