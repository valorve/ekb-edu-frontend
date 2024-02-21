<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script setup>
const props = defineProps({
  content: String
});

const { toHtml } = useNuxtApp().$markdown;
const renderedMarkdown = toHtml(props.content);
</script>