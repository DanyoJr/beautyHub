export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  
  try {
    const data = await $fetch('/api/auth/me');
    const user = (data as any)?.user;
    
    if (!user) return;

    if (user.roles === 'admin') {
      return navigateTo('/Admin');
    }
    
    if (user.roles === 'empresa') {
      return navigateTo('/empresa/dashboard');
    }
  } catch (error) {
    // Falha silenciosa, usuário pode não estar logado ou token expirado
  }
});
