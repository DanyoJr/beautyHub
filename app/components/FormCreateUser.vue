<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Nome</label>
      <input v-model="form.name" type="text" placeholder="Seu nome" />
    </div>

    <div>
      <label>Email</label>
      <input v-model="form.email" type="email" placeholder="Seu email" />
    </div>

    <div>
      <label>Senha</label>
      <input v-model="form.password" type="password" placeholder="Sua senha" />
    </div>

    <!-- Só aparece se showRoles for true -->
    <div v-if="showRoles">
      <label>Perfil</label>
      <select v-model="form.roles">
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
        <option value="enterprise-admin">Administrador da Empresa</option>
      </select>
    </div>

    <UButton type="submit" :disabled="loading">
      {{ loading ? "Criando..." : "Criar Usuário" }}
    </UButton>

    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>
  </form>
</template>

<script setup lang="ts">
const props = defineProps({
  showRoles: {
    type: Boolean,
    default: false,
  },
  redirectTo: {
    type: String,
    default: "/login",
  },
});

const form = reactive({
  name: "",
  email: "",
  password: "",
  roles: "user", // sempre começa como user
});

const loading = ref(false);
const error = ref("");
const success = ref("");

async function handleSubmit() {
  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    await $fetch("/api/user", {
      method: "POST",
      body: form,
    });
    success.value = "Usuário criado com sucesso!";
    form.name = "";
    form.email = "";
    form.password = "";
    navigateTo(props.redirectTo);
  } catch (err: any) {
    error.value = err.data?.message || "Erro ao criar usuário";
  } finally {
    loading.value = false;
  }
}
</script>
