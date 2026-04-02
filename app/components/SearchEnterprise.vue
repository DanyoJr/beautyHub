<template>
  <UInput
    v-model="searchQuery"
    icon="i-heroicons-magnifying-glass-20-solid"
    placeholder="Buscar por nome, id ou email..."
    color="neutral"
    variant="outline"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style scoped>
.search-enterprise {
  display: flex;
}
</style>
