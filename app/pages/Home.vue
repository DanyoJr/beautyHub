<template>
  <h1>{{ message }}</h1>
  <button @click="handleLogout">Sair</button>
</template>

<script setup lang="ts">
// definePageMeta({
//   middleware: "auth",
// });

const { data } = await useFetch("/api/auth/me");
const user = computed(() => data.value?.user);

const message = user.value
  ? `Bem-vindo, ${user.value?.name}!`
  : "Bem-vindo! Faça login para agendar.";

async function handleLogout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  navigateTo("/login");
}
</script>
