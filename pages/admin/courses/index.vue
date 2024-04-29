<template>
  <div class="content">
    <h1>Мои курсы</h1>

    <p v-for="course in courses">
      <NuxtLink :to="`/admin/courses/${course.course_id}`">{{ course.title }}</NuxtLink>
      <button class="delete-button" @click.prevent="deleteCourse(course.course_id)">✕</button>
    </p>

    <button @click.prevent="addCourse">
      Добавить курс
    </button>
  </div>
</template>

<script setup>
import { API_URL } from '~/consts/consts';

definePageMeta({ middleware: ['auth'] });
useHead({ title: `EE Admin | Курсы` })
const courses = ref([])
const token = useCookie('token')

const updateCourses = async () => {
  const response = await $fetch(`${API_URL}/courses`)
  courses.value = response
}

updateCourses()

const addCourse = async () => {
  const response = await $fetch(`${API_URL}/courses`, {
    method: 'POST',

    headers: {
      authorization: `Bearer ${token.value}`
    },

    body: {
      title: 'Новый курс',
    }
  })

  if (response.error)
    alert(response.error)

  courses.value.push(response)
}

const deleteCourse = async (course_id) => {
  try {
    await $fetch(`${API_URL}/courses/${course_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token.value}`,
      }
    })
  } catch (error) {
    alert(error)
  }

  finally {
    const index = courses.value.findIndex((item) => {
      return item.course_id === course_id
    });

    if (index > -1) {
      courses.value.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.delete-button {
  background-color: rgba(0, 0, 0, 0);
}
</style>