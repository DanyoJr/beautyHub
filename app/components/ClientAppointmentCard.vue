<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-4 relative overflow-hidden">
    <!-- Info Principal -->
    <div class="flex gap-4 flex-1 w-full">
      <!-- Logo empresa -->
      <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6d3483]/20 to-[#dd4f6e]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img v-if="appointment.empresa?.imagem" :src="appointment.empresa.imagem" class="w-full h-full object-cover" />
        <UIcon v-else name="i-heroicons-building-storefront" class="w-7 h-7 text-[#6d3483]/50" />
      </div>
      
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <p class="font-bold text-gray-900">{{ appointment.empresa?.nome || 'Empresa' }}</p>
            <p class="text-sm text-[#6d3483] font-medium">{{ appointment.servico?.nome }}</p>
          </div>
          <span :class="statusClass(appointment.status)" class="text-xs px-2.5 py-0.5 rounded-full font-medium flex-shrink-0">
            {{ statusLabel(appointment.status) }}
          </span>
        </div>
        
        <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">
          <span><UIcon name="i-heroicons-calendar" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />{{ dataFormatada(appointment.data_hora_inicio) }}</span>
          <span><UIcon name="i-heroicons-clock" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />{{ horaFormatada(appointment.data_hora_inicio) }}</span>
          <span><UIcon name="i-heroicons-banknotes" class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />R$ {{ Number(appointment.servico?.valor || 0).toFixed(2) }} (externo)</span>
        </div>

        <!-- Funcionário -->
        <div v-if="appointment.funcionario" class="mt-3 flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-100 w-fit">
          <div class="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-white">
            <img v-if="appointment.funcionario.foto" :src="appointment.funcionario.foto" class="w-full h-full object-cover" />
            <UIcon v-else name="i-heroicons-user" class="w-4 h-4 text-gray-400 m-auto mt-1" />
          </div>
          <span class="text-xs font-semibold text-gray-600">Com {{ appointment.funcionario.nome.split(' ')[0] }}</span>
        </div>

        <!-- Ações Dinâmicas (Botões) -->
        <slot name="actions" />
      </div>
    </div>
    
    <!-- Elementos do Rodapé/Extras (ex: ProgressBar) -->
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ appointment: any }>();

function statusLabel(s: string) { 
  return { aberto: 'Confirmado', concluido: 'Concluído', cancelado: 'Cancelado' }[s] || s; 
}

function statusClass(s: string) { 
  return { 
    aberto: 'bg-blue-50 text-blue-600', 
    concluido: 'bg-green-50 text-green-600', 
    cancelado: 'bg-red-50 text-red-400' 
  }[s] || ''; 
}

function dataFormatada(d: string) { 
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }); 
}

function horaFormatada(d: string) { 
  return new Date(d).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); 
}
</script>
