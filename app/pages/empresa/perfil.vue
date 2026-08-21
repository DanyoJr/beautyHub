<template>
  <div class="min-h-screen bg-[#fafafa]">
    <header class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div class="flex items-center gap-3">
        <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[150px]" />
        <div class="hidden sm:block w-px h-6 bg-gray-200"></div>
        <span class="hidden sm:block text-sm font-medium text-gray-500">Perfil da Empresa</span>
      </div>
      <nav class="flex items-center gap-1">
        <NuxtLink to="/empresa/dashboard" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 inline mr-1" />Agenda
        </NuxtLink>
        <NuxtLink to="/empresa/catalogo" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-scissors" class="w-4 h-4 inline mr-1" />Catálogo
        </NuxtLink>
        <NuxtLink to="/empresa/agenda" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 inline mr-1" />Configurações
        </NuxtLink>
        <NuxtLink to="/empresa/perfil" class="px-3 py-2 text-sm font-medium rounded-lg bg-[#6d3483]/10 text-[#6d3483] transition-colors">
          <UIcon name="i-heroicons-building-storefront" class="w-4 h-4 inline mr-1" />Perfil
        </NuxtLink>
        <LogoutButton class="ml-2" />
      </nav>
    </header>

    <main class="max-w-2xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Perfil da Empresa</h1>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <form v-else @submit.prevent="salvar" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
        <!-- Foto / Logo -->
        <div class="flex flex-col items-center mb-4">
          <div class="relative w-32 h-32 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-gray-100 mb-3">
            <img v-if="form.imagem_empresa" :src="form.imagem_empresa" class="w-full h-full object-cover" />
            <UIcon v-else name="i-heroicons-building-storefront" class="w-12 h-12 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <label class="cursor-pointer text-sm font-semibold text-[#6d3483] hover:underline">
            Alterar Foto/Logo
            <input type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
          </label>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Nome da Empresa</label>
          <input v-model="form.nome_empresa" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
        </div>
        
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Descrição</label>
          <textarea v-model="form.descricao_empresa" rows="3" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors resize-none"></textarea>
        </div>

        <p v-if="errorMsg" class="text-sm text-red-500 text-center bg-red-50 p-3 rounded-xl">{{ errorMsg }}</p>
        <p v-if="successMsg" class="text-sm text-green-600 text-center bg-green-50 p-3 rounded-xl">{{ successMsg }}</p>

        <button type="submit" :disabled="saving" class="w-full py-3 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 mt-2" style="background: linear-gradient(135deg,#dd4f6e,#6d3483)">
          {{ saving ? 'Salvando...' : 'Salvar Alterações' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'empresa' });

const user = ref<any>(null);
const empresa = ref<any>(null);
const loading = ref(true);
const saving = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const form = reactive({
  nome_empresa: '',
  descricao_empresa: '',
  imagem_empresa: '',
});

onMounted(async () => {
  const dataAuth = await $fetch('/api/auth/me', { credentials: 'include' }) as any;
  user.value = dataAuth.user;

  if (user.value?.id_empresa) {
    try {
      const dataEmpresa = await $fetch(`/api/enterprise/${user.value.id_empresa}`) as any;
      empresa.value = dataEmpresa.enterprise;
      
      form.nome_empresa = empresa.value.nome_empresa;
      form.descricao_empresa = empresa.value.descricao_empresa;
      form.imagem_empresa = empresa.value.imagem_empresa || '';
    } catch {
      // Ignora erro
    }
  }
  loading.value = false;
});

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    form.imagem_empresa = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

async function salvar() {
  if (!user.value?.id_empresa) return;
  saving.value = true;
  errorMsg.value = '';
  try {
    await $fetch(`/api/enterprise/${user.value.id_empresa}`, {
      method: 'PUT', credentials: 'include',
      body: {
        nome_empresa: form.nome_empresa,
        descricao_empresa: form.descricao_empresa,
        imagem_empresa: form.imagem_empresa,
      },
    });
    
    // Atualizar nome do usuário associado à empresa também, para consistência
    await $fetch(`/api/user/${user.value.email}`, {
      method: 'PUT', credentials: 'include',
      body: { name: form.nome_empresa },
    });
    
    successMsg.value = 'Perfil da empresa atualizado com sucesso!';
    setTimeout(() => successMsg.value = '', 3000);
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Erro ao atualizar empresa';
  } finally {
    saving.value = false;
  }
}
</script>
