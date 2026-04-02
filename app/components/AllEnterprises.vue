<template>
  <div class="flex flex-col gap-6 w-full">
    
    <!-- Top Container: Search and Button -->
    <div class="flex flex-col sm:flex-row items-center gap-4 w-full">
      <SearchEnterprise v-model="searchQuery" class="flex-1 w-full sm:max-w-md" />
      <UButton
        icon="i-heroicons-plus"
        size="lg"
        class="text-white rounded-xl px-6 hover:opacity-90 w-full sm:w-auto flex-shrink-0"
        style="background-color: #6d3483;"
        variant="solid"
        @click="isCreateModalOpen = true"
      >
        Nova Empresa
      </UButton>
    </div>

    <!-- Middle: Tabs -->
    <div class="flex w-full">
      <UTabs
        :items="tabs"
        v-model="activeTab"
        :ui="{
          list: 'bg-white rounded-xl shadow-sm p-1'
        }"
        class="max-w-md w-full sm:w-auto"
        :class="{
          '[&_button[data-state=active]]:bg-[#6D3483] [&_button[data-state=active]]:text-white [&_button[data-state=active]]:rounded-lg': true,
          '[&_button[data-state=inactive]]:text-gray-500': true
        }"
      />
    </div>

    <!-- Bottom: Table -->
    <div class="bg-white rounded-2xl shadow-sm p-4 w-full overflow-hidden">
      <Transition name="slide" mode="out-in">
        <div :key="activeTab">
          <UTable :data="filteredEnterprises" :columns="columns" class="flex-1 w-full" />
        </div>
      </Transition>
    </div>

    <!-- Modal Detalhes -->
    <!-- Enterprise Details Modal -->
    <EnterpriseDetailsModal v-model="isOpen" :enterprise="selectedEnterprise" />

    <!-- Create Enterprise Modal -->
    <CreateEnterpriseModal v-model="isCreateModalOpen" @enterprise-created="refreshList" />

  </div>
</template>

<script setup lang="ts">
import type { IEnterprise } from "~~/server/models/Enterprise";
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

const isOpen = ref(false);
const isCreateModalOpen = ref(false);
const selectedEnterprise = ref<IEnterprise | null>(null);
const activeTab = ref("todas");
const searchQuery = ref("");

const { data, refresh } = await useFetch<{ enterprises: IEnterprise[] }>(
  "/api/enterprise",
);
const enterprises = computed(() => data.value?.enterprises ?? []);

async function refreshList() {
  await refresh();
}

const filteredEnterprises = computed(() => {
  let result = enterprises.value;

  if (activeTab.value === "ativas")
    result = result.filter((e) => e.status_empresa === "ativo");
  if (activeTab.value === "inativas")
    result = result.filter((e) => e.status_empresa === "inativo");

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((e) => {
      const nome = String(e.nome_empresa || "").toLowerCase();
      const email = String(e.email_empresa || "").toLowerCase();
      const id = String(e.id_empresa || "").toLowerCase();
      return nome.includes(q) || email.includes(q) || id.includes(q);
    });
  }

  return result;
});

const tabs = computed(() => [
  { label: `Todas (${enterprises.value.length})`, value: "todas" },
  {
    label: `Ativas (${enterprises.value.filter((e) => e.status_empresa === "ativo").length})`,
    value: "ativas",
  },
  {
    label: `Inativas (${enterprises.value.filter((e) => e.status_empresa === "inativo").length})`,
    value: "inativas",
  },
]);

function openDialog(enterprise: IEnterprise) {
  selectedEnterprise.value = enterprise;
  isOpen.value = true;
}

const columns: TableColumn<IEnterprise>[] = [
  { accessorKey: "id_empresa", header: "ID" },
  { accessorKey: "nome_empresa", header: "Nome" },
  { accessorKey: "categoria_empresa", header: "Categoria" },
  { accessorKey: "email_empresa", header: "Email" },
  { accessorKey: "telefone_empresa", header: "Telefone" },
  {
    accessorKey: "status_empresa",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        ativo: "success" as const,
        inativo: "error" as const,
      }[row.getValue("status_empresa") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("status_empresa"),
      );
    },
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => {
      return h(UButton, {
        variant: "ghost",
        label: "Ver detalhes",
        onClick: () => openDialog(row.original as IEnterprise),
      });
    },
  },
];
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
