<template>
  <div class="content">
    <h1>Редактирование курса</h1>

    <div class="edit-sections">
      <p>
        <NuxtLink :to="`/admin/courses/${route.params.id}/sections`">
          Редактировать секции
        </NuxtLink>
      </p>
      <p>
        <NuxtLink :to="`/admin/courses/${route.params.id}/lessons`">
          Редактировать уроки
        </NuxtLink>
      </p>
    </div>

    <form @submit.prevent="saveChanges">
      <input id="title" v-model="title" type="text" required placeholder="Заголовок">
      <MultilineTextEdit id="description" v-model="description" height="200px" />
      <button type="submit">
        <div class="loading-text">
          Сохранить
        </div>
        <span class="loader" v-if="loading"></span>
      </button>
    </form>

    <div class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { API_URL } from '~/consts/consts';

definePageMeta({ middleware: ['auth'] });
useHead({ title: `EE Admin | Редактирование курса` })

const route = useRoute()
const token = useCookie("token")

const title = ref('')
const description = ref('')
const loading = ref(false)

const errorMessage = ref('')

const { data: course } = await useFetch(`${API_URL}/courses/${route.params.id}`)

title.value = course.value.title
description.value = course.value.description

const saveChanges = async () => {
  try {
    loading.value = true;
    const response = await $fetch(`${API_URL}/courses/${route.params.id}`, {
      method: 'patch',
      body: {
        title: title.value,
        description: description.value,
      },
      headers: {
        authorization: `Bearer ${token.value}`,
      },
    });
    
  } catch (error) {
    errorMessage.value = 'Ошибка';
  }

  loading.value = false;
};
</script>

<style scoped>
.error {
  margin-top: 16px;
  color: #ff8585;
}

button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.loading-text {
  margin-right: 8px;
}

.edit-sections {
  font-weight: bold;
  margin-bottom: 16px;
}

</style>