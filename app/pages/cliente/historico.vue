<template>
  <div class="min-h-screen bg-[#fafafa]">
    <ClienteHeader />

    <HistoryComponent />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role-redirect'] });
</script>
