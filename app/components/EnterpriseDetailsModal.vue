<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" @click="closeModal">
        
        <div v-if="enterprise" class="flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl relative w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto" @click.stop>
          <!-- Header -->
          <div class="bg-[#522168] px-6 py-4 flex justify-between items-center text-white sticky top-0 z-10">
            <h3 class="text-xl font-bold">Detalhes da Empresa</h3>
            <button class="hover:bg-white/20 p-2 rounded-full transition-colors flex justify-center items-center" @click="closeModal">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 flex flex-col gap-6">
            
            <!-- Top Info -->
            <div class="flex justify-between items-start">
              <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-bold text-gray-900">{{ enterprise.nome_empresa }}</h2>
                <span class="bg-purple-100 text-[#522168] text-sm font-medium px-3 py-1 rounded-lg w-fit">
                  {{ enterprise.categoria_empresa }}
                </span>
              </div>
              <UBadge 
                :color="enterprise.status_empresa === 'Ativo' ? 'success' : 'error'" 
                variant="subtle" 
                class="capitalize px-4 py-1 text-sm rounded-lg"
              >
                {{ enterprise.status_empresa }}
              </UBadge>
            </div>

            <!-- Description -->
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h4 class="text-gray-900 font-bold mb-3 text-lg">Descrição</h4>
              <p class="text-gray-600 text-sm whitespace-pre-wrap">{{ enterprise.descricao_empresa || 'Sem descrição cadastrada.' }}</p>
            </div>

            <!-- Grid Infos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Contato -->
              <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col gap-3">
                <h4 class="text-gray-900 font-bold mb-2 text-lg">Informações de Contato</h4>
                
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <UIcon name="i-heroicons-hashtag" class="w-4 h-4 text-gray-400" />
                  <span>ID_EMPRESA: <strong class="text-gray-900 font-medium">{{ enterprise.id_empresa }}</strong></span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span class="w-4"></span>
                  <span>CNPJ/CPF: <strong class="text-gray-900 font-medium">{{ enterprise.cnpj_cpf_empresa || 'N/A' }}</strong></span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-gray-400" />
                  <span class="text-gray-900 font-medium truncate">{{ enterprise.email_empresa }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <UIcon name="i-heroicons-phone" class="w-4 h-4 text-gray-400" />
                  <span class="text-gray-900 font-medium">{{ enterprise.telefone_empresa }}</span>
                </div>
              </div>

              <!-- Endereço -->
              <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col gap-3">
                <h4 class="text-gray-900 font-bold mb-2 text-lg">Endereço Completo</h4>
                
                <div class="text-sm text-gray-600">
                  CEP: <strong class="text-gray-900 font-medium">{{ enterprise.local?.cep_empresa || 'N/A' }}</strong>
                </div>
                <div class="text-sm text-gray-600">
                  Logradouro: <strong class="text-gray-900 font-medium">{{ enterprise.local?.logadouro_empresa || 'N/A' }}{{ enterprise.local?.numero_empresa ? ', ' + enterprise.local?.numero_empresa : '' }}</strong>
                </div>
                <div class="text-sm text-gray-600">
                  Bairro: <strong class="text-gray-900 font-medium">{{ enterprise.local?.bairro_empresa || 'N/A' }}</strong>
                </div>
                <div class="text-sm text-gray-600">
                  Cidade: <strong class="text-gray-900 font-medium">{{ enterprise.local?.cidade_empresa || 'N/A' }}{{ enterprise.local?.uf_empresa ? '/' + enterprise.local?.uf_empresa : '' }}</strong>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { IEnterprise } from "~~/server/models/Enterprise";
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean,
  enterprise: IEnterprise | null
}>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (val) => { 
  isOpen.value = val; 
});

watch(isOpen, (val) => { 
  emit('update:modelValue', val); 
});

function closeModal() {
  isOpen.value = false;
}
</script>
