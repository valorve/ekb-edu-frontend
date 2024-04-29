import { API_URL } from "~/consts/consts";

let IsAuthorized = async () => {
    const token = useCookie('token')
    if (token.value == null)
        return false

    // try {
    //     await $fetch(`${API_URL}/auth/restricted`, {
    //         headers: {
    //             authorization: `Bearer ${token.value}`,
    //         }
    //     })
    // }
    // catch (error) {
    //     token.value = null
    //     return false
    // }

    return true
}

export default defineNuxtRouteMiddleware(async (to, from) => { 
    const isAuthorized = await IsAuthorized()
    if (isAuthorized && to.path === '/login')
        return navigateTo('/')
    else if (!isAuthorized && to.path !== '/login')
        return navigateTo('login')
});