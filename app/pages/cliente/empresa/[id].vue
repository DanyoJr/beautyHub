<template>
  <div class="min-h-screen bg-[#fafafa]">
    <header class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div class="flex items-center gap-3">
        <NuxtLink to="/cliente/busca" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-gray-600" />
        </NuxtLink>
        <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[150px]" />
      </div>
      <nav class="flex items-center gap-1">
        <NuxtLink to="/cliente/historico" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">Meus Agendamentos</NuxtLink>
        <LogoutButton class="ml-2" />
      </nav>
    </header>

    <div v-if="loadingEmpresa" class="flex justify-center py-24">
      <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <main v-else-if="empresa" class="max-w-5xl mx-auto px-4 py-8">
      <!-- Cabeçalho da empresa -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div class="h-40 bg-gradient-to-r from-[#6d3483] to-[#dd4f6e] flex items-end p-6">
          <div class="flex items-end gap-4">
            <div class="w-20 h-20 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-lg flex-shrink-0">
              <img v-if="empresa.imagem_empresa" :src="empresa.imagem_empresa" :alt="empresa.nome_empresa" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center bg-[#6d3483]/10">
                <UIcon name="i-heroicons-building-storefront" class="w-10 h-10 text-[#6d3483]" />
              </div>
            </div>
            <div>
              <span class="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-medium">{{ empresa.categoria_empresa }}</span>
              <h1 class="text-2xl font-bold text-white mt-1">{{ empresa.nome_empresa }}</h1>
            </div>
          </div>
        </div>
        <div class="p-6">
          <p class="text-gray-600 text-sm leading-relaxed">{{ empresa.descricao_empresa }}</p>
          <p class="text-xs text-gray-400 mt-3 flex items-center gap-1">
            <UIcon name="i-heroicons-map-pin" class="w-3.5 h-3.5" />
            {{ empresa.local?.logadouro_empresa }}, {{ empresa.local?.numero_empresa }} — {{ empresa.local?.bairro_empresa }}, {{ empresa.local?.cidade_empresa }}/{{ empresa.local?.uf_empresa }}
          </p>
        </div>
      </div>

      <div class="grid lg:grid-cols-5 gap-8">
        <!-- Catálogo de serviços -->
        <div class="lg:col-span-2">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Serviços</h2>
          <div v-if="services.length === 0" class="text-sm text-gray-400 bg-white rounded-xl p-4 border border-gray-100">Nenhum serviço disponível</div>
          <div class="space-y-3">
            <button v-for="s in services" :key="s.id_servico"
              @click="selecionarServico(s)"
              :class="['w-full text-left bg-white rounded-xl border p-4 transition-all hover:shadow-md', servicoSelecionado?.id_servico === s.id_servico ? 'border-[#6d3483] ring-2 ring-[#6d3483]/20' : 'border-gray-100 shadow-sm']">
              <div class="flex items-start justify-between gap-2">
                <p class="font-semibold text-gray-900 text-sm leading-tight">{{ s.nome_servico }}</p>
                <p class="font-bold text-[#6d3483] text-sm flex-shrink-0">R$ {{ Number(s.valor_servico).toFixed(2) }}</p>
              </div>
              <p class="text-xs text-gray-400 mt-1">{{ s.descricao_servico }}</p>
              <p class="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <UIcon name="i-heroicons-clock" class="w-3 h-3" />{{ s.duracao_minutos }} min
              </p>
            </button>
          </div>
        </div>

        <!-- Calendário e Agendamento -->
        <div class="lg:col-span-3">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Agendar</h2>

          <div v-if="!servicoSelecionado" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <UIcon name="i-heroicons-cursor-arrow-rays" class="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-400 text-sm">Selecione um serviço ao lado para ver os horários disponíveis</p>
          </div>

          <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="mb-4 p-3 bg-[#6d3483]/5 rounded-xl">
              <p class="text-sm font-semibold text-[#6d3483]">{{ servicoSelecionado.nome_servico }}</p>
              <p class="text-xs text-gray-500">{{ servicoSelecionado.duracao_minutos }} min · R$ {{ Number(servicoSelecionado.valor_servico).toFixed(2) }} <span class="text-gray-400">(pagamento externo)</span></p>
            </div>

            <label class="block text-xs font-bold text-gray-700 uppercase mb-2">Selecionar Data</label>
            <input v-model="dataSelecionada" type="date" :min="hoje" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4 outline-none focus:border-[#6d3483] transition-colors" @change="buscarDisponibilidade" />

            <div v-if="loadingSlots" class="flex justify-center py-6">
              <div class="w-6 h-6 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
            </div>

            <div v-else-if="dataSelecionada && slotsDisponiveis.length === 0" class="text-center py-6 text-sm text-gray-400">
              Sem horários disponíveis para esta data
            </div>

            <div v-else-if="slotsDisponiveis.length > 0">
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2">Horários Disponíveis</label>
              <div class="grid grid-cols-3 gap-2 mb-5">
                <button v-for="slot in slotsDisponiveis" :key="slot.inicio"
                  @click="slotSelecionado = slot"
                  :class="['py-2 rounded-lg text-sm font-semibold border transition-all', slotSelecionado?.inicio === slot.inicio ? 'bg-[#6d3483] text-white border-[#6d3483]' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#6d3483]']">
                  {{ slot.label }}
                </button>
              </div>

              <p v-if="errorMsg" class="text-sm text-red-500 text-center mb-3">{{ errorMsg }}</p>
              <p v-if="successMsg" class="text-sm text-green-600 text-center mb-3">{{ successMsg }}</p>

              <button v-if="slotSelecionado" @click="confirmarAgendamento" :disabled="agendando"
                class="w-full py-3 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity" style="background: linear-gradient(135deg,#dd4f6e,#6d3483)">
                {{ agendando ? 'Confirmando...' : `Confirmar — ${slotSelecionado.label}` }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div v-else class="text-center py-24 text-gray-400">Empresa não encontrada</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const route = useRoute();
const id_empresa = route.params.id as string;
const toast = useToast();

const empresa = ref<any>(null);
const services = ref<any[]>([]);
const loadingEmpresa = ref(true);
const loadingSlots = ref(false);
const agendando = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const servicoSelecionado = ref<any>(null);
const dataSelecionada = ref('');
const slotsDisponiveis = ref<any[]>([]);
const slotSelecionado = ref<any>(null);

const hoje = new Date().toISOString().split('T')[0];

function selecionarServico(s: any) {
  servicoSelecionado.value = s;
  slotSelecionado.value = null;
  slotsDisponiveis.value = [];
  dataSelecionada.value = '';
}

async function buscarDisponibilidade() {
  if (!dataSelecionada.value || !servicoSelecionado.value) return;
  loadingSlots.value = true;
  slotSelecionado.value = null;
  try {
    const data = await $fetch('/api/appointment/available', {
      query: { id_empresa, id_servico: servicoSelecionado.value.id_servico, data: dataSelecionada.value },
    }) as any;
    slotsDisponiveis.value = data.available || [];
  } catch {
    slotsDisponiveis.value = [];
  } finally {
    loadingSlots.value = false;
  }
}

async function confirmarAgendamento() {
  if (!slotSelecionado.value) return;
  agendando.value = true;
  errorMsg.value = '';
  try {
    await $fetch('/api/appointment', {
      method: 'POST', credentials: 'include',
      body: {
        id_empresa,
        id_servico: servicoSelecionado.value.id_servico,
        data_hora_inicio: slotSelecionado.value.inicio,
      },
    });
    
    toast.add({
      title: 'Sucesso!',
      description: 'Agendamento confirmado com sucesso.',
      color: 'green',
      icon: 'i-heroicons-check-circle'
    });
    
    setTimeout(() => {
      navigateTo('/cliente/historico');
    }, 1500);
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Erro ao confirmar agendamento';
  } finally {
    agendando.value = false;
  }
}

onMounted(async () => {
  try {
    const data = await $fetch(`/api/enterprise/${id_empresa}`) as any;
    empresa.value = data.enterprise;
    const svcData = await $fetch('/api/service', { query: { id_empresa } }) as any;
    services.value = svcData.services || [];
  } catch {
    empresa.value = null;
  } finally {
    loadingEmpresa.value = false;
  }
});
</script>
