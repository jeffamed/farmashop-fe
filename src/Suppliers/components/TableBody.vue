<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { useSupplier } from '@/Suppliers/composables/useSupplier.ts'
import DeleteModal from '@/components/common/Modals/DeleteModal.vue'
import EditFormModal from '@/Suppliers/components/EditFormModal.vue'
import type { Supplier } from '@/Suppliers/types/Supplier.ts'
import { push } from 'notivue'

const { suppliers, deleteSupplier } = useSupplier()
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const supplier = ref<Supplier>({
  id: 0,
  name: '',
  ruc: '',
  address: '',
  phone: '',
})

const handleDelete = (deleteRegister: boolean) => {
  if (deleteRegister) {
    deleteSupplier.mutate(supplier.value.id, {
      onSuccess: () => {
        supplier.value = {
          id: 0,
          name: '',
          ruc: '',
          address: '',
          phone: '',
        }
        push.success('Proveedor eliminado...')
      },
      onError: () => {
        push.error('Error al eliminar el proveedor')
      },
    })
  }
  showDeleteModal.value = false
}

const actionButtons = (sup: Supplier, action: string = 'delete') => {
  supplier.value = sup
  if (action === 'delete') {
    showDeleteModal.value = true
  }
  if (action === 'edit') {
    showEditModal.value = true
  }
}
</script>

<template>
  <tr
    class="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
    v-for="supplier in suppliers"
    :key="supplier.id"
  >
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ supplier.name }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ supplier.ruc }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ supplier.address }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ supplier.phone }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <div class="flex items-center justify-end gap-1">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click.prevent="() => actionButtons(supplier, 'edit')"
        >
          <AppIcon name="edit" class="h-4 w-4" />
          <span class="sr-only">Editar</span>
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click.prevent="() => actionButtons(supplier, 'delete')"
        >
          <AppIcon name="trash" class="h-4 w-4" />
          <span class="sr-only">Eliminar</span>
        </button>
      </div>
    </td>
  </tr>
  <DeleteModal :show="showDeleteModal" :label="supplier.name" @onConfirm="handleDelete" />
  <EditFormModal v-model:show="showEditModal" :supplier="supplier"/>
</template>

<style scoped></style>
