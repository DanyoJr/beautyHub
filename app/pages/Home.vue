<template>
  <div class="min-h-screen flex items-center justify-center bg-[#fafafa]">
    <div class="text-center">
      <div class="w-12 h-12 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-500 text-sm">Redirecionando...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Página de roteamento pós-login.
 * Redireciona para a área correta baseado no role do usuário.
 */
onMounted(async () => {
  try {
    const data = await $fetch("/api/auth/me", { credentials: "include" });
    const user = (data as any)?.user;

    if (!user) return navigateTo("/");

    if (user.roles === "admin") return navigateTo("/Admin");
    if (user.roles === "empresa") return navigateTo("/empresa/dashboard");
    return navigateTo("/cliente/busca");
  } catch {
    navigateTo("/");
  }
});
</script>
