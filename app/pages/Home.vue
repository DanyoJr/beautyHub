<template>
  <h1>{{ message }}</h1>
  <LogoutButton />
</template>

<script setup lang="ts">
import LogoutButton from "~/components/LogoutButton.vue";
const user = ref(null) as any;
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await $fetch("/api/auth/me", {
      credentials: "include",
    });
    user.value = (data as any)?.user;
  } catch {
    user.value = null;
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 600);
  }
});

const message = computed(() =>
  user.value
    ? `Bem-vindo, ${user.value?.name}!`
    : "Bem-vindo! Faça login para agendar.",
);
</script>
