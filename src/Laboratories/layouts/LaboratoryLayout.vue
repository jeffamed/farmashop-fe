<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import { ref } from 'vue'
import FormModal from '@/Laboratories/components/FormModal.vue'
import TableComponent from '@/components/common/TableComponent.vue'
import { filterTable } from '@/Laboratories/Enums/LaboratoryEnum'
import { useLaboratory } from '@/Laboratories/composables/useLaboratory.ts'
import TableBody from '@/Laboratories/components/TableBody.vue'

const title = ref<string>('Laboratorios')
const show = ref<boolean>(false)
const id = ref<number>(0)
const name = ref<string>('')
const address = ref<string>('')
const optionsSearching = Object.entries(filterTable).map(([value, label]) => ({ value, label }))
const columns = ref<string[]>(['Nombre', 'Direccion'])

const { total, filter, pagination } = useLaboratory()

const newLaboratory = () => {
  id.value = 0
  name.value = ''
  address.value = ''
  show.value = true
}
</script>
<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <Breadcrumbs
          :parent-path="{ name: 'Almacén', root: '/laboratories' }"
          :current-path="{ name: title, root: '/laboratories' }"
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
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
              @click="newLaboratory"
            >
              <AppIcon name="plus" class="h-3 w-3" />
              Nueva Laboratorio
            </button>
            <FormModal v-model:show="show" />
          </template>
        </PageHeader>
      </div>
      <div class="col-span-12">
        <TableComponent :fieldOptions="optionsSearching" :columns="columns" v-model:filterSearch="filter" v-model:pagination="pagination">
          <template #default>
            <table-body />
          </template>
        </TableComponent>
      </div>
    </div>
  </admin-layout>
</template>
<style scoped></style>
