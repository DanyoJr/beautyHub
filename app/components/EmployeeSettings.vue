<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Equipe</h2>
        <p class="text-sm text-gray-500">Gerencie os funcionários e seus horários.</p>
      </div>
      <button @click="openDrawer(null)" class="bg-[#6d3483] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#5b2b6d] transition-colors flex items-center gap-2">
        <UIcon name="i-heroicons-plus" class="w-5 h-5" />
        Novo Funcionário
      </button>
    </div>

    <!-- Lista de funcionários -->
    <div v-if="loading" class="flex justify-center py-10">
      <div class="w-8 h-8 border-4 border-[#6d3483] border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="employees.length === 0" class="text-center py-10 bg-white border border-gray-100 rounded-2xl">
      <UIcon name="i-heroicons-users" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <h3 class="text-gray-900 font-bold">Nenhum funcionário cadastrado</h3>
      <p class="text-sm text-gray-500 mt-1">Adicione o primeiro membro da sua equipe.</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="emp in employees" :key="emp.id_funcionario" class="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm relative group">
        <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm flex-shrink-0">
          <img v-if="emp.foto" :src="emp.foto" class="w-full h-full object-cover" />
          <UIcon v-else name="i-heroicons-user" class="w-8 h-8 text-gray-300 m-auto mt-3" />
        </div>
        <div class="flex-1">
          <h3 class="font-bold text-gray-900">{{ emp.nome }}</h3>
          <p class="text-xs text-gray-500">{{ emp.idade }} anos • {{ formatHours(emp.hora_abertura, emp.hora_fechamento) }}</p>
        </div>
        <div class="flex gap-2">
          <button @click="openDrawer(emp)" class="p-2 text-gray-400 hover:text-[#6d3483] bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors">
            <UIcon name="i-heroicons-pencil" class="w-5 h-5" />
          </button>
          <button @click="confirmDelete(emp)" class="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
            <UIcon name="i-heroicons-trash" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Drawer de Cadastro/Edição -->
    <USlideover v-model:open="isOpen" :ui="{ width: 'w-screen max-w-md' }">
      <template #content>
        <div class="p-6 h-full flex flex-col overflow-y-auto bg-white border-l border-gray-100 shadow-xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">{{ isEditing ? 'Editar Funcionário' : 'Novo Funcionário' }}</h2>
            <button @click="isOpen = false" class="text-gray-400 hover:text-gray-600">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <form @submit.prevent="saveEmployee" class="flex flex-col gap-4 flex-1">
            <div class="flex flex-col items-center mb-2">
              <div class="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 mb-2">
                <img v-if="form.foto" :src="form.foto" class="w-full h-full object-cover" />
                <UIcon v-else name="i-heroicons-user" class="w-10 h-10 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <label class="cursor-pointer text-xs font-semibold text-[#6d3483] hover:underline">
                Alterar Foto
                <input type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
              </label>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Nome Completo</label>
              <input v-model="form.nome" type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#6d3483]" />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Idade</label>
              <input v-model="form.idade" type="number" required class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#6d3483]" />
            </div>

            <!-- Horários baseados na empresa -->
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-2">
              <h4 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-[#6d3483]" />
                Disponibilidade
              </h4>
              
              <div v-if="!agendaConfig" class="text-xs text-orange-500 mb-2">
                Configure o horário de funcionamento da empresa primeiro!
              </div>

              <div v-else>
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Dias da Semana</label>
                <div class="flex flex-wrap gap-2 mb-4">
                  <button v-for="(dia, idx) in daysLabels" :key="idx" type="button"
                          :disabled="!agendaConfig.dias_semana.includes(idx)"
                          @click="toggleDay(idx)"
                          :class="[
                            'w-8 h-8 rounded-full text-xs font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed',
                            form.dias_semana.includes(idx) ? 'bg-[#6d3483] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          ]">
                    {{ dia[0] }}
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Entrada</label>
                    <input v-model="form.hora_abertura" type="time" required
                           :min="agendaConfig.hora_abertura" :max="agendaConfig.hora_fechamento"
                           class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#6d3483] text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Saída</label>
                    <input v-model="form.hora_fechamento" type="time" required
                           :min="form.hora_abertura" :max="agendaConfig.hora_fechamento"
                           class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#6d3483] text-sm" />
                  </div>
                </div>
                <p class="text-[10px] text-gray-500 mt-2">
                  Empresa: {{ agendaConfig.hora_abertura }} as {{ agendaConfig.hora_fechamento }}
                </p>
              </div>
            </div>

            <div class="mt-auto pt-6 flex gap-3">
              <button type="button" @click="isOpen = false" class="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                Cancelar
              </button>
              <button type="submit" :disabled="saving || !agendaConfig" class="flex-1 py-3 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-colors" style="background: linear-gradient(135deg,#dd4f6e,#6d3483)">
                {{ saving ? 'Salvando...' : 'Salvar' }}
              </button>
            </div>
          </form>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ idEmpresa: string }>();

const employees = ref<any[]>([]);
const loading = ref(true);
const isOpen = ref(false);
const isEditing = ref(false);
const saving = ref(false);
const currentId = ref('');

const agendaConfig = ref<any>(null);
const daysLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const form = reactive({
  nome: '',
  idade: '',
  foto: '',
  dias_semana: [] as number[],
  hora_abertura: '',
  hora_fechamento: ''
});

onMounted(async () => {
  await fetchAgendaConfig();
  await fetchEmployees();
});

async function fetchAgendaConfig() {
  try {
    const res = await $fetch(`/api/agenda/${props.idEmpresa}`) as any;
    agendaConfig.value = res.config;
  } catch (err) {
    console.error('Erro ao buscar configuração de agenda', err);
  }
}

async function fetchEmployees() {
  loading.value = true;
  try {
    const res = await $fetch(`/api/employee?id_empresa=${props.idEmpresa}`) as any;
    employees.value = res.employees;
  } catch (err) {
    console.error('Erro ao buscar funcionários', err);
  } finally {
    loading.value = false;
  }
}

function formatHours(start: string, end: string) {
  return `${start} - ${end}`;
}

function toggleDay(dayIdx: number) {
  if (!agendaConfig.value?.dias_semana.includes(dayIdx)) return;
  const idx = form.dias_semana.indexOf(dayIdx);
  if (idx > -1) {
    form.dias_semana.splice(idx, 1);
  } else {
    form.dias_semana.push(dayIdx);
  }
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    form.foto = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

function openDrawer(emp: any | null) {
  if (emp) {
    isEditing.value = true;
    currentId.value = emp.id_funcionario;
    form.nome = emp.nome;
    form.idade = emp.idade;
    form.foto = emp.foto || '';
    form.dias_semana = [...emp.dias_semana];
    form.hora_abertura = emp.hora_abertura;
    form.hora_fechamento = emp.hora_fechamento;
  } else {
    isEditing.value = false;
    currentId.value = '';
    form.nome = '';
    form.idade = '';
    form.foto = '';
    
    // Default values from company config
    if (agendaConfig.value) {
      form.dias_semana = [...agendaConfig.value.dias_semana];
      form.hora_abertura = agendaConfig.value.hora_abertura;
      form.hora_fechamento = agendaConfig.value.hora_fechamento;
    } else {
      form.dias_semana = [];
      form.hora_abertura = '';
      form.hora_fechamento = '';
    }
  }
  isOpen.value = true;
}

async function saveEmployee() {
  // Validate time against company hours
  if (agendaConfig.value) {
    if (form.hora_abertura < agendaConfig.value.hora_abertura || form.hora_fechamento > agendaConfig.value.hora_fechamento) {
      alert(`O horário deve estar entre ${agendaConfig.value.hora_abertura} e ${agendaConfig.value.hora_fechamento}`);
      return;
    }
  }

  saving.value = true;
  const payload = {
    id_empresa: props.idEmpresa,
    nome: form.nome,
    idade: Number(form.idade),
    foto: form.foto,
    dias_semana: form.dias_semana,
    hora_abertura: form.hora_abertura,
    hora_fechamento: form.hora_fechamento,
  };

  try {
    if (isEditing.value) {
      await $fetch(`/api/employee/${currentId.value}`, {
        method: 'PUT',
        body: payload
      });
    } else {
      await $fetch(`/api/employee`, {
        method: 'POST',
        body: payload
      });
    }
    isOpen.value = false;
    await fetchEmployees();
  } catch (err: any) {
    alert(err.data?.message || 'Erro ao salvar funcionário');
  } finally {
    saving.value = false;
  }
}

async function confirmDelete(emp: any) {
  if (confirm(`Deseja realmente excluir ${emp.nome}?`)) {
    try {
      await $fetch(`/api/employee/${emp.id_funcionario}`, { method: 'DELETE' });
      await fetchEmployees();
    } catch (err: any) {
      alert(err.data?.message || 'Erro ao excluir');
    }
  }
}
</script>
