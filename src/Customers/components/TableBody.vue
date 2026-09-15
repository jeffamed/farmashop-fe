<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { useCustomer } from '@/Customers/composables/useCustomer.ts'
import DeleteModal from '@/components/common/Modals/DeleteModal.vue'
import EditFormModal from '@/Customers/components/EditFormModal.vue'
import type { Customer } from '@/Customers/types/Customer.ts'
import { push } from 'notivue'

const { customers, deleteCustomer } = useCustomer()
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const customer = ref<Customer>({
  id: 0,
  name: '',
  dni: '',
  address: '',
  email: '',
  phone: '',
})

const handleDelete = (deleteRegister: boolean) => {
  if (deleteRegister) {
    deleteCustomer.mutate(customer.value.id, {
      onSuccess: () => {
        customer.value = {
          id: 0,
          name: '',
          dni: '',
          address: '',
          email: '',
          phone: '',
        }
        push.success('Cliente eliminado...')
      },
      onError: () => {
        push.error('Error al eliminar el cliente')
      },
    })
  }
  showDeleteModal.value = false
}

const actionButtons = (cust: Customer, action: string = 'delete') => {
  customer.value = cust
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
    v-for="customer in customers"
    :key="customer.id"
  >
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ customer.name }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ customer.dni }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ customer.address }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ customer.email }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ customer.phone }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <div class="flex items-center justify-end gap-1">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click.prevent="() => actionButtons(customer, 'edit')"
        >
          <AppIcon name="edit" class="h-4 w-4" />
          <span class="sr-only">Editar</span>
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click.prevent="() => actionButtons(customer, 'delete')"
        >
          <AppIcon name="trash" class="h-4 w-4" />
          <span class="sr-only">Eliminar</span>
        </button>
      </div>
    </td>
  </tr>
  <DeleteModal :show="showDeleteModal" :label="customer.name" @onConfirm="handleDelete" />
  <EditFormModal v-model:show="showEditModal" :customer="customer"/>
</template>

<style scoped></style>
