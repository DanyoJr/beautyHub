<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" @click="close">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm" @click.stop>
          <div class="px-6 py-5 border-b border-gray-100">
            <h3 class="text-lg font-bold text-gray-900">Avaliar Atendimento</h3>
            <p class="text-sm text-gray-500 mt-0.5">{{ agendamento?.empresa?.nome }}</p>
          </div>

          <form @submit.prevent="salvar" class="p-6 flex flex-col gap-5">
            <!-- Estrelas -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-3">Sua nota</label>
              <div class="flex gap-2 justify-center">
                <button v-for="n in 5" :key="n" type="button" @click="nota = n"
                  :class="['text-3xl transition-transform hover:scale-110', n <= nota ? 'text-amber-400' : 'text-gray-200']">
                  ★
                </button>
              </div>
            </div>

            <!-- Comentário -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2">Comentário (opcional)</label>
              <textarea v-model="comentario" rows="3" placeholder="Conte como foi sua experiência..." class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors resize-none text-sm"></textarea>
            </div>

            <p v-if="errorMsg" class="text-sm text-red-500 text-center">{{ errorMsg }}</p>

            <div class="flex gap-3">
              <button type="button" @click="close" class="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50">Cancelar</button>
              <button type="submit" :disabled="nota === 0 || loading" class="flex-1 py-2.5 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-40" style="background: linear-gradient(135deg,#dd4f6e,#6d3483)">
                {{ loading ? 'Enviando...' : 'Enviar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean; agendamento: any | null }>();
const emit = defineEmits(['update:modelValue', 'saved']);

const isOpen = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) });
const nota = ref(0);
const comentario = ref('');
const loading = ref(false);
const errorMsg = ref('');

function close() { isOpen.value = false; nota.value = 0; comentario.value = ''; errorMsg.value = ''; }

async function salvar() {
  if (!nota.value || !props.agendamento) return;
  loading.value = true;
  errorMsg.value = '';
  try {
    await $fetch('/api/rate', {
      method: 'POST', credentials: 'include',
      body: {
        id_agendamento: props.agendamento.id_agendamento,
        starsCounting: nota.value,
        comment: comentario.value,
      },
    });
    emit('saved');
    close();
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Erro ao enviar avaliação';
  } finally {
    loading.value = false;
  }
}
</script>
