export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const token = localStorage.getItem('token');
  
        // Если токен существует и мы находимся на странице входа, перенаправляем на главную
        if (token && to.path === '/login')
            return navigateTo('/');
        
        if (!token && to.path !== '/login')
            return navigateTo('/login');
    }
});