<template>
  <div class="min-h-screen bg-[#fafafa]">
    <header class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[150px]" />
      <nav class="flex items-center gap-1">
        <NuxtLink to="/cliente/busca" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">Buscar</NuxtLink>
        <NuxtLink to="/cliente/historico" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">Agendamentos</NuxtLink>
        <NuxtLink to="/cliente/perfil" class="px-3 py-2 text-sm font-medium rounded-lg bg-[#6d3483]/10 text-[#6d3483] transition-colors">Perfil</NuxtLink>
        <LogoutButton class="ml-2" />
      </nav>
    </header>

    <main class="max-w-lg mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Meu Perfil</h1>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <form v-else @submit.prevent="salvar" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
        <!-- Avatar -->
        <div class="flex flex-col items-center mb-2">
          <div class="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 mb-3">
            <img v-if="form.imagem_perfil" :src="form.imagem_perfil" class="w-full h-full object-cover" />
            <UIcon v-else name="i-heroicons-user" class="w-12 h-12 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <label class="cursor-pointer text-sm font-semibold text-[#6d3483] hover:underline">
            Alterar Foto
            <input type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
          </label>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Nome Completo</label>
          <input v-model="form.name" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase mb-1">E-mail</label>
          <input v-model="form.email" type="email" disabled class="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-400 cursor-not-allowed" />
          <p class="text-xs text-gray-400 mt-1">O e-mail não pode ser alterado</p>
        </div>

        <p v-if="errorMsg" class="text-sm text-red-500 text-center bg-red-50 p-2 rounded">{{ errorMsg }}</p>
        <p v-if="successMsg" class="text-sm text-green-600 text-center bg-green-50 p-2 rounded">{{ successMsg }}</p>

        <button type="submit" :disabled="saving" class="w-full py-3 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 mt-2" style="background: linear-gradient(135deg,#dd4f6e,#6d3483)">
          {{ saving ? 'Salvando...' : 'Salvar Alterações' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const user = ref<any>(null);
const loading = ref(true);
const saving = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const form = reactive({ name: '', email: '', imagem_perfil: '' });

onMounted(async () => {
  const data = await $fetch('/api/auth/me', { credentials: 'include' }) as any;
  user.value = data.user;
  form.name = user.value.name;
  form.email = user.value.email;
  form.imagem_perfil = user.value.imagem_perfil || '';
  loading.value = false;
});

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    form.imagem_perfil = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

async function salvar() {
  saving.value = true;
  errorMsg.value = '';
  try {
    await $fetch(`/api/user/${user.value.email}`, {
      method: 'PUT', credentials: 'include',
      body: { name: form.name, imagem_perfil: form.imagem_perfil },
    });
    successMsg.value = 'Perfil atualizado com sucesso!';
    setTimeout(() => successMsg.value = '', 3000);
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Erro ao atualizar perfil';
  } finally {
    saving.value = false;
  }
}
</script>
