<template>
  <div class="min-h-screen bg-[#fafafa]">
    <EmpresaHeader />

    <main class="max-w-4xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Catálogo de Serviços</h1>
          <p class="text-sm text-gray-500 mt-0.5">Gerencie os procedimentos que você oferece</p>
        </div>
        <button @click="abrirModal(null)" class="flex items-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity" style="background: linear-gradient(135deg, #dd4f6e, #6d3483);">
          <UIcon name="i-heroicons-plus" class="w-4 h-4" />
          Novo Serviço
        </button>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-else-if="services.length === 0" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <UIcon name="i-heroicons-scissors" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p class="text-gray-500 font-medium">Nenhum serviço cadastrado</p>
        <p class="text-gray-400 text-sm mt-1">Adicione seus serviços para que clientes possam agendar</p>
        <button @click="abrirModal(null)" class="mt-4 px-4 py-2 text-sm font-semibold text-white rounded-lg" style="background:#6d3483">+ Adicionar primeiro serviço</button>
      </div>

      <div v-else class="grid gap-3">
        <div v-for="s in services" :key="s.id_servico" class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden" style="background:#6d3483/10">
            <img v-if="s.imagem_servico" :src="s.imagem_servico" class="w-full h-full object-cover" />
            <UIcon v-else name="i-heroicons-sparkles" class="w-5 h-5 text-[#6d3483]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="font-semibold text-gray-900">{{ s.nome_servico }}</p>
              <span v-if="!s.ativo" class="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">Inativo</span>
            </div>
            <p class="text-xs text-gray-400 mt-0.5 truncate">{{ s.descricao_servico || 'Sem descrição' }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="font-bold text-gray-900">R$ {{ Number(s.valor_servico).toFixed(2) }}</p>
            <p class="text-xs text-gray-400">{{ s.duracao_minutos }} min</p>
          </div>
          <div class="flex gap-2 flex-shrink-0">
            <button @click="abrirModal(s)" class="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
            </button>
            <button @click="toggleAtivo(s)" class="p-2 rounded-lg hover:bg-gray-100 transition-colors" :class="s.ativo ? 'text-red-400' : 'text-green-500'">
              <UIcon :name="s.ativo ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de criação/edição -->
    <ServiceModal v-model="modalAberto" :service="serviceEditando" :id-empresa="idEmpresa" @saved="loadServices" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'empresa' });

const user = ref<any>(null);
const services = ref<any[]>([]);
const loading = ref(true);
const modalAberto = ref(false);
const serviceEditando = ref<any>(null);

const idEmpresa = computed(() => user.value?.id_empresa || '');

async function loadUser() {
  const data = await $fetch('/api/auth/me', { credentials: 'include' }) as any;
  user.value = data.user;
}

async function loadServices() {
  if (!idEmpresa.value) return;
  loading.value = true;
  try {
    const data = await $fetch('/api/service', {
      credentials: 'include',
      query: { id_empresa: idEmpresa.value },
    }) as any;
    // Busca todos incluindo inativos
    const dataAll = await $fetch('/api/service/all', {
      credentials: 'include',
      query: { id_empresa: idEmpresa.value },
    }).catch(() => ({ services: data.services })) as any;
    services.value = dataAll.services || data.services || [];
  } catch {
    services.value = [];
  } finally {
    loading.value = false;
  }
}

function abrirModal(service: any) {
  serviceEditando.value = service;
  modalAberto.value = true;
}

async function toggleAtivo(service: any) {
  await $fetch(`/api/service/${service.id_servico}`, {
    method: 'PUT', credentials: 'include',
    body: { ativo: !service.ativo },
  });
  await loadServices();
}

onMounted(async () => {
  await loadUser();
  await loadServices();
});
</script>
