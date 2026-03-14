<template>
  <div>
    <div>
      <img src="~/assets/Logo.png" alt="Logo" />
      <LogoutButton />
    </div>
    <div>
      <h1>Admin</h1>
      <FormCreateUser :show-roles="true" redirect-to="/admin" />
    </div>
    <div>
      <AllUsers />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoutButton from "~/components/LogoutButton.vue";
definePageMeta({
  middleware: "admin",
});
const userList = ref();
</script>
<style>
img {
  width: 150px;
  margin-bottom: 20px;
}
</style>
