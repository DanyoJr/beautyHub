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

    <main class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Meus Agendamentos</h1>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        <button v-for="tab in tabs" :key="tab.value" @click="tabAtiva = tab.value"
          :class="['px-4 py-2 text-sm font-semibold rounded-lg transition-all', tabAtiva === tab.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700']">
          {{ tab.label }}
        </button>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-else-if="agendamentosFiltrados.length === 0" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p class="text-gray-500 font-medium">Nenhum agendamento {{ tabAtiva === 'proximos' ? 'futuro' : 'passado' }}</p>
        <NuxtLink v-if="tabAtiva === 'proximos'" to="/cliente/busca" class="mt-4 inline-block text-sm font-semibold text-[#6d3483] hover:underline">Encontrar serviços →</NuxtLink>
      </div>

      <div v-else class="space-y-4">
        <div v-for="ag in agendamentosFiltrados" :key="ag.id_agendamento"
          class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
          <!-- Logo empresa -->
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6d3483]/20 to-[#dd4f6e]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img v-if="ag.empresa?.imagem" :src="ag.empresa.imagem" class="w-full h-full object-cover" />
            <UIcon v-else name="i-heroicons-building-storefront" class="w-7 h-7 text-[#6d3483]/50" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <p class="font-bold text-gray-900">{{ ag.empresa?.nome || 'Empresa' }}</p>
                <p class="text-sm text-[#6d3483] font-medium">{{ ag.servico?.nome }}</p>
              </div>
              <span :class="statusClass(ag.status)" class="text-xs px-2.5 py-0.5 rounded-full font-medium">{{ statusLabel(ag.status) }}</span>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">
              <span><UIcon name="i-heroicons-calendar" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />{{ dataFormatada(ag.data_hora_inicio) }}</span>
              <span><UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />{{ horaFormatada(ag.data_hora_inicio) }}</span>
              <span><UIcon name="i-heroicons-banknotes" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />R$ {{ Number(ag.servico?.valor || 0).toFixed(2) }} (externo)</span>
            </div>
            <!-- Ações -->
            <div class="flex gap-2 mt-3">
              <button v-if="ag.status === 'aberto' && podeCancelar(ag.data_hora_inicio)" @click="cancelar(ag.id_agendamento)"
                class="text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
                Cancelar
              </button>
              <button v-if="ag.status === 'concluido' && !ag.avaliado" @click="abrirAvaliacao(ag)"
                class="text-xs px-3 py-1.5 border border-amber-300 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-medium flex items-center gap-1">
                <UIcon name="i-heroicons-star" class="w-3.5 h-3.5" />Avaliar
              </button>
              <span v-if="ag.avaliado" class="text-xs text-green-500 flex items-center gap-1">
                <UIcon name="i-heroicons-check-circle" class="w-3.5 h-3.5" />Avaliado
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de avaliação -->
    <AvaliacaoModal v-model="avaliacaoAberta" :agendamento="agendamentoAvaliando" @saved="loadAgendamentos" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const user = ref<any>(null);
const agendamentos = ref<any[]>([]);
const loading = ref(true);
const tabAtiva = ref<'proximos' | 'passados'>('proximos');
const avaliacaoAberta = ref(false);
const agendamentoAvaliando = ref<any>(null);

const tabs = [
  { label: 'Próximos', value: 'proximos' },
  { label: 'Passados', value: 'passados' },
];

const agora = new Date();

const agendamentosFiltrados = computed(() => {
  return agendamentos.value.filter(ag => {
    const inicio = new Date(ag.data_hora_inicio);
    if (tabAtiva.value === 'proximos') return inicio >= agora && ag.status === 'aberto';
    return inicio < agora || ag.status !== 'aberto';
  });
});

function statusLabel(s: string) { return { aberto: 'Confirmado', concluido: 'Concluído', cancelado: 'Cancelado' }[s] || s; }
function statusClass(s: string) { return { aberto: 'bg-blue-50 text-blue-600', concluido: 'bg-green-50 text-green-600', cancelado: 'bg-red-50 text-red-400' }[s] || ''; }
function dataFormatada(d: string) { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }); }
function horaFormatada(d: string) { return new Date(d).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
function podeCancelar(dataHora: string) {
  return (new Date(dataHora).getTime() - Date.now()) > 12 * 60 * 60 * 1000;
}

async function cancelar(id_agendamento: string) {
  await $fetch(`/api/appointment/${id_agendamento}`, { method: 'PUT', credentials: 'include', body: { status: 'cancelado' } });
  await loadAgendamentos();
}

function abrirAvaliacao(ag: any) {
  agendamentoAvaliando.value = ag;
  avaliacaoAberta.value = true;
}

async function loadAgendamentos() {
  if (!user.value) return;
  loading.value = true;
  try {
    const data = await $fetch(`/api/appointment/cliente/${user.value._id}`, { credentials: 'include' }) as any;
    agendamentos.value = data.agendamentos || [];
  } catch { agendamentos.value = []; }
  finally { loading.value = false; }
}

onMounted(async () => {
  const data = await $fetch('/api/auth/me', { credentials: 'include' }) as any;
  user.value = data.user;
  await loadAgendamentos();
});
</script>
