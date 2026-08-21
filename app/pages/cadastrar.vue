<template>
  <div class="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg relative overflow-hidden">
      <!-- Gradient Top Border -->
      <div class="absolute top-0 left-0 w-full h-2" style="background: linear-gradient(90deg, #dd4f6e 0%, #6d3483 100%);"></div>

      <!-- Logo -->
      <div class="flex justify-center pt-10 mb-4">
        <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[150px]" />
      </div>

      <!-- Tipo de cadastro (tabs) -->
      <div class="px-8 mb-6">
        <div class="flex rounded-xl bg-gray-100 p-1">
          <button
            v-for="tipo in tipos"
            :key="tipo.value"
            @click="tipoAtivo = tipo.value"
            :class="[
              'flex-1 py-2 text-sm font-semibold rounded-lg transition-all',
              tipoAtivo === tipo.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            {{ tipo.label }}
          </button>
        </div>
      </div>

      <div class="px-8 pb-8">
        <p v-if="errorMsg" class="text-sm text-red-500 text-center mb-4 bg-red-50 p-2 rounded">
          {{ errorMsg }}
        </p>
        <p v-if="successMsg" class="text-sm text-green-600 text-center mb-4 bg-green-50 p-2 rounded">
          {{ successMsg }}
        </p>

        <!-- Formulário Cliente -->
        <form v-if="tipoAtivo === 'cliente'" @submit.prevent="handleCadastroCliente" class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Nome Completo *</label>
            <input v-model="formCliente.name" type="text" placeholder="Seu nome" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">E-mail *</label>
            <input v-model="formCliente.email" type="email" placeholder="seu@email.com" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Senha *</label>
            <input v-model="formCliente.password" type="password" placeholder="Mínimo 6 caracteres" required minlength="6" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Confirmar Senha *</label>
            <input v-model="formCliente.confirmPassword" type="password" placeholder="Repita a senha" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
          </div>
          <button type="submit" :disabled="loading" class="w-full text-white font-semibold py-3 rounded-full mt-2 transition-opacity hover:opacity-90 disabled:opacity-50" style="background: linear-gradient(90deg, #dd4f6e 0%, #6d3483 100%);">
            {{ loading ? 'Cadastrando...' : 'Criar Conta de Cliente' }}
          </button>
        </form>

        <!-- Formulário Empresa -->
        <form v-else @submit.prevent="handleCadastroEmpresa" class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Nome da Empresa *</label>
            <input v-model="formEmpresa.nome_empresa" type="text" placeholder="Ex: Salão Glamour" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">E-mail *</label>
            <input v-model="formEmpresa.email" type="email" placeholder="contato@empresa.com" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
          </div>
          <!-- Contato e Endereço -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Telefone *</label>
              <input v-model="formEmpresa.telefone" type="tel" placeholder="(11) 99999-9999" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">CEP *</label>
              <input v-model="formEmpresa.cep" @blur="fetchCep" type="text" placeholder="00000-000" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
            </div>
            <div class="col-span-2 flex gap-3">
              <div class="flex-1">
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Rua / Logradouro *</label>
                <input v-model="formEmpresa.logradouro" type="text" placeholder="Logradouro" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors bg-gray-50" />
              </div>
              <div class="w-24">
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Nº *</label>
                <input v-model="formEmpresa.numero" type="number" placeholder="123" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Bairro *</label>
              <input v-model="formEmpresa.bairro" type="text" placeholder="Bairro" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors bg-gray-50" />
            </div>
            <div class="flex gap-3">
              <div class="flex-1">
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Cidade *</label>
                <input v-model="formEmpresa.cidade" type="text" placeholder="Cidade" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors bg-gray-50" />
              </div>
              <div class="w-16">
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">UF *</label>
                <input v-model="formEmpresa.uf" type="text" placeholder="UF" maxlength="2" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors bg-gray-50 uppercase" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Categoria *</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="cat in categorias" :key="cat" type="button" @click="formEmpresa.categoria = cat"
                :class="['px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors', formEmpresa.categoria === cat ? 'bg-[#6d3483] text-white border-[#6d3483]' : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200']">
                {{ cat }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Descrição *</label>
            <textarea v-model="formEmpresa.descricao" rows="2" placeholder="Descreva seus serviços..." required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors resize-none"></textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Senha *</label>
            <input v-model="formEmpresa.password" type="password" placeholder="Mínimo 6 caracteres" required minlength="6" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Confirmar Senha *</label>
            <input v-model="formEmpresa.confirmPassword" type="password" placeholder="Repita a senha" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#6d3483] transition-colors" />
          </div>
          <button type="submit" :disabled="loading" class="w-full text-white font-semibold py-3 rounded-full mt-2 transition-opacity hover:opacity-90 disabled:opacity-50" style="background: linear-gradient(90deg, #dd4f6e 0%, #6d3483 100%);">
            {{ loading ? 'Cadastrando...' : 'Criar Conta de Empresa' }}
          </button>
        </form>

        <div class="text-center mt-6">
          <p class="text-sm text-gray-600">Já tem uma conta?
            <NuxtLink to="/" class="font-semibold text-[#6d3483] hover:underline">Fazer login</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'guest' });

const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');
const tipoAtivo = ref<'cliente' | 'empresa'>('cliente');

const tipos = [
  { label: 'Sou Cliente', value: 'cliente' },
  { label: 'Sou Empresa', value: 'empresa' },
];

const categorias = ['Estética', 'Manicure', 'Cabeleireiro', 'Barbearia', 'Spa', 'Maquiagem', 'Depilação', 'Massagem'];

const formCliente = reactive({ name: '', email: '', password: '', confirmPassword: '' });
const formEmpresa = reactive({
  nome_empresa: '', email: '', telefone: '', cep: '',
  categoria: 'Estética', descricao: '', password: '', confirmPassword: '',
  logradouro: '', numero: '', bairro: '', cidade: '', uf: '',
});

async function fetchCep() {
  const cep = formEmpresa.cep.replace(/\D/g, '');
  if (cep.length === 8) {
    const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(r => r.json());
    if (!data.erro) {
      formEmpresa.logradouro = data.logradouro;
      formEmpresa.bairro = data.bairro;
      formEmpresa.cidade = data.localidade;
      formEmpresa.uf = data.uf;
    }
  }
}

async function handleCadastroCliente() {
  errorMsg.value = '';
  if (formCliente.password !== formCliente.confirmPassword) {
    errorMsg.value = 'As senhas não conferem.';
    return;
  }
  loading.value = true;
  try {
    await $fetch('/api/user', {
      method: 'POST',
      body: {
        name: formCliente.name,
        email: formCliente.email,
        password: formCliente.password,
        roles: 'user',
        permissions: [],
      },
    });
    successMsg.value = 'Conta criada com sucesso! Redirecionando...';
    setTimeout(() => navigateTo('/'), 1500);
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Erro ao cadastrar. Tente novamente.';
  } finally {
    loading.value = false;
  }
}

async function handleCadastroEmpresa() {
  errorMsg.value = '';
  if (formEmpresa.password !== formEmpresa.confirmPassword) {
    errorMsg.value = 'As senhas não conferem.';
    return;
  }
  loading.value = true;
  try {
    const id_empresa = Math.random().toString(36).substring(2, 10).toUpperCase();
    const telefoneNum = Number(formEmpresa.telefone.replace(/\D/g, ''));
    const cepNum = Number(formEmpresa.cep.replace(/\D/g, ''));
    const numEnd = Number(formEmpresa.numero) || 0;

    // 1. Cria usuário com role 'empresa', carregando o id_empresa no JWT depois do login
    await $fetch('/api/user', {
      method: 'POST',
      body: {
        name: formEmpresa.nome_empresa,
        email: formEmpresa.email,
        password: formEmpresa.password,
        roles: 'empresa',
        permissions: [],
        id_empresa,
      },
    });

    // 2. Cria o registro da empresa
    await $fetch('/api/enterprise', {
      method: 'POST',
      body: {
        id_empresa,
        email_empresa: formEmpresa.email,
        telefone_empresa: telefoneNum,
        nome_empresa: formEmpresa.nome_empresa,
        categoria_empresa: formEmpresa.categoria,
        status_empresa: 'ativo',
        descricao_empresa: formEmpresa.descricao,
        imagem_empresa: '',
        local: {
          cep_empresa: cepNum,
          logadouro_empresa: formEmpresa.logradouro,
          numero_empresa: numEnd,
          bairro_empresa: formEmpresa.bairro,
          cidade_empresa: formEmpresa.cidade,
          uf_empresa: formEmpresa.uf,
        },
      },
    });

    successMsg.value = 'Empresa cadastrada com sucesso! Faça login para continuar.';
    setTimeout(() => navigateTo('/'), 2000);
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Erro ao cadastrar empresa. Tente novamente.';
  } finally {
    loading.value = false;
  }
}
</script>
