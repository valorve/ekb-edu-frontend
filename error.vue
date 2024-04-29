<template>
  <Navbar />
  <div class="error-container">
      <div class="error-code">{{ error.statusCode }}</div>
      <div class="error-message">{{ error.message }}</div>
  </div>
</template>

<script>
  export default {
      props: ['error'],
      layout: 'error', // you can set a custom layout for the error page
  }
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
}

.error-code {
  position: absolute;
  font-size: 256px;
  color: #1F1F28;
  z-index: 1;
  font-weight: bold;
  font-family: monospace;
  user-select: none;
}

.error-message {
  z-index: 2;
  color: #DCD7BA;
}

.home-button {
  margin-top: 20px;
  padding: 10px 20px;
  color: #727169;
  background-color: #16161D;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  z-index: 2;
  font-size: 14px;
}
</style>