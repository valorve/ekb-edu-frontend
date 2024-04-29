<template>
  <div class="content">
    <h1>
      Доступные уроки
    </h1>

    <ul>
      <li v-for="lesson in lessons" :key="lesson.lesson_id">
        <div class="lesson">
          <NuxtLink :to="`/lessons/${lesson.lesson_id}`">
            {{ lesson.title }}
          </NuxtLink>
        </div>

        <div class="location">
          <div class="course">
            <NuxtLink :to="`/courses/${lesson.course_id}`">
            {{ lesson.course_title }}
          </NuxtLink>
          </div>
          
          <div class="section">
            <NuxtLink :to="`/sections/${lesson.section_id}`">
            {{ lesson.section_title }}
          </NuxtLink>
          </div>
        </div>

      </li>
    </ul>

  </div>
</template>

<style scoped>
</style>

<script setup>
import { API_URL } from '~/consts/consts';
import { useAsyncData } from 'nuxt/app';

definePageMeta({
  middleware: ['auth']
});

useHead({ title: `EE | Уроки` })

const { data: lessons, error, pending } = useAsyncData('lessonsData', async () => {
 const token = useCookie('token', { readonly: true }).value;
  if (!token) {
    alert('No token available');
    return;
  }

  const response = await fetch(`${API_URL}/lessons`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    alert('Failed to fetch lessons');
    return;
  }

  return response.json();
});

</script>


<style scoped>
.lesson {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.lesson, a {
  color: #DCD7BA;
}

.lesson, a:hover {
    color: #7E9CD8;
}

.course, .section {
  font-size: 14px;
  margin-right: 8px;
}

.location {
  list-style-type: none;
  display: flex;
}
ul {
  list-style-position: outside;
  padding-left: 16px;
}

ul li {
  margin-bottom: 16px;
}
</style>
