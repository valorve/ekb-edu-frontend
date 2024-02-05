<style>
* {
    transition: 0.3s;
    font-family: sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    background-color: #16161D;
    color: #DCD7BA;
    accent-color: #7E9CD8;
}

body { 
    height: 100vh;
}

a {
    text-decoration: none;
    color: #7E9CD8;
}

html {
    font-size: 14px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

.page-enter-active, .page-leave-active {
    transition: all 0.2s;
}
.page-enter-from, .page-leave-to {
    opacity: 0;
}

::placeholder {
    color: #727169;
    opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Edge 12 -18 */
    color: #727169;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

input[type="text"], input[type="email"], input[type="password"] {
    padding: 10px;
    border-radius: 5px;
    outline: none;
    background: #1F1F28;
    border: none;
}

.checkbox-container {
    display: flex;
    align-items: center;
    color: #DCD7BA;
}

.checkbox-container input {
    margin-right: 5px;
}

button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #1F1F28;
    color: #DCD7BA;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #2A2A37;
}

</style>

<template>
  <div>
    <Navbar/>
    <NuxtLoadingIndicator :throttle="0" color="repeating-linear-gradient(to right,#7E9CD8 0%,#957FB8 100%)" :height="2"/> 
    <slot />
  </div>
</template>