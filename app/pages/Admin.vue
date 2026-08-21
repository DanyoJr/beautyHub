<template>
  <div class="container">
    <div class="header-container">
      <img src="~/assets/Logo.png" alt="Logo" />
      <LogoutButton />
    </div>
    <GradientDivisor />
    
    <div class="table-container">
      <UTabs :items="tabs" v-model="activeTab" class="w-full">
        <template #empresas="{ item }">
          <div class="mt-4">
            <AllEnterprises />
          </div>
        </template>

        <template #buscar="{ item }">
          <div class="mt-4">
            <SearchComponent />
          </div>
        </template>

        <template #historico="{ item }">
          <div class="mt-4">
            <HistoryComponent />
          </div>
        </template>

        <template #agendamentos="{ item }">
          <div class="mt-4">
            <AdminAppointments />
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({ middleware: 'auth' });

const activeTab = ref(0);

const tabs = [
  { label: 'Empresas', slot: 'empresas', icon: 'i-heroicons-building-office' },
  { label: 'Buscar Serviços', slot: 'buscar', icon: 'i-heroicons-magnifying-glass' },
  { label: 'Meus Agendamentos', slot: 'historico', icon: 'i-heroicons-calendar-days' },
  { label: 'Todos os Agendamentos', slot: 'agendamentos', icon: 'i-heroicons-clipboard-document-list' },
];
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #fafafa;
  min-width: 100%;
  overflow-x: hidden;
}
img {
  width: 150px;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 40px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  box-sizing: border-box;
}
</style>
