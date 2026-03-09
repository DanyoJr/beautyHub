<template>
  <UButton @click="handleLogout" icon="i-heroicons-outline-logout"
    >Sair</UButton
  >
</template>
<script setup lang="ts">
async function handleLogout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  navigateTo("/login");
}
</script>
