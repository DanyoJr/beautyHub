<template>
  <div class="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden p-8 pt-12">
      <!-- Gradient Top Border -->
      <div class="absolute top-0 left-0 w-full h-2" style="background: linear-gradient(90deg, #dd4f6e 0%, #6d3483 100%);"></div>

      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="~/assets/Logo.png" alt="BeautyHub" class="h-16" />
      </div>

      <!-- Heading -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Acesse sua conta</h2>

      <form @submit.prevent="handleLogin">
        <!-- Error Message -->
        <p v-if="error" class="text-sm text-red-500 text-center mb-4 bg-red-50 p-2 rounded">{{ error }}</p>

        <!-- Email Field -->
        <div class="mb-5">
          <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <div class="border-b border-gray-300 pb-2 flex items-center transition-colors focus-within:border-[#6d3483]">
            <UIcon name="i-heroicons-envelope" class="text-gray-400 mr-2 w-5 h-5" />
            <input v-model="form.email" type="email" placeholder="Email" class="w-full outline-none text-gray-700 bg-transparent" required />
          </div>
        </div>

        <!-- Password Field -->
        <div class="mb-8">
          <label class="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
          <div class="border-b border-gray-300 pb-2 flex items-center transition-colors focus-within:border-[#6d3483]">
            <UIcon name="i-heroicons-lock-closed" class="text-gray-400 mr-2 w-5 h-5" />
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Senha" class="w-full outline-none text-gray-700 bg-transparent" required />
            <button type="button" @click="showPassword = !showPassword" class="focus:outline-none flex items-center ml-2">
              <UIcon :name="showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" class="text-gray-400 hover:text-gray-600 transition-colors w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="loading" class="w-full text-white font-medium py-3 rounded-full flex justify-center items-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50" style="background: linear-gradient(90deg, #dd4f6e 0%, #6d3483 100%);">
          {{ loading ? "Entrando..." : "Entrar" }}
          <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" v-if="!loading" />
        </button>

        <!-- Forgot Password -->
        <div class="text-center mt-4">
          <a href="#" class="text-sm text-gray-600 hover:text-gray-800 transition-colors">Esqueceu a senha? <span class="font-medium text-gray-800">Clique aqui</span></a>
        </div>

        <!-- Divider -->
        <div class="flex items-center my-6">
          <div class="flex-grow border-t border-gray-200"></div>
          <span class="flex-shrink-0 mx-4 text-gray-400 text-sm">Ou entre com</span>
          <div class="flex-grow border-t border-gray-200"></div>
        </div>

        <!-- Social Logins -->
        <div class="flex justify-center mb-8">
          <a href="/api/auth/google" class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <svg width="24" height="24" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </a>
        </div>

        <!-- Register -->
        <div class="text-center">
          <p class="text-sm text-gray-600">Não tem uma conta? <button type="button" @click="handleCreateAccount" class="text-gray-800 font-semibold hover:underline">Cadastre-se grátis</button></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

definePageMeta({ middleware: "guest" });

const form = reactive({ email: "", password: "" });
const loading = ref(false);
const error = ref("");
const showPassword = ref(false);

function handleCreateAccount() {
  navigateTo("/cadastrar");
}

async function handleLogin() {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: form,
    });
    if (response.user.roles === "admin") {
      navigateTo("/admin");
      return;
    }
    if (response.user.roles === "user") {
      navigateTo("/Home");
      return;
    }
  } catch (err: any) {
    error.value = err.data?.message || "Erro ao fazer login";
  } finally {
    loading.value = false;
  }
}
</script>
