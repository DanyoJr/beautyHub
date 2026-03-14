<template>
  <div>
    <h2>Todos os Usuários</h2>

    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.name }} — {{ user.email }} — {{ user.roles }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { IUser } from "~~/server/models/User";
const { data } = await useFetch<{ users: IUser[] }>("/api/user");
const users = computed(() => data.value?.users);
</script>
