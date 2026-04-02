<template>
  <NuxtPage />
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
</style>
