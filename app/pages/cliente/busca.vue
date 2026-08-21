<template>
  <div class="min-h-screen bg-[#fafafa]">
    <!-- Header -->
    <header class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[150px]" />
      <nav class="flex items-center gap-1">
        <NuxtLink to="/cliente/busca" class="px-3 py-2 text-sm font-medium rounded-lg bg-[#6d3483]/10 text-[#6d3483] transition-colors">
          <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 inline mr-1" />Buscar
        </NuxtLink>
        <NuxtLink to="/cliente/historico" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 inline mr-1" />Meus Agendamentos
        </NuxtLink>
        <NuxtLink to="/cliente/perfil" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <UIcon name="i-heroicons-user-circle" class="w-4 h-4 inline mr-1" />Perfil
        </NuxtLink>
        <LogoutButton class="ml-2" />
      </nav>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-12">
      <!-- Hero de busca -->
      <div class="text-center mb-12">
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
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const busca = ref('');
const categoriaFiltro = ref('');
const loading = ref(true);
const empresas = ref<any[]>([]);

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

onMounted(async () => {
  try {
    const data = await $fetch('/api/enterprise') as any;
    // Filtra utilizando o status em minúsculo conforme alterado no modelo
    empresas.value = (data.enterprises || []).filter((e: any) => e.status_empresa === 'ativo');
  } catch {
    empresas.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
