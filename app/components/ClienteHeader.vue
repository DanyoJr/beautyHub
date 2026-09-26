<template>
  <header class="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm relative">
    <div class="flex items-center gap-3">
      <NuxtLink v-if="backTo" :to="backTo" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-gray-600" />
      </NuxtLink>
      <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[120px] md:w-[150px]" />
    </div>

    <!-- Desktop Menu -->
    <nav class="hidden md:flex items-center gap-1">
      <NuxtLink to="/cliente/busca" :class="getLinkClass('/cliente/busca')">
        <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 inline mr-1" />Buscar
      </NuxtLink>
      <NuxtLink to="/cliente/historico" :class="getLinkClass('/cliente/historico')">
        <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 inline mr-1" />Meus Agendamentos
      </NuxtLink>
      <NuxtLink to="/cliente/perfil" :class="getLinkClass('/cliente/perfil')">
        <UIcon name="i-heroicons-user-circle" class="w-4 h-4 inline mr-1" />Perfil
      </NuxtLink>
      <LogoutButton class="ml-2" />
    </nav>

    <!-- Mobile Menu Button -->
    <div class="flex items-center gap-2 md:hidden">
      <LogoutButton />
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
        <UIcon :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-6 h-6 block" />
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-if="mobileMenuOpen" class="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg flex flex-col p-4 gap-2 md:hidden">
      <NuxtLink to="/cliente/busca" :class="getLinkClass('/cliente/busca')" @click="mobileMenuOpen = false">
        <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 inline mr-2" />Buscar
      </NuxtLink>
      <NuxtLink to="/cliente/historico" :class="getLinkClass('/cliente/historico')" @click="mobileMenuOpen = false">
        <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 inline mr-2" />Meus Agendamentos
      </NuxtLink>
      <NuxtLink to="/cliente/perfil" :class="getLinkClass('/cliente/perfil')" @click="mobileMenuOpen = false">
        <UIcon name="i-heroicons-user-circle" class="w-5 h-5 inline mr-2" />Perfil
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  backTo?: string
}>();

const route = useRoute();
const mobileMenuOpen = ref(false);

const getLinkClass = (path: string) => {
  const baseClass = "px-3 py-3 md:py-2 text-sm font-medium rounded-lg transition-colors flex items-center";
  if (route.path === path || (path === '/cliente/busca' && route.path.startsWith('/cliente/empresa'))) {
    return `${baseClass} bg-[#6d3483]/10 text-[#6d3483]`;
  }
  return `${baseClass} text-gray-600 hover:bg-gray-100`;
};
</script>
