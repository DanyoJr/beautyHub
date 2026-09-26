<template>
  <div class="min-h-screen bg-[#fafafa]">
    <EmpresaHeader />

    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Seletor de data -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Agenda do Dia</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ dataBR }}</p>
        </div>
        <div class="flex items-center gap-2">
          <button @click="mudarDia(-1)" class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <UIcon name="i-heroicons-chevron-left" class="w-5 h-5 text-gray-600" />
          </button>
          <input type="date" v-model="dataSelecionada" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-[#6d3483]" />
          <button @click="mudarDia(1)" class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <UIcon name="i-heroicons-chevron-right" class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <!-- Resumo do dia -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <p class="text-3xl font-bold text-[#6d3483]">{{ agendamentos.length }}</p>
          <p class="text-xs text-gray-500 mt-1">Total do Dia</p>
        </div>
        <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <p class="text-3xl font-bold text-amber-500">{{ agendamentosAbertos }}</p>
          <p class="text-xs text-gray-500 mt-1">Em Aberto</p>
        </div>
        <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <p class="text-3xl font-bold text-green-500">{{ agendamentosConcluidos }}</p>
          <p class="text-xs text-gray-500 mt-1">Concluídos</p>
        </div>
      </div>

      <!-- Lista de agendamentos -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-else-if="agendamentos.length === 0" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p class="text-gray-500 font-medium">Nenhum agendamento para este dia</p>
        <p class="text-gray-400 text-sm mt-1">Seus horários livres aparecerão aqui quando clientes agendarem</p>
      </div>

      <div v-else class="space-y-3">
        <AppointmentCard
          v-for="ag in agendamentos"
          :key="ag.id_agendamento"
          :appointment="ag"
          @concluir="concluirAgendamento"
          @cancelar="cancelarAgendamento"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'empresa' });

const user = ref<any>(null);
const agendamentos = ref<any[]>([]);
const loading = ref(true);

const hoje = new Date().toISOString().split('T')[0];
const dataSelecionada = ref(hoje);

const dataBR = computed(() => {
  const d = new Date(dataSelecionada.value + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
});

const agendamentosAbertos = computed(() => agendamentos.value.filter(a => a.status === 'aberto').length);
const agendamentosConcluidos = computed(() => agendamentos.value.filter(a => a.status === 'concluido').length);

async function loadUser() {
  const data = await $fetch('/api/auth/me', { credentials: 'include' }) as any;
  user.value = data.user;
}

async function loadAgendamentos() {
  if (!user.value?.id_empresa) return;
  loading.value = true;
  try {
    const data = await $fetch(`/api/appointment/empresa/${user.value.id_empresa}`, {
      credentials: 'include',
      query: { data: dataSelecionada.value },
    }) as any;
    agendamentos.value = data.agendamentos || [];
  } catch {
    agendamentos.value = [];
  } finally {
    loading.value = false;
  }
}

function mudarDia(dias: number) {
  const d = new Date(dataSelecionada.value + 'T12:00:00');
  d.setDate(d.getDate() + dias);
  dataSelecionada.value = d.toISOString().split('T')[0];
}

async function concluirAgendamento(id_agendamento: string) {
  await $fetch(`/api/appointment/${id_agendamento}`, {
    method: 'PUT', credentials: 'include',
    body: { status: 'concluido' },
  });
  await loadAgendamentos();
}

async function cancelarAgendamento(id_agendamento: string) {
  await $fetch(`/api/appointment/${id_agendamento}`, {
    method: 'PUT', credentials: 'include',
    body: { status: 'cancelado' },
  });
  await loadAgendamentos();
}

watch(dataSelecionada, loadAgendamentos);

onMounted(async () => {
  await loadUser();
  await loadAgendamentos();
});
</script>
