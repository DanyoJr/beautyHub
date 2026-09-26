<template>
  <header class="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm relative">
    <div class="flex items-center gap-3">
      <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[120px] md:w-[150px]" />
      <div class="hidden sm:block w-px h-6 bg-gray-200"></div>
      <span class="hidden sm:block text-sm font-medium text-gray-500">Área da Empresa</span>
    </div>

    <!-- Desktop Menu -->
    <nav class="hidden md:flex items-center gap-1">
      <NuxtLink to="/empresa/dashboard" :class="getLinkClass('/empresa/dashboard')">
        <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 inline mr-1" />Agenda
      </NuxtLink>
      <NuxtLink to="/empresa/catalogo" :class="getLinkClass('/empresa/catalogo')">
        <UIcon name="i-heroicons-scissors" class="w-4 h-4 inline mr-1" />Catálogo
      </NuxtLink>
      <NuxtLink to="/empresa/agenda" :class="getLinkClass('/empresa/agenda')">
        <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 inline mr-1" />Configurações
      </NuxtLink>
      <NuxtLink to="/empresa/perfil" :class="getLinkClass('/empresa/perfil')">
        <UIcon name="i-heroicons-building-storefront" class="w-4 h-4 inline mr-1" />Perfil
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
      <NuxtLink to="/empresa/dashboard" :class="getLinkClass('/empresa/dashboard')" @click="mobileMenuOpen = false">
        <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 inline mr-2" />Agenda
      </NuxtLink>
      <NuxtLink to="/empresa/catalogo" :class="getLinkClass('/empresa/catalogo')" @click="mobileMenuOpen = false">
        <UIcon name="i-heroicons-scissors" class="w-5 h-5 inline mr-2" />Catálogo
      </NuxtLink>
      <NuxtLink to="/empresa/agenda" :class="getLinkClass('/empresa/agenda')" @click="mobileMenuOpen = false">
        <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5 inline mr-2" />Configurações
      </NuxtLink>
      <NuxtLink to="/empresa/perfil" :class="getLinkClass('/empresa/perfil')" @click="mobileMenuOpen = false">
        <UIcon name="i-heroicons-building-storefront" class="w-5 h-5 inline mr-2" />Perfil
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const mobileMenuOpen = ref(false);

const getLinkClass = (path: string) => {
  const baseClass = "px-3 py-3 md:py-2 text-sm font-medium rounded-lg transition-colors flex items-center";
  if (route.path === path) {
    return `${baseClass} bg-[#6d3483]/10 text-[#6d3483]`;
  }
  return `${baseClass} text-gray-600 hover:bg-gray-100`;
};
</script>
