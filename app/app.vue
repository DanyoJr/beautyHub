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
