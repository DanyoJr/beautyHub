<template>
  <div class="min-h-screen bg-[#fafafa]">
    <header class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div class="flex items-center gap-3">
        <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[150px]" />
        <div class="hidden sm:block w-px h-6 bg-gray-200"></div>
        <span class="hidden sm:block text-sm font-medium text-gray-500">Configuração de Agenda</span>
      </div>
      <nav class="flex items-center gap-1">
        <NuxtLink to="/empresa/dashboard" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 inline mr-1" />Agenda
        </NuxtLink>
        <NuxtLink to="/empresa/catalogo" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-scissors" class="w-4 h-4 inline mr-1" />Catálogo
        </NuxtLink>
        <NuxtLink to="/empresa/agenda" class="px-3 py-2 text-sm font-medium rounded-lg bg-[#6d3483]/10 text-[#6d3483] transition-colors">
          <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 inline mr-1" />Configurações
        </NuxtLink>
        <NuxtLink to="/empresa/perfil" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-building-storefront" class="w-4 h-4 inline mr-1" />Perfil
        </NuxtLink>
        <LogoutButton class="ml-2" />
      </nav>
    </header>

    <main class="max-w-2xl mx-auto px-4 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Configuração de Agenda</h1>
        <p class="text-sm text-gray-500 mt-0.5">Defina seus dias, horários e pausas de trabalho</p>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <form v-else @submit.prevent="salvar" class="space-y-6">
        <!-- Dias da semana -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-bold text-gray-800 mb-4">Dias de Atendimento</h2>
          <div class="flex flex-wrap gap-3">
            <button v-for="dia in diasSemana" :key="dia.value" type="button"
              @click="toggleDia(dia.value)"
              :class="['px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all', form.dias_semana.includes(dia.value) ? 'border-[#6d3483] bg-[#6d3483] text-white' : 'border-gray-200 text-gray-500 hover:border-gray-300']">
              {{ dia.label }}
            </button>
          </div>
        </div>

        <!-- Horário de funcionamento -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-bold text-gray-800 mb-4">Horário de Funcionamento</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-600 uppercase mb-2">Abertura *</label>
              <input v-model="form.hora_abertura" type="time" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors text-gray-700" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-600 uppercase mb-2">Fechamento *</label>
              <input v-model="form.hora_fechamento" type="time" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors text-gray-700" />
            </div>
          </div>
        </div>

        <!-- Pausas / Intervalos -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-gray-800">Pausas / Intervalos</h2>
            <button type="button" @click="adicionarPausa" class="text-sm font-semibold text-[#6d3483] hover:text-[#522168] flex items-center gap-1">
              <UIcon name="i-heroicons-plus-circle" class="w-4 h-4" />
              Adicionar pausa
            </button>
          </div>

          <div v-if="form.pausas.length === 0" class="text-sm text-gray-400 text-center py-4">
            Nenhuma pausa configurada (ex: almoço)
          </div>

          <div v-for="(pausa, idx) in form.pausas" :key="idx" class="flex items-center gap-3 mb-3">
            <div class="flex-1 grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Início</label>
                <input v-model="pausa.inicio" type="time" class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#6d3483] text-sm" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Fim</label>
                <input v-model="pausa.fim" type="time" class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#6d3483] text-sm" />
              </div>
            </div>
            <button type="button" @click="removerPausa(idx)" class="p-2 text-red-400 hover:text-red-600 mt-4 transition-colors">
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <p v-if="errorMsg" class="text-sm text-red-500 text-center bg-red-50 p-3 rounded-xl">{{ errorMsg }}</p>
        <p v-if="successMsg" class="text-sm text-green-600 text-center bg-green-50 p-3 rounded-xl">{{ successMsg }}</p>

        <button type="submit" :disabled="saving" class="w-full py-3 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity" style="background: linear-gradient(135deg,#dd4f6e,#6d3483)">
          {{ saving ? 'Salvando...' : 'Salvar Configurações' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'empresa' });

const user = ref<any>(null);
const loading = ref(true);
const saving = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const diasSemana = [
  { label: 'Dom', value: 0 }, { label: 'Seg', value: 1 }, { label: 'Ter', value: 2 },
  { label: 'Qua', value: 3 }, { label: 'Qui', value: 4 }, { label: 'Sex', value: 5 },
  { label: 'Sáb', value: 6 },
];

const form = reactive<{
  dias_semana: number[];
  hora_abertura: string;
  hora_fechamento: string;
  pausas: { inicio: string; fim: string }[];
}>({
  dias_semana: [1, 2, 3, 4, 5],
  hora_abertura: '09:00',
  hora_fechamento: '18:00',
  pausas: [],
});

function toggleDia(v: number) {
  const idx = form.dias_semana.indexOf(v);
  if (idx >= 0) form.dias_semana.splice(idx, 1);
  else form.dias_semana.push(v);
}

function adicionarPausa() {
  form.pausas.push({ inicio: '12:00', fim: '13:00' });
}

function removerPausa(idx: number) {
  form.pausas.splice(idx, 1);
}

async function salvar() {
  errorMsg.value = '';
  successMsg.value = '';
  if (form.dias_semana.length === 0) {
    errorMsg.value = 'Selecione ao menos um dia de atendimento.';
    return;
  }
  saving.value = true;
  try {
    await $fetch(`/api/agenda/${user.value.id_empresa}`, {
      method: 'PUT', credentials: 'include',
      body: form,
    });
    successMsg.value = 'Configurações salvas com sucesso!';
    setTimeout(() => successMsg.value = '', 3000);
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Erro ao salvar configurações';
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  const data = await $fetch('/api/auth/me', { credentials: 'include' }) as any;
  user.value = data.user;

  if (user.value?.id_empresa) {
    const config = await $fetch(`/api/agenda/${user.value.id_empresa}`) as any;
    if (config.config) {
      form.dias_semana = config.config.dias_semana;
      form.hora_abertura = config.config.hora_abertura;
      form.hora_fechamento = config.config.hora_fechamento;
      form.pausas = config.config.pausas || [];
    }
  }
  loading.value = false;
});
</script>
