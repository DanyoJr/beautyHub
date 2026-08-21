<template>
  <div class="flex flex-col w-full bg-white rounded-2xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-800">Todos os Agendamentos</h2>
      <div class="w-full sm:max-w-xs">
        <input v-model="search" type="text" placeholder="Buscar empresa, cliente ou serviço..." class="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#6d3483] text-sm" />
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="filteredAppointments.length === 0" class="text-center py-12 text-gray-500">
      <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p>Nenhum agendamento encontrado.</p>
    </div>

    <UTable v-else :data="filteredAppointments" :columns="columns" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h, resolveComponent } from 'vue';
const UBadge = resolveComponent('UBadge');

const search = ref('');
const loading = ref(true);
const appointments = ref<any[]>([]);

const filteredAppointments = computed(() => {
  let result = appointments.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    result = result.filter(a => 
      a.empresa?.nome?.toLowerCase().includes(q) ||
      a.cliente?.nome?.toLowerCase().includes(q) ||
      a.servico?.nome?.toLowerCase().includes(q)
    );
  }
  return result;
});

const columns = [
  { accessorKey: "empresa.nome", header: "Empresa", cell: ({ row }: any) => row.original.empresa?.nome || '-' },
  { accessorKey: "cliente.nome", header: "Cliente", cell: ({ row }: any) => row.original.cliente?.nome || '-' },
  { accessorKey: "servico.nome", header: "Serviço", cell: ({ row }: any) => row.original.servico?.nome || '-' },
  { 
    accessorKey: "data_hora_inicio", 
    header: "Data / Hora", 
    cell: ({ row }: any) => {
      const d = new Date(row.original.data_hora_inicio);
      return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }: any) => {
      const st = row.original.status;
      const color = st === 'aberto' ? 'blue' : (st === 'concluido' ? 'green' : 'red');
      const label = st === 'aberto' ? 'Confirmado' : (st === 'concluido' ? 'Concluído' : 'Cancelado');
      return h(UBadge, { variant: "subtle", color }, () => label);
    }
  }
];

onMounted(async () => {
  try {
    const res = await $fetch('/api/appointment/all', { credentials: 'include' }) as any;
    appointments.value = res.agendamentos || [];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
