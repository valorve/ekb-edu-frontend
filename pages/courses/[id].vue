<template>
  <div class="content">
    <div class="course">
      <img id="course-image" :src="`/courses/${course.course_id}.png`" :alt="`${course.course_id}`">
      <div class="course-title">
        <h2>{{ course.title }}</h2>
        <p class="course-description">{{ course.description }}</p>
      
        <h3 v-if="sections && sections.length > 0">План обучения</h3>
        <div v-if="sections && sections.length > 0" class="sections">
          <ol>
            <li v-for="section in sortedSections" :key="section.section_id">
              <NuxtLink :to="`/sections/${section.section_id}`">
                {{ section.title }}
              </NuxtLink>
            </li>
          </ol> 
        </div>
        
        <h3 v-if="course.meta.features && course.meta.features.length > 0">Стек технологий</h3>
        <div v-if="course.meta.features && course.meta.features.length > 0" class="features">
          <img v-for="feature in course.meta.features" class="feature" :src="`/technologies/${feature}.svg`" :alt="`${feature}`">
        </div>
        
        <button>Записаться</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { API_URL } from '~/consts/consts';

const id = useRoute().params.id
const { data: course } = await useFetch(`${API_URL}/courses/${id}`)
const { data: sections } = await useFetch(`${API_URL}/courses/${id}/sections`)

const sortedSections = computed(() => {
  return sections.value ? sections.value.slice().sort((a, b) => a.order - b.order) : []
})

useHead({ title: `EE | ${course.value.title}` })

</script>

<style scoped>
.content {
  max-width: 1000px;
}

.course {
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  padding-left: 16px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
}

#course-image {
  width: 100%;
  margin-right: 20px;
  object-fit: contain;
}

.course-title {
  display: block;
}

.features {
  height: 48px;
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

.sections {
  color: #727169;
  font-size: 14px;
}

.section {
  
}

ol {
  list-style-position: inside;
  margin: 0;
  padding: 0;
}

button {
  margin-top: 16px;
}
</style>