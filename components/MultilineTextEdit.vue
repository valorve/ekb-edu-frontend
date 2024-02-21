<template>
  <textarea
    :id="id"
    :style="{ height: height }"
    :value="modelValue"
    @input="handleInput"
  ></textarea>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  height: {
    type: String,
    default: '100px',
  },
  id: String,
});

const emits = defineEmits(['update:modelValue']);

// Обновляем значение при вводе пользователя
function handleInput(event) {
  emits('update:modelValue', event.target.value);
}
</script>

<style scoped>
textarea {
  width: 100%;
  height: 120px;
  padding: 8px 16px;
  box-sizing: border-box;
  border: 2px solid #363646;
  outline: none;
  border-radius: 8px;
  background-color: #1F1F28;
  resize: none;
  font-size: 14px;
  font-family: sans-serif;
  color: #DCD7BA;
}
</style>
