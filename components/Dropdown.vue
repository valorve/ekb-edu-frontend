<template>
  <div class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      <slot v-if="selected" name="button-content"> Выбрано: {{ selected.text }}</slot>
      <slot v-else>Нет элементов</slot>
    </button>
    <div class="dropdown-content" v-if="isOpen">
      <a v-for="item in items" :key="item.value" href="#" @click.prevent="selectItem(item)">
        {{ item.text }}
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: Array, // Массив элементов меню { text: String, value: Any }
  onSelect: Function, // Функция обратного вызова при выборе элемента
});

const selected = ref(props.items[0])
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectItem(item) {
  if (typeof props.onSelect === 'function') {
    props.onSelect(item);
  }
  
  selected.value = item
  isOpen.value = false; // Закрыть dropdown после выбора
}
</script>

<style scoped>
.dropdown-button {
  background-color: #1F1F28;
  color: #DCD7BA;
  border: none;
  padding: 8px 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-button:hover {
  background-color: #2A2A37;
}

.dropdown-content {
  position: absolute;
  background-color: #1F1F28;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
}

.dropdown-content a {
  color: #DCD7BA;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #2A2A37;
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown button {
  width: 100%;
}
</style>