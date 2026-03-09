export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return;

  const logged = useCookie("logged");

  if (!logged.value) {
    console.log("Não autenticado, faça o login...");
    return navigateTo("/login");
  }
});
