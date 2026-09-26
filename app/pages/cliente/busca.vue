<template>
  <div class="min-h-screen bg-[#fafafa]">
    <ClienteHeader />

    <SearchComponent />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role-redirect'] });
</script>
