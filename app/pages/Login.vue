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

      <UButton type="submit" :disabled="loading">
        {{ loading ? "Entrando..." : "Entrar" }}
      </UButton>
      <UButton :disabled="loading" @click="handleCreateAccount">
        Criar conta
      </UButton>
      <a href="/api/auth/google">
        <UButton>Entrar com Google</UButton>
      </a>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "guest" }); // redireciona se já estiver logado

const form = reactive({ email: "", password: "" });
const loading = ref(false);
const error = ref("");

function handleCreateAccount() {
  navigateTo("/cadastrar");
}

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
