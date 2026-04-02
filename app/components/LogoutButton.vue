<template>
  <UButton
    class="logout-button"
    @click="handleLogout"
    icon="i-heroicons-outline-logout"
    color="neutral"
    variant="ghost"
    >Sair</UButton
  >
</template>
<script setup lang="ts">
async function handleLogout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  navigateTo("/");
}
</script>
<style scoped>
.logout-button {
  cursor: pointer;
  font-size: 16px;
  color: #333 !important;
  background-color: transparent !important;
  transition: all 0.2s ease;
}
.logout-button:hover {
  background-color: #f9fafb !important;
  color: #777 !important;
}
</style>
