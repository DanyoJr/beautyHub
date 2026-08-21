// Middleware para proteger rotas da área da empresa
export default defineNuxtRouteMiddleware(async () => {
  const logged = useCookie("logged");
  if (!logged.value) return navigateTo("/");

  try {
    const headers = useRequestHeaders(["cookie"]);
    const data = await $fetch("/api/auth/me", { headers });
    const user = (data as any)?.user;

    if (!user) return navigateTo("/");
    if (user.roles !== "empresa" && user.roles !== "admin") {
      return navigateTo("/cliente/busca");
    }
  } catch {
    return navigateTo("/");
  }
});
