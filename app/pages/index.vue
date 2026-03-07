<template>
  <div>
    <h1>Jão o brabo</h1>
    <NuxtLink to="/createUser">About</NuxtLink>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
