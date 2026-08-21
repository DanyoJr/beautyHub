export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  
  const userRole = useState<string | null>('userRole', () => null);

  if (!userRole.value) {
    try {
      const data = await $fetch('/api/auth/me');
      const user = (data as any)?.user;
      if (user) {
        userRole.value = user.roles;
      }
    } catch (error) {
      // Falha silenciosa
    }
  }

  if (userRole.value === 'admin') {
    return navigateTo('/Admin');
  }
  
  if (userRole.value === 'empresa') {
    return navigateTo('/empresa/dashboard');
  }
});
