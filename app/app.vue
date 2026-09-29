<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UToaster />
  </div>
</template>

<script setup>
const colorMode = useColorMode();
colorMode.preference = 'light';

const toast = useToast();

onMounted(() => {
  // Inicializa o recebimento de notificações em tempo real (SSE)
  // O navegador enviará os cookies de autenticação (token) automaticamente
  const eventSource = new EventSource('/api/notifications/stream');

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'LEMBRETE_AGENDAMENTO') {
        toast.add({
          title: 'Lembrete de Agendamento',
          description: data.message,
          icon: 'i-heroicons-clock',
          color: 'primary'
        });
      }
    } catch (e) {
      console.error('Erro ao processar notificação:', e);
    }
  };

  eventSource.onerror = () => {
    // Apenas fecha em caso de erro. Ele tentará reconectar sozinho.
    console.log('Conexão de notificações perdida ou usuário não autenticado.');
  };

  onBeforeUnmount(() => {
    eventSource.close();
  });
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

/* Remove as setas dos inputs de number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
