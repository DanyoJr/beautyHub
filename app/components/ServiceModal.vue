<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" @click="close">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md" @click.stop>
          <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-lg font-bold text-gray-900">{{ isEditing ? 'Editar Serviço' : 'Novo Serviço' }}</h3>
            <button @click="close" class="p-1.5 rounded-lg hover:bg-gray-100">
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 flex flex-col gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Nome do Serviço *</label>
              <input v-model="form.nome_servico" type="text" placeholder="Ex: Design de Sobrancelhas" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Descrição</label>
              <textarea v-model="form.descricao_servico" rows="2" placeholder="Descreva o serviço brevemente..." class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors resize-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Valor (R$) *</label>
                <input v-model="form.valor_servico" type="number" min="0" step="0.01" placeholder="0,00" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Duração (min) *</label>
                <input v-model="form.duracao_minutos" type="number" min="5" step="5" placeholder="60" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
              </div>
            </div>

            <p v-if="errorMsg" class="text-sm text-red-500 bg-red-50 p-2 rounded text-center">{{ errorMsg }}</p>

            <div class="flex gap-3 pt-2">
              <button type="button" @click="close" class="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancelar</button>
              <button type="submit" :disabled="loading" class="flex-1 py-2.5 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity" style="background: linear-gradient(135deg,#dd4f6e,#6d3483)">
                {{ loading ? 'Salvando...' : 'Salvar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean; service: any | null; idEmpresa: string }>();
const emit = defineEmits(['update:modelValue', 'saved']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});
const isEditing = computed(() => !!props.service);

const loading = ref(false);
const errorMsg = ref('');

const form = reactive({ nome_servico: '', descricao_servico: '', valor_servico: 0, duracao_minutos: 60 });

watch([() => props.modelValue, () => props.service], ([isOpenVal, s]) => {
  if (isOpenVal) {
    if (s) {
      form.nome_servico = s.nome_servico;
      form.descricao_servico = s.descricao_servico || '';
      form.valor_servico = s.valor_servico;
      form.duracao_minutos = s.duracao_minutos;
    } else {
      Object.assign(form, { nome_servico: '', descricao_servico: '', valor_servico: 0, duracao_minutos: 60 });
    }
  }
}, { immediate: true });

function close() {
  isOpen.value = false;
  errorMsg.value = '';
}

async function handleSubmit() {
  loading.value = true;
  errorMsg.value = '';
  try {
    if (isEditing.value) {
      await $fetch(`/api/service/${props.service.id_servico}`, {
        method: 'PUT', credentials: 'include',
        body: form,
      });
    } else {
      await $fetch('/api/service', {
        method: 'POST', credentials: 'include',
        body: { ...form, id_empresa: props.idEmpresa },
      });
    }
    emit('saved');
    close();
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Erro ao salvar serviço';
  } finally {
    loading.value = false;
  }
}
</script>
