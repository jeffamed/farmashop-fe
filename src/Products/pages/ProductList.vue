<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import { ref } from 'vue'
import TableComponent from '@/components/common/TableComponent.vue'
import { useProduct } from '@/Products/composables/useProduct.ts'
import TableBody from '@/Products/components/TableBody.vue'
import { FilterOption } from '@/Products/enums/FilterOption.ts'

const title = ref<string>('Productos')
const columns = ref<string[]>(['Producto', 'Laboratorio', 'Tipo', 'Precio', 'Estado'])
const optionsSearching = Object.entries(FilterOption).map(([value, label]) => ({ value, label }))

const { filter, pagination, total } = useProduct()
</script>
<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="col-span-12">
      <Breadcrumbs
        :parent-path="{ name: 'Almacén', root: '/products' }"
        :current-path="{ name: title, root: '/products' }"
      />
      <PageHeader group="Almacén" :title="title" :count="total">
        <template #actions>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <AppIcon name="download" class="h-4 w-4" />
            Exportar
          </button>
        </template>
      </PageHeader>
    </div>
    <div class="col-span-12">
      <TableComponent
        :columns="columns"
        :fieldOptions="optionsSearching"
        :activeMoreFilter="true"
        v-model:filterSearch="filter"
        v-model:pagination="pagination"
      >
        <template #filters>
          <h2>filtros adicionales</h2>
        </template>
        <template #default>
          <table-body />
        </template>
      </TableComponent>
    </div>
  </div>
</template>
<style scoped></style>
