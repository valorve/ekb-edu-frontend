<template>
  <div class="content">
    <h1>Редактирование секций</h1>
    <form @submit.prevent="saveChanges">
      <div v-for="(section, index) in sections" :key="section.section_id" class="section-input">
        <input
          v-model="section.title"
          type="text"
          placeholder="Заголовок"
          required
        >

        <button class="delete-button" @click.prevent="deleteSection(section.section_id)">✕</button>
        <button v-if="index !== 0" @click.prevent="moveSection(index, -1)">↑</button>
        <button v-if="index !== sections.length - 1" @click.prevent="moveSection(index, 1)">↓</button>
      </div>
      <button @click.prevent="createSection()">
        <div class="button-text">Добавить</div>
        <span class="loader" v-if="loadingAdd"></span>
      </button>
      <button type="submit">
        <div class="button-text">Сохранить</div>
        <span class="loader" v-if="loadingSave"></span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { API_URL } from '~/consts/consts'

definePageMeta({ middleware: ['auth'] });
useHead({ title: `EE Admin | Редактирование секций` })

const token = useCookie("token")
const route = useRoute()
const sections = ref([])
const loadingSave = ref(false)
const loadingAdd = ref(false)

let maxSection = 0

const { data: fetchedSections } = await useFetch(`${API_URL}/courses/${route.params.id}/sections`)

if (fetchedSections.value && Array.isArray(fetchedSections.value)) {
  sections.value = fetchedSections.value.map((section, index) => ({
    ...section,
  }))

  maxSection = sections.value.length
}

sections.value.sort((a, b) => a.order > b.order)

const saveChanges = async () => {
  try {
    // Создаем массив промисов из запросов на сохранение каждой секции
    const savePromises = sections.value.map(section =>
      $fetch(`${API_URL}/courses/sections/${section.section_id}`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        body: {
          title: section.title,
          order: section.order,
        }
      }).then(response => ({
        section_id: section.section_id,
        response // Сохраняем ответ для последующей обработки
      }))
      .catch(error => ({
        section_id: section.section_id,
        error: true, // Индикатор ошибки
        message: error.message // Сообщение об ошибке
      }))
    )

    loadingSave.value = true
    const results = await Promise.all(savePromises)
    maxSection = sections.value.length
    loadingSave.value = false

    // Обрабатываем результаты
    results.forEach(({ section_id, response, error, message }) => {
      if (error) {
        console.error(`Ошибка при сохранении секции с ID ${section_id}: ${message}`)
      }
    })
    
  } catch (error) {
    console.error('Произошла ошибка при сохранении данных:', error)
  }
}

const createSection = async () => {
  loadingAdd.value = true
  try {
    const response = await $fetch(`${API_URL}/courses/${route.params.id}/section`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token.value}`,
      },
      body: {
        title: '',
        order: maxSection
      }
    })

    sections.value.push(response)
  } catch (error) {
    alert(error)
  }
  finally {
    loadingAdd.value = false
  }
}

const deleteSection = async (section_id) => {
  try {
    await $fetch(`${API_URL}/courses/sections/${section_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token.value}`,
      }
    })
  } catch (error) {
    alert(error)
  }
  finally {
    const index = sections.value.findIndex((item) => {
      return item.section_id === section_id
    });

    if (index > -1) {
      sections.value.splice(index, 1)
    }
  }
}

function moveSection(index, direction) {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < sections.value.length) {
    // Меняем элементы местами
    const temp = sections.value[index]
    sections.value[index] = sections.value[newIndex]
    sections.value[newIndex] = temp
    // Обновляем порядок секций
    sections.value = sections.value.map((section, newIndex) => {
      const newSection = { ...section }
      newSection.order = newIndex + 1
      return newSection
    })
  }
}
</script>

<style scoped>

.section-input {
  display: flex;
  align-items: center;
}

button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.section-input button {
  margin-left: 8px;
}

.button-text {
  margin-right: 8px;
}

input {
  width: 100%;
}

.delete-button {
  background-color: #9B5163;
}

.delete-button:hover {
  background-color: #E68484;
}
</style>
