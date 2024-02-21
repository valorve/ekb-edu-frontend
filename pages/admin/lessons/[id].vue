<template>
  <div class="content">
    <h1>Редактирование урока</h1>
    <div class="columns">
      <div class="editor">
        <form @submit.prevent="saveChanges">
          <input id="title" v-model="title" type="text" required placeholder="Заголовок">
          <MultilineTextEdit id="content-text" v-model="content" height="600px" />

          <button type="submit">
            <div class="loading-text">
              Сохранить
            </div>
            <span class="loader" v-if="loading"></span>
          </button>
        </form>
      </div>
      <div class="preview">
        <h1>{{ title }}</h1>
        <div v-html="contentRendered"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { API_URL } from '~/consts/consts';
const { toHtml } = useNuxtApp().$markdown;

definePageMeta({ middleware: ['auth'] });
useHead({ title: `EE Admin | Редактирование урока` })

const route = useRoute()
const token = useCookie("token")
const content = ref('')
const title = ref('')
const contentRendered = ref('')
const loading = ref(false)

watch(content, (newValue) => {
  contentRendered.value = toHtml(newValue);
}, { immediate: true }); // immediate: true гарантирует, что обработчик сработает сразу после инициализации

const { data: lesson } = await useFetch(`${API_URL}/lessons/${route.params.id}`, {
  headers: {
    authorization: `Bearer ${token.value}`
  }
})

title.value = lesson.value.title
content.value = lesson.value.content_text
contentRendered.value = toHtml(content.value)

const saveChanges = async () => {
  try {
    loading.value = true;
    await $fetch(`${API_URL}/lessons/${route.params.id}`, {
      method: 'patch',
      body: {
        title: title.value,
        content_text: content.value,
      },
      headers: {
        authorization: `Bearer ${token.value}`,
      },
    });
    
  } catch (error) {
    
  }

  loading.value = false;
}
</script>

<style scoped>

.content {
  max-width: 1080px;
}

.columns {
  display: grid;
  grid-template-columns: 530px 530px;
}

.editor {
  max-width: 530px;
}

.preview {
  margin-left: 32px;
  max-width: 530px;
  margin-bottom: 64px;
}

button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.loading-text {
  margin-right: 8px;
}
</style>