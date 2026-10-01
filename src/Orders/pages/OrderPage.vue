<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import BreadcrumbsComponent from '@/components/layout/BreadcrumbsComponent.vue'
import TableComponent from '@/components/common/TableComponent.vue'
import TableBody from '@/Orders/components/TableBody.vue'
import { useOrder } from '@/Orders/composables/useOrder.ts'
import { ref } from 'vue'

const title = ref<string>('Órdenes de compra')
const columns = ref<string[]>(['Código', 'Proveedor', 'Subtotal', 'IVA', 'Total', 'Fecha'])

enum SearchOptions {
  code = 'Código',
  user = 'Usuario',
  supplier = 'Proveedor',
}

const optionsSearching = Object.entries(SearchOptions).map(([value, label]) => ({ value, label }))

const { filter, pagination, total } = useOrder()
</script>
<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="col-span-12">
      <BreadcrumbsComponent
        :parent-path="{ name: 'Compras', root: '/orders' }"
        :current-path="{ name: title, root: '/orders' }"
      />
      <PageHeader group="Compras" :title="title" :count="total">
        <template #actions>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <AppIcon name="download" class="h-4 w-4" />
            Exportar
          </button>
          <RouterLink
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
            :to="{ name: 'order.create' }"
          >
            <AppIcon name="plus" class="h-3 w-3" />
            Crear Orden
          </RouterLink>
        </template>
      </PageHeader>
    </div>
    <div class="col-span-12">
      <TableComponent
        :columns="columns"
        :fieldOptions="optionsSearching"
        :activeMoreFilter="false"
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
