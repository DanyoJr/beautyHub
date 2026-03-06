<template>
  <div>
    <h1>Criar Usuário</h1>

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
        <input
          v-model="form.password"
          type="password"
          placeholder="Sua senha"
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Criando..." : "Criar Usuário" }}
      </button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  name: "",
  email: "",
  password: "",
  roles: "user",
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
    navigateTo("/login");
    success.value = "Usuário criado com sucesso!";
    form.name = "";
    form.email = "";
    form.password = "";
  } catch (err: any) {
    error.value = err.data?.message || "Erro ao criar usuário";
  } finally {
    loading.value = false;
  }
}
</script>
