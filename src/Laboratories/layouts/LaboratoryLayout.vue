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

const title = ref<string>('Laboratorios')
const show = ref<boolean>(false)
const id = ref<number>(0)
const name = ref<string>('')
const address = ref<string>('')
const optionsSearching = Object.entries(filterTable).map(([value, label]) => ({ value, label }))
const columns = ref<string[]>(['Nombre', 'Direccion'])

const { laboratories, total, filter, pagination } = useLaboratory()

const newLaboratory = () => {
  id.value = 0
  name.value = ''
  address.value = ''
  show.value = true
}

const saveLaboratory = (payload: Record<string, string>) => {
  console.log('Payload', payload)
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
            <FormModal v-model:show="show" @save="saveLaboratory" />
          </template>
        </PageHeader>
      </div>
      <div class="col-span-12">
        <TableComponent :fieldOptions="optionsSearching" :columns="columns" v-model:filterSearch="filter" v-model:pagination="pagination">
          <template #default>
            <tr
              class="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
              v-for="laboratory in laboratories"
              :key="laboratory.id"
            >
              <td class="whitespace-nowrap px-5 py-4 sm:px-6">
                <p class="font-medium text-gray-800 dark:text-white/90">{{ laboratory.name }}</p>
              </td>
              <td
                class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
              >
                <p class="font-medium text-gray-800 dark:text-white/90">{{ laboratory.address }}</p>
              </td>
              <td class="whitespace-nowrap px-5 py-4 sm:px-6">
                <div class="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <AppIcon name="edit" class="h-4 w-4" />
                    <span class="sr-only">Editar</span>
                  </button>
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <AppIcon name="trash" class="h-4 w-4" />
                    <span class="sr-only">Eliminar</span>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </TableComponent>
      </div>
    </div>
  </admin-layout>
</template>
<style scoped></style>
