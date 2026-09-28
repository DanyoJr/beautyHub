<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Hero de busca -->
    <div v-if="currentAgendamento" class="max-w-2xl mx-auto mb-12 relative">
      <h2 class="text-xl font-bold text-gray-900 mb-4 text-center">Seu próximo agendamento</h2>
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 overflow-hidden relative">
        <!-- Logo empresa -->
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6d3483]/20 to-[#dd4f6e]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img v-if="currentAgendamento.empresa?.imagem" :src="currentAgendamento.empresa.imagem" class="w-full h-full object-cover" />
          <UIcon v-else name="i-heroicons-building-storefront" class="w-7 h-7 text-[#6d3483]/50" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p class="font-bold text-gray-900">{{ currentAgendamento.empresa?.nome || 'Empresa' }}</p>
              <p class="text-sm text-[#6d3483] font-medium">{{ currentAgendamento.servico?.nome }}</p>
            </div>
            <span class="bg-blue-50 text-blue-600 text-xs px-2.5 py-0.5 rounded-full font-medium">Confirmado</span>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">
            <span><UIcon name="i-heroicons-calendar" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />{{ dataFormatada(currentAgendamento.data_hora_inicio) }}</span>
            <span><UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />{{ horaFormatada(currentAgendamento.data_hora_inicio) }}</span>
            <span><UIcon name="i-heroicons-banknotes" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />R$ {{ Number(currentAgendamento.servico?.valor || 0).toFixed(2) }} (externo)</span>
          </div>
        </div>
        <!-- Barra de Progresso -->
        <div v-if="proximosAgendamentos.length > 1" class="absolute bottom-0 left-0 h-1 bg-[#6d3483] transition-all duration-75" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
    <div v-else class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Encontre seu espaço</h1>
      <p class="text-gray-500 font-medium">Os melhores serviços de beleza ao seu alcance</p>
    </div>

    <div class="flex gap-4 mb-12 max-w-2xl mx-auto">
      <div class="flex-1 relative">
        <UIcon name="i-heroicons-magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input v-model="busca" type="text" placeholder="Buscar empresas ou serviços..." class="w-full pl-12 pr-4 py-4 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#6d3483] bg-white transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-medium" />
      </div>
      <select v-model="categoriaFiltro" class="border-none rounded-2xl px-6 py-4 text-sm font-medium text-gray-700 bg-white outline-none focus:ring-2 focus:ring-[#6d3483] shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer">
        <option value="">Todas categorias</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="w-10 h-10 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="empresasFiltradas.length === 0" class="text-center py-20">
      <UIcon name="i-heroicons-building-storefront" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p class="text-gray-500 font-bold text-lg">Nenhuma empresa encontrada</p>
      <p class="text-gray-400 text-sm mt-1">Tente ajustar seus termos de busca</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NuxtLink v-for="empresa in empresasFiltradas" :key="empresa.id_empresa" :to="`/cliente/empresa/${empresa.id_empresa}`"
        class="relative rounded-3xl p-6 flex flex-col justify-between h-[360px] group transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-[#6d3483]/10 bg-white shadow-md hover:shadow-xl overflow-hidden"
      >
        <!-- Fundo decorativo (gradient) -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#6d3483]/5 to-[#dd4f6e]/5 z-0"></div>

        <!-- Top info -->
        <div class="z-10 relative">
          <div class="flex items-start justify-between gap-2 mb-3">
            <p class="text-xs font-bold text-[#dd4f6e] uppercase tracking-wider bg-[#dd4f6e]/10 px-3 py-1 rounded-full">
              {{ empresa.categoria_empresa }}
            </p>
          </div>
          <h2 class="text-3xl font-extrabold text-[#6d3483] leading-tight mb-2 line-clamp-2">
            {{ empresa.nome_empresa }}
          </h2>
          <p class="text-sm text-gray-500 font-medium line-clamp-2">{{ empresa.descricao_empresa }}</p>
        </div>

        <!-- Middle visual element -->
        <div class="flex-1 flex items-center justify-center relative w-full my-4 rounded-xl overflow-hidden z-10 border border-gray-100 bg-gray-50/50">
          <img v-if="empresa.imagem_empresa" :src="empresa.imagem_empresa" class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
          <div v-else class="w-full h-full flex flex-col items-center justify-center text-[#6d3483]/20">
            <UIcon name="i-heroicons-building-storefront" class="w-16 h-16 mb-2" />
            <span class="text-xs font-bold tracking-widest uppercase">BeautyHub</span>
          </div>
        </div>

        <!-- Bottom info -->
        <div class="flex items-end justify-between z-10 relative mt-2">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Localização</p>
            <p class="font-bold text-[#6d3483] text-sm flex items-center gap-1">
              <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-[#dd4f6e]" />
              {{ empresa.local?.cidade_empresa || 'Endereço não def.' }}
            </p>
          </div>
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
            style="background: linear-gradient(135deg, #dd4f6e, #6d3483)">
            <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const busca = ref('');
const categoriaFiltro = ref('');
const loading = ref(true);
const empresas = ref<any[]>([]);
const user = ref<any>(null);
const proximosAgendamentos = ref<any[]>([]);
const currentAgendamentoIndex = ref(0);
const progress = ref(100);
let timer: any = null;
let progressTimer: any = null;

const categorias = ['Estética', 'Manicure', 'Cabeleireiro', 'Barbearia', 'Spa', 'Maquiagem', 'Depilação', 'Massagem'];

const empresasFiltradas = computed(() => {
  let result = empresas.value;
  if (categoriaFiltro.value) result = result.filter(e => e.categoria_empresa === categoriaFiltro.value);
  if (busca.value) {
    const q = busca.value.toLowerCase();
    result = result.filter(e =>
      e.nome_empresa?.toLowerCase().includes(q) ||
      e.descricao_empresa?.toLowerCase().includes(q) ||
      e.categoria_empresa?.toLowerCase().includes(q)
    );
  }
  return result;
});

const currentAgendamento = computed(() => {
  if (proximosAgendamentos.value.length === 0) return null;
  return proximosAgendamentos.value[currentAgendamentoIndex.value];
});

function dataFormatada(d: string) { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }); }
function horaFormatada(d: string) { return new Date(d).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }

function startRotation() {
  if (proximosAgendamentos.value.length <= 1) return;
  
  clearInterval(timer);
  clearInterval(progressTimer);
  progress.value = 100;
  
  progressTimer = setInterval(() => {
    progress.value -= (100 / (5000 / 50));
    if (progress.value <= 0) progress.value = 0;
  }, 50);

  timer = setInterval(() => {
    progress.value = 100;
    currentAgendamentoIndex.value = (currentAgendamentoIndex.value + 1) % proximosAgendamentos.value.length;
  }, 5000);
}

onMounted(async () => {
  try {
    const authData = await $fetch('/api/auth/me', { credentials: 'include' }).catch(() => null) as any;
    if (authData?.user) {
      user.value = authData.user;
      const appData = await $fetch(`/api/appointment/cliente/${user.value._id}`, { credentials: 'include' }).catch(() => null) as any;
      if (appData?.agendamentos) {
        const agora = new Date();
        proximosAgendamentos.value = appData.agendamentos.filter((ag: any) => new Date(ag.data_hora_inicio) >= agora && ag.status === 'aberto');
        if (proximosAgendamentos.value.length > 1) {
          startRotation();
        }
      }
    }
    const data = await $fetch('/api/enterprise') as any;
    empresas.value = (data.enterprises || []).filter((e: any) => e.status_empresa === 'ativo');
  } catch {
    empresas.value = [];
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  clearInterval(timer);
  clearInterval(progressTimer);
});
</script>
