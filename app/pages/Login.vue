<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
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
        {{ loading ? "Entrando..." : "Entrar" }}
      </button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "guest" }); // redireciona se já estiver logado

const form = reactive({ email: "", password: "" });
const loading = ref(false);
const error = ref("");

async function handleLogin() {
  loading.value = true;
  error.value = "";

  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: form,
    });

    navigateTo("/Home"); // redireciona após login
  } catch (err: any) {
    error.value = err.data?.message || "Erro ao fazer login";
  } finally {
    loading.value = false;
  }
}
</script>
