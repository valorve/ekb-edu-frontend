<template>
  <div class="content">
    <h1>Редактирование уроков</h1>
    
    <form @submit.prevent="saveChanges">
      <Dropdown :items="dropdownOptions" :onSelect="handleSelect" />

      <div class="lesson" v-for="(lesson, index) in lessons">
        <div class="lesson-title">
          <NuxtLink :to="`/admin/lessons/${lesson.lesson_id}`">
            {{ lesson.title }}
          </NuxtLink>
        </div>

        <div class="actions">
          <button class="action delete-button" @click.prevent="deleteLesson(lesson.lesson_id)">✕</button>
          <button class="action" v-if="index !== 0" @click.prevent="moveLesson(index, -1)">↑</button>
          <button class="action" v-if="index !== lessons.length - 1" @click.prevent="moveLesson(index, 1)">↓</button>
        </div>
      </div>

      <p v-if="!lessons || !lessons.length">
        Для данной секции нет уроков
      </p>

      <button @click.prevent="addLesson">
        <div class="loading-text">
          Добавить
        </div>
        <span class="loader" v-if="loadingAdd"></span>
      </button>

      <button type="submit">
        <div class="loading-text">
          Сохранить
        </div>
        <span class="loader" v-if="loadingSave"></span>
      </button>

    </form>
  </div>
</template>

<script setup>
import { API_URL } from '~/consts/consts';

definePageMeta({ middleware: ['auth'] });
useHead({ title: `EE Admin | Редактирование уроков` })

const route = useRoute()
const token = useCookie("token")
const lessons = ref([])
const selectedSection = ref({})
const loadingAdd = ref(false)
const loadingSave = ref(false)

let maxLesson = 0

const { data: sections } = await useFetch(`${API_URL}/courses/${route.params.id}/sections`)

const dropdownOptions = ref(sections.value
  .slice() // Создаем копию, чтобы не изменять исходный массив
  .sort((a, b) => a.order - b.order) // Сортировка по порядку
  .map(section => ({
    ...section,
    text: section.title, // Текст для отображения
    value: section.section_id // Значение для взаимодействия с бэкендом
  })));

const handleSelect = async (item) => {
  await getLessons(item.value)
  selectedSection.value = item.value
}

const getLessons = async (section_id) => {
  const response = await $fetch(`${API_URL}/courses/sections/${section_id}/lessons`, {
    headers: {
      authorization: `Bearer ${token.value}`
    }
  })

  response.sort((a, b) => a.order > b.order)

  lessons.value = response
  maxLesson = lessons.value.length
}

const addLesson = async () => {
  loadingAdd.value = true
  const response = await $fetch(`${API_URL}/lessons`, {
    method: 'POST',
    body: {
      title: 'Новый урок',
      order: lessons.value.length,
      section_id: selectedSection.value.section_id,
    },
    headers: {
      authorization: `Bearer ${token.value}`
    }
  })

  loadingAdd.value = false
  lessons.value.push(response)
  maxLesson = lessons.value.length
}

const deleteLesson = async (id) => {
  await $fetch(`${API_URL}/lessons/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token.value}`
    }
  })

  const index = lessons.value.findIndex((item) => {
      return item.lesson_id === id
  });

  if (index !== -1) {
    lessons.value.splice(index, 1)
  }

  maxLesson = lessons.value.length
}

function moveLesson(index, direction) {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < lessons.value.length) {
    // Меняем элементы местами
    const temp = lessons.value[index]
    lessons.value[index] = lessons.value[newIndex]
    lessons.value[newIndex] = temp
    // Обновляем порядок секций
    lessons.value = lessons.value.map((lesson, newIndex) => {
      const newLesson = { ...lesson }
      newLesson.order = newIndex + 1
      return newLesson
    })
  }
}

const saveChanges = async () => {
  try {
    // Создаем массив промисов из запросов на сохранение каждой секции
    const savePromises = lessons.value.map(lesson =>
      $fetch(`${API_URL}/lessons/${lesson.lesson_id}`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        body: {
          title: lesson.title,
          order: lesson.order,
        }
      })
      .catch(error => ({
        error: true, // Индикатор ошибки
        message: error.message // Сообщение об ошибке
      }))
    )

    loadingSave.value = true
    const results = await Promise.all(savePromises)
    maxLesson = lessons.value.length
    loadingSave.value = false

    // Обрабатываем результаты
    results.forEach(({ lesson_id, error, message }) => {
      if (error) {
        console.error(`Ошибка при сохранении уркоа с ID ${lesson_id}: ${message}`)
      }
    })
    
  } catch (error) {
    console.error('Произошла ошибка при сохранении данных:', error)
  }
}

await getLessons(dropdownOptions.value[0].section_id)
selectedSection.value = dropdownOptions.value[0]

</script>

<style scoped>
button {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
}

.loading-text {
  margin-right: 8px;
}

.lesson {
  display: flex;
  align-items: center;
  justify-content: stretch;
  justify-items: stretch;
  margin-bottom: 8px;
}

.lesson-title {
  width: 100%;
}

button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.lesson button {
  margin-left: 8px;
}

.actions {
  display: flex;
  justify-content: stretch;
  justify-items: stretch;
}

.action {
  width: 32px;
}

.delete-button {
  background-color: #9B5163;
}

.delete-button:hover {
  background-color: #E68484;
}
</style>