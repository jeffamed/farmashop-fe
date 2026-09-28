<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import BreadcrumbsComponent from '@/components/layout/BreadcrumbsComponent.vue'
import { ref } from 'vue'
import FormModal from '@/Customers/components/FormModal.vue'
import TableComponent from '@/components/common/TableComponent.vue'
import { filterTable } from '@/Customers/Enums/CustomerEnum'
import { useCustomer } from '@/Customers/composables/useCustomer.ts'
import TableBody from '@/Customers/components/TableBody.vue'

const title = ref<string>('Clientes')
const show = ref<boolean>(false)
const optionsSearching = Object.entries(filterTable).map(([value, label]) => ({ value, label }))
const columns = ref<string[]>(['Nombre', 'Cédula', 'Dirección', 'Correo', 'Teléfono'])

const { total, filter, pagination } = useCustomer()

const newCustomer = () => {
  show.value = true
}
</script>
<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="col-span-12">
      <BreadcrumbsComponent
        :parent-path="{ name: 'Ventas', root: '/customers' }"
        :current-path="{ name: title, root: '/customers' }"
      />
      <PageHeader group="Ventas" :title="title" :count="total">
        <template #actions>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <AppIcon name="download" class="h-4 w-4" />
            Exportar
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
            @click="newCustomer"
          >
            <AppIcon name="plus" class="h-3 w-3" />
            Nuevo Cliente
          </button>
          <FormModal v-model:show="show" />
        </template>
      </PageHeader>
    </div>
    <div class="col-span-12">
      <TableComponent
        :fieldOptions="optionsSearching"
        :columns="columns"
        v-model:filterSearch="filter"
        v-model:pagination="pagination"
      >
        <template #default>
          <table-body />
        </template>
      </TableComponent>
    </div>
  </div>
</template>
<style scoped></style>
