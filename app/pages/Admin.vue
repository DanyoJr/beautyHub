<template>
  <div>
    <h1>Admin</h1>
    <FormCreateUser :show-roles="true" redirect-to="/admin" />
  </div>
  <div>
    <AllUsers />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});
const userList = ref();
</script>
