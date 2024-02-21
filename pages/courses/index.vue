<template> 
  <div v-if="courses" class="content">
    <h1>Доступные курсы</h1>

    <div class="course" v-for="course in courses">
      <div class="course-image">
        <img :src="`/courses/${course.course_id}.png`" :alt="`course_${course.course_id}`" width="128">
      </div>

      <div class="course-title">
        <h3>
          <NuxtLink :to="`/courses/${course.course_id}`">
            {{ course.title }}
          </NuxtLink>
        </h3>
        
        <div class="course-description">
          {{ course.description }}
        </div>

        <div v-if="course.meta.features && course.meta.features.length > 0" class="features">
          <img v-for="feature in course.meta.features" class="feature" :src="`/technologies/${feature}.svg`" :alt="`${feature}`">
        </div>
      </div>
    </div>
  </div>

  <div v-else class="category">
    Ошибка
  </div>

</template>

<style scoped>

.course {
  display: flex;
  justify-content: space-between;
  background-color: #1F1F28;
  padding-left: 16px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
}

.course-title {
  display: block;
}

.course-title, a {
  margin-right: 16px;
  color: #DCD7BA;
}

.course-title, a:hover {
    color: #7E9CD8;
}

.course-author {
  font-size: 14px;
  color: #727169;
}

.course-description {
  font-size: 14px;
  color: #727169;
  font-weight: normal;
  margin-right: 16px;
  margin-bottom: 16px;
}

.course-image {
  margin-top: 16px;
  margin-right: 16px;
}

.course-image, img {
  border-radius: 8px;
}

.features {
  height: 32px;
  display: flex;
}

.feature {
  margin-right: 8px;
  opacity: 20%;
  transition: 0.3s;
}

.feature:hover {
  opacity: 50%;
}
</style>

<script setup>
import { API_URL } from '~/consts/consts';

useHead({ title: 'EE | Курсы' })

const { data: courses } = await useFetch(`${API_URL}/courses`)
</script>