export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("token");

  if (token.value) {
    console.log("Usuário autenticado, redirecionando para home...");
    return navigateTo("/home");
  }
});
