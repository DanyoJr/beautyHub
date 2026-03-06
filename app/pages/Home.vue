<template>
  <h1>João o brabo</h1>
  <button @click="handleLogout">Sair</button>
</template>

<script setup lang="ts">
async function handleLogout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  navigateTo("/login");
}
</script>
