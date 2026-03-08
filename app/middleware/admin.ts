export default defineNuxtRouteMiddleware(async (to) => {
  const logged = useCookie("logged");

  if (!logged.value) return navigateTo("/login");

  try {
    const headers = useRequestHeaders(["cookie"]); // ← pega os cookies da requisição

    const data = await $fetch("/api/auth/me", {
      headers, // ← passa os cookies para a requisição
    });

    if ((data as any)?.user?.roles !== "admin") return navigateTo("/home");
  } catch (e) {
    console.log("erro:", e);
    return navigateTo("/login");
  }
});
