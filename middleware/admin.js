export default defineNuxtRouteMiddleware((to, from) => { 
    const token = useCookie('token', { readonly: true }).value
    if (!token || !token.admin)
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
        })
});