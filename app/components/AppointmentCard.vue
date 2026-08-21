<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 transition-all hover:shadow-md">
    <!-- Horário -->
    <div class="flex-shrink-0 text-center bg-[#6d3483]/8 rounded-xl px-3 py-2 min-w-[64px]">
      <p class="text-lg font-bold text-[#6d3483]">{{ horaInicio }}</p>
      <p class="text-xs text-gray-400">{{ horaFim }}</p>
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <p class="font-semibold text-gray-900 truncate">{{ appointment.cliente?.nome || 'Cliente' }}</p>
        <span :class="badgeClass" class="text-xs px-2.5 py-0.5 rounded-full font-medium flex-shrink-0">
          {{ statusLabel }}
        </span>
      </div>
      <p class="text-sm text-[#6d3483] font-medium mt-0.5">{{ appointment.servico?.nome }}</p>
      <p class="text-xs text-gray-400 mt-0.5">
        <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 inline -mt-0.5" />
        {{ appointment.servico?.duracao }} min
        <span class="mx-1.5 text-gray-300">·</span>
        <UIcon name="i-heroicons-envelope" class="w-3.5 h-3.5 inline -mt-0.5" />
        {{ appointment.cliente?.email }}
      </p>
    </div>

    <!-- Ações -->
    <div v-if="appointment.status === 'aberto'" class="flex flex-col gap-2 flex-shrink-0">
      <button @click="$emit('concluir', appointment.id_agendamento)"
        class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors">
        ✓ Concluído
      </button>
      <button @click="$emit('cancelar', appointment.id_agendamento)"
        class="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium rounded-lg transition-colors">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ appointment: any }>();
defineEmits(['concluir', 'cancelar']);

const horaInicio = computed(() => {
  return new Date(props.appointment.data_hora_inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
});
const horaFim = computed(() => {
  return new Date(props.appointment.data_hora_fim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
});

const statusLabel = computed(() => ({
  aberto: 'Em aberto', concluido: 'Concluído', cancelado: 'Cancelado'
}[props.appointment.status as string] || props.appointment.status));

const badgeClass = computed(() => ({
  aberto: 'bg-amber-50 text-amber-600',
  concluido: 'bg-green-50 text-green-600',
  cancelado: 'bg-red-50 text-red-500',
}[props.appointment.status as string] || 'bg-gray-100 text-gray-600'));
</script>
