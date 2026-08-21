<template>
  <div class="min-h-screen bg-[#fafafa]">
    <header class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[150px]" />
      <nav class="flex items-center gap-1">
        <NuxtLink to="/cliente/busca" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">Buscar</NuxtLink>
        <NuxtLink to="/cliente/historico" class="px-3 py-2 text-sm font-medium rounded-lg bg-[#6d3483]/10 text-[#6d3483] transition-colors">Meus Agendamentos</NuxtLink>
        <NuxtLink to="/cliente/perfil" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">Perfil</NuxtLink>
        <LogoutButton class="ml-2" />
      </nav>
    </header>

    <HistoryComponent />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role-redirect'] });
</script>
