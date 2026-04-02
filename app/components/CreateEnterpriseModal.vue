<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto" @click="closeModal">
        
        <div class="flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl relative w-full sm:max-w-4xl max-h-[90vh] mx-auto my-auto" @click.stop>
          
          <!-- Header -->
          <div class="bg-[#522168] px-6 py-5 flex items-center gap-4 text-white sticky top-0 z-10 shrink-0">
            <div class="bg-white/20 p-3 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-building-office-2" class="w-8 h-8 text-white" />
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold">Nova Empresa</h3>
              <p class="text-white/80 text-sm">Cadastre uma nova empresa parceira</p>
            </div>
          </div>

          <!-- Body (Scrollable form) -->
          <div class="p-8 overflow-y-auto w-full">
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-8 w-full">
              
              <!-- Informações Básicas -->
              <section>
                <h4 class="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Informações Básicas</h4>
                <div class="grid grid-cols-1 gap-5">
                  <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                      <UIcon name="i-heroicons-document-text" class="text-purple-700 w-4 h-4" /> NOME_EMPRESA *
                    </label>
                    <input v-model="form.nome_empresa" type="text" placeholder="Ex: Salão de Beleza Glamour" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                      <UIcon name="i-heroicons-tag" class="text-purple-700 w-4 h-4" /> CATEGORIA_EMPRESA *
                    </label>
                    <div class="flex flex-wrap gap-2">
                      <button 
                        v-for="cat in categorias" :key="cat"
                        type="button"
                        @click="form.categoria_empresa = cat"
                        :class="[
                          'px-4 py-1.5 rounded-full text-sm font-medium transition-colors border',
                          form.categoria_empresa === cat ? 'bg-[#522168] text-white border-[#522168]' : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
                        ]"
                      >
                        {{ cat }}
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                      <UIcon name="i-heroicons-bars-3-bottom-left" class="text-purple-700 w-4 h-4" /> DESCRICAO_EMPRESA *
                    </label>
                    <textarea v-model="form.descricao_empresa" rows="3" placeholder="Descreva sua empresa, serviços oferecidos e diferenciais..." class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors resize-none" required></textarea>
                  </div>

                  <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                      <UIcon name="i-heroicons-photo" class="text-purple-700 w-4 h-4" /> LOGO_EMPRESA
                    </label>
                    <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors" @click="handleUploadMock">
                      <span class="text-gray-600 font-medium text-sm flex items-center gap-2">
                        <UIcon name="i-heroicons-arrow-up-tray" class="w-5 h-5" /> Clique para fazer upload
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Contato -->
              <section>
                <h4 class="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Contato</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                      <UIcon name="i-heroicons-hashtag" class="text-purple-700 w-4 h-4" /> CNPJ/CPF_EMPRESA *
                    </label>
                    <input v-model="form.cnpj_cpf_empresa" type="text" placeholder="00.000.000/0000-00 ou 000.000.000-00" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                  <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                      <UIcon name="i-heroicons-phone" class="text-purple-700 w-4 h-4" /> TELEFONE_EMPRESA *
                    </label>
                    <input v-model="form.telefone_empresa" type="text" placeholder="(00) 00000-0000" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                  <div class="flex flex-col gap-1 sm:col-span-2">
                    <label class="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                      <UIcon name="i-heroicons-envelope" class="text-purple-700 w-4 h-4" /> E-MAIL_EMPRESA *
                    </label>
                    <input v-model="form.email_empresa" type="email" placeholder="contato@empresa.com" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>
                </div>
              </section>

              <!-- Endereço -->
              <section>
                <h4 class="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Endereço</h4>
                <div class="grid grid-cols-1 sm:grid-cols-12 gap-5">
                  
                  <div class="flex flex-col gap-1 sm:col-span-12">
                    <label class="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                      <UIcon name="i-heroicons-map-pin" class="text-purple-700 w-4 h-4" /> CEP_EMPRESA *
                    </label>
                    <input v-model="form.local.cep_empresa" @blur="fetchAddress" type="text" placeholder="00000-000" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                  <div class="flex flex-col gap-1 sm:col-span-8">
                    <label class="text-xs font-bold text-gray-700 uppercase">LOGRADOURO_EMPRESA * (Automático via CEP)</label>
                    <input v-model="form.local.logadouro_empresa" type="text" placeholder="Rua, Avenida..." class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                  <div class="flex flex-col gap-1 sm:col-span-4">
                    <label class="text-xs font-bold text-gray-700 uppercase">NUMERO_EMPRESA *</label>
                    <input v-model="form.local.numero_empresa" type="number" placeholder="123" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                  <div class="flex flex-col gap-1 sm:col-span-12">
                    <label class="text-xs font-bold text-gray-700 uppercase">COMPLEMENTO_EMPRESA</label>
                    <input v-model="form.local.complemento_empresa" type="text" placeholder="Apto, Sala, Bloco..." class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" />
                  </div>

                  <div class="flex flex-col gap-1 sm:col-span-4">
                    <label class="text-xs font-bold text-gray-700 uppercase">BAIRRO_EMPRESA *</label>
                    <input v-model="form.local.bairro_empresa" type="text" placeholder="Bairro" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                  <div class="flex flex-col gap-1 sm:col-span-5">
                    <label class="text-xs font-bold text-gray-700 uppercase">CIDADE_EMPRESA *</label>
                    <input v-model="form.local.cidade_empresa" type="text" placeholder="Cidade" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                  <div class="flex flex-col gap-1 sm:col-span-3">
                    <label class="text-xs font-bold text-gray-700 uppercase">ESTADO_EMPRESA *</label>
                    <input v-model="form.local.uf_empresa" type="text" placeholder="UF" maxlength="2" class="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-purple-600 transition-colors" required />
                  </div>

                </div>
              </section>

              <!-- Error Box -->
              <div v-if="errorMsg" class="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm font-medium text-center">
                {{ errorMsg }}
              </div>

              <!-- Footer Buttons -->
              <div class="flex justify-between items-center pt-4 border-t border-gray-200 gap-4 mt-2">
                <button type="button" @click="closeModal" class="flex-1 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" :disabled="loading" class="flex-1 py-3 bg-[#522168] hover:bg-[#3f1951] text-white rounded-xl font-bold transition-colors disabled:opacity-50">
                  {{ loading ? "Cadastrando..." : "Cadastrar Empresa" }}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean
}>();

const emit = defineEmits(['update:modelValue', 'enterprise-created']);

const isOpen = ref(props.modelValue);
watch(() => props.modelValue, (val) => { isOpen.value = val; });
watch(isOpen, (val) => { emit('update:modelValue', val); });

const loading = ref(false);
const errorMsg = ref("");

const categorias = [
  "Estética", "Manicure", "Cabeleireiro", "Barbearia", 
  "Spa", "Maquiagem", "Depilação", "Massagem"
];

// Initial form state mapping exactly to Enterprise.ts
const INITIAL_FORM = {
  nome_empresa: "",
  categoria_empresa: "Estética",
  descricao_empresa: "",
  imagem_empresa: "https://via.placeholder.com/150", // Mocado
  cnpj_cpf_empresa: "",
  telefone_empresa: "",
  email_empresa: "",
  status_empresa: "Ativo",
  id_empresa: "", // Será gerado se necessário, ou mockado para a API
  local: {
    cep_empresa: "", // String temporarily for mask, but API might want number.
    logadouro_empresa: "",
    numero_empresa: null as number | null,
    complemento_empresa: "",
    bairro_empresa: "",
    cidade_empresa: "",
    uf_empresa: ""
  }
};

const form = reactive(JSON.parse(JSON.stringify(INITIAL_FORM)));

function closeModal() {
  isOpen.value = false;
  resetForm();
}

function resetForm() {
  Object.assign(form, JSON.parse(JSON.stringify(INITIAL_FORM)));
  errorMsg.value = "";
}

function handleUploadMock() {
  alert("O upload de imagem faria o envio real aqui. Por agora utilizamos uma imagem fake via_placeholder.");
}

// ViaCEP auto-fill
async function fetchAddress() {
  const cep = typeof form.local.cep_empresa === 'string' ? form.local.cep_empresa.replace(/\D/g, '') : String(form.local.cep_empresa);
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        form.local.logadouro_empresa = data.logradouro;
        form.local.bairro_empresa = data.bairro;
        form.local.cidade_empresa = data.localidade;
        form.local.uf_empresa = data.uf;
      }
    } catch(e) {
      console.error("Falha ao buscar CEP");
    }
  }
}

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

async function handleSubmit() {
  loading.value = true;
  errorMsg.value = "";

  try {
    // 1. Tentar criar o usuário primeiro (mesmo email)
    let userCreated = false;
    try {
      await $fetch('/api/user', {
        method: 'POST',
        body: {
          name: form.nome_empresa, // Usando o nome da empresa como nome do usuário
          email: form.email_empresa,
          password: 'Mudar@123', // Senha segura mocado via decisão de projeto
          roles: 'user', 
          permissions: []
        }
      });
      userCreated = true;
    } catch (userErr: any) {
      if (userErr.statusCode === 409) {
        console.log("Email já cadastrado como usuário, procedendo com a criação de empresa conectada.");
      } else {
        throw new Error("Falha na criação da conta de usuário vinculada: " + (userErr.data?.message || userErr.message));
      }
    }

    // Prepare numbers for database (telefone, cep)
    const payload = JSON.parse(JSON.stringify(form));
    payload.telefone_empresa = Number(String(payload.telefone_empresa).replace(/\D/g, ''));
    if(!payload.telefone_empresa) throw new Error("Telefone inválido.");
    payload.local.cep_empresa = Number(String(payload.local.cep_empresa).replace(/\D/g, ''));
    payload.id_empresa = generateRandomId();
    payload.status_empresa = 'Ativo';

    // 2. Tentar criar a Empresa
    await $fetch('/api/enterprise', {
      method: 'POST',
      body: payload
    });

    emit('enterprise-created');
    closeModal();
  } catch (error: any) {
    errorMsg.value = error.data?.message || error.message || "Ocorreu um erro ao cadastrar a empresa.";
  } finally {
    loading.value = false;
  }
}
</script>
