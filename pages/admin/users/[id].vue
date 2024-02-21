<template>
  <div>
    User: {{ userID }}
  </div>
</template>

<script setup>
const userID = useRoute().params.id
</script>

<style>

</style>