export default defineNuxtRouteMiddleware(() => {
  const logged = useCookie("logged");

  if (!logged.value) {
    console.log("Não autenticado, faça o login...");
    return navigateTo("/login");
  }
});
