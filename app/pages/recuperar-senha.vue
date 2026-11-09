<template>
  <div class="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden p-8 pt-12">
      <!-- Gradient Top Border -->
      <div class="absolute top-0 left-0 w-full h-2" style="background: linear-gradient(90deg, #dd4f6e 0%, #6d3483 100%);"></div>

      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="~/assets/Logo.png" alt="BeautyHub" class="w-[150px]" />
      </div>

      <!-- Heading -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">
        {{ step === 1 ? "Recuperar senha" : "Confirme o código" }}
      </h2>
      <p class="text-sm text-center text-gray-500 mb-8">
        {{
          step === 1
            ? "Digite seu e-mail e a nova senha desejada para receber o código de confirmação."
            : `Enviamos 4 números para ${form.email}. Digite-os abaixo para confirmar a troca da senha.`
        }}
      </p>

      <!-- Mensagens de erro e sucesso -->
      <p v-if="error" class="text-sm text-red-500 text-center mb-4 bg-red-50 p-2 rounded">
        {{ error }}
      </p>
      <p v-if="success" class="text-sm text-green-600 text-center mb-4 bg-green-50 p-2 rounded">
        {{ success }}
      </p>

      <!-- Etapa 1: E-mail e Nova Senha -->
      <form v-if="step === 1" @submit.prevent="handleRequestCode">
        <!-- Email Field -->
        <div class="mb-5">
          <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <div class="border-b border-gray-300 pb-2 flex items-center transition-colors focus-within:border-[#6d3483]">
            <UIcon name="i-heroicons-envelope" class="text-gray-400 mr-2 w-5 h-5" />
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              class="w-full outline-none text-gray-700 bg-transparent"
              required
            />
          </div>
        </div>

        <!-- New Password Field -->
        <div class="mb-8">
          <label class="block text-sm font-semibold text-gray-700 mb-1">Nova Senha</label>
          <div class="border-b border-gray-300 pb-2 flex items-center transition-colors focus-within:border-[#6d3483]">
            <UIcon name="i-heroicons-lock-closed" class="text-gray-400 mr-2 w-5 h-5" />
            <input
              v-model="form.newPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Nova senha (mín. 6 caracteres)"
              minlength="6"
              class="w-full outline-none text-gray-700 bg-transparent"
              required
            />
            <button type="button" @click="showPassword = !showPassword" class="focus:outline-none flex items-center ml-2">
              <UIcon :name="showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" class="text-gray-400 hover:text-gray-600 transition-colors w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full text-white font-medium py-3 rounded-full flex justify-center items-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
          style="background: linear-gradient(90deg, #dd4f6e 0%, #6d3483 100%);"
        >
          {{ loading ? "Enviando código..." : "Enviar código" }}
          <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5" v-if="!loading" />
        </button>
      </form>

      <!-- Etapa 2: Código de 4 dígitos -->
      <form v-else @submit.prevent="handleConfirmCode">
        <div class="mb-8">
          <label class="block text-sm font-semibold text-gray-700 text-center mb-4">
            Código de 4 dígitos
          </label>
          <div class="flex justify-center gap-3">
            <input
              v-for="(_, index) in 4"
              :key="index"
              :ref="(el) => setDigitRef(el, index)"
              v-model="digits[index]"
              type="text"
              inputmode="numeric"
              maxlength="1"
              @input="handleDigitInput(index, $event)"
              @keydown="handleKeydown(index, $event)"
              @paste="handlePaste"
              class="w-14 h-14 text-center text-2xl font-bold text-gray-800 border-2 border-gray-300 rounded-xl outline-none focus:border-[#6d3483] transition-colors"
              required
            />
          </div>
        </div>

        <!-- Confirm Button -->
        <button
          type="submit"
          :disabled="loading || codeValue.length < 4"
          class="w-full text-white font-medium py-3 rounded-full flex justify-center items-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
          style="background: linear-gradient(90deg, #dd4f6e 0%, #6d3483 100%);"
        >
          {{ loading ? "Confirmando..." : "Confirmar e trocar senha" }}
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5" v-if="!loading" />
        </button>

        <!-- Resend / Back to step 1 -->
        <div class="text-center mt-4 flex flex-col gap-2">
          <button
            type="button"
            :disabled="loading"
            @click="handleRequestCode"
            class="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Não recebeu o e-mail? <span class="font-medium text-gray-800">Reenviar código</span>
          </button>
          <button
            type="button"
            @click="step = 1; error = ''; success = ''"
            class="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Alterar e-mail ou senha
          </button>
        </div>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-grow border-t border-gray-200"></div>
      </div>

      <!-- Back to Login -->
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Lembrou sua senha?
          <NuxtLink to="/" class="text-gray-800 font-semibold hover:underline">
            Voltar para o login
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

definePageMeta({ middleware: "guest" });

const step = ref<1 | 2>(1);
const form = reactive({
  email: "",
  newPassword: "",
});
const digits = reactive<string[]>(["", "", "", ""]);
const digitRefs = ref<(HTMLInputElement | null)[]>([]);

const loading = ref(false);
const error = ref("");
const success = ref("");
const showPassword = ref(false);

const codeValue = computed(() => digits.join(""));

function setDigitRef(el: any, index: number) {
  if (el) {
    digitRefs.value[index] = el as HTMLInputElement;
  }
}

function handleDigitInput(index: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const val = input.value.replace(/\D/g, "");
  digits[index] = val.slice(-1);

  if (digits[index] && index < 3) {
    digitRefs.value[index + 1]?.focus();
  }
}

function handleKeydown(index: number, event: KeyboardEvent) {
  if (event.key === "Backspace" && !digits[index] && index > 0) {
    digitRefs.value[index - 1]?.focus();
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();
  const pasted = event.clipboardData?.getData("text")?.replace(/\D/g, "").slice(0, 4) || "";
  for (let i = 0; i < 4; i++) {
    digits[i] = pasted[i] || "";
  }
  const nextIndex = Math.min(pasted.length, 3);
  digitRefs.value[nextIndex]?.focus();
}

async function handleRequestCode() {
  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const response = await $fetch<{ message: string }>("/api/auth/forgot-password", {
      method: "POST",
      body: {
        email: form.email,
        newPassword: form.newPassword,
      },
    });
    digits[0] = "";
    digits[1] = "";
    digits[2] = "";
    digits[3] = "";
    step.value = 2;
    success.value = response.message || "Código enviado para o seu e-mail!";
  } catch (err: any) {
    error.value = err.data?.message || "Erro ao enviar código de recuperação";
  } finally {
    loading.value = false;
  }
}

async function handleConfirmCode() {
  if (codeValue.value.length < 4) {
    error.value = "Digite os 4 números do código";
    return;
  }

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const response = await $fetch<{ message: string }>("/api/auth/reset-password", {
      method: "POST",
      body: {
        email: form.email,
        code: codeValue.value,
      },
    });
    success.value = response.message || "Senha alterada com sucesso! Redirecionando...";
    setTimeout(() => {
      navigateTo("/");
    }, 1500);
  } catch (err: any) {
    error.value = err.data?.message || "Código inválido ou expirado";
  } finally {
    loading.value = false;
  }
}
</script>

