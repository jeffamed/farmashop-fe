<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import { useOrder } from '@/Orders/composables/useOrder.ts'
import { onMounted, onUnmounted, ref } from 'vue'
import DeleteModal from '@/components/common/Modals/DeleteModal.vue'
import type { OrderList } from '@/Orders/types/Order.ts'
import { push } from 'notivue'

const { orders } = useOrder()

const openActionsId = ref<number | string | null>(null)
const actionsMenuRef = ref<HTMLElement | null>(null)

const showDeleteModal = ref(false)
const order = ref<OrderList>({
  id: 0,
  code: '',
  user: '',
  supplier: '',
  subtotal: 0,
  iva: 0,
  total: 0,
  created: '',
})

const toggleActionsMenu = (id: number | string) => {
  openActionsId.value = openActionsId.value === id ? null : id
}

const handleClickOutside = (event: MouseEvent) => {
  if (actionsMenuRef.value && !actionsMenuRef.value.contains(event.target as Node)) {
    openActionsId.value = null
  }
}

const formatCurrency = (value: number) => {
  return value.toFixed(2)
}

const confirmDelete = (orderToDelete: OrderList) => {
  order.value = orderToDelete
  showDeleteModal.value = true
}

const handleDelete = (deleteRegister: boolean) => {
  if (deleteRegister) {
    push.success('Orden eliminada correctamente')
  }
  showDeleteModal.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <tr
    class="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
    v-for="order in orders"
    :key="order.id"
  >
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ order.code }}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500">{{ order.user }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      {{ order.supplier }}
    </td>
    <td
      class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
    >
      C$ {{ formatCurrency(order.subtotal) }}
    </td>
    <td
      class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
    >
      C$ {{ formatCurrency(order.iva) }}
    </td>
    <td
      class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
    >
      C$ {{ formatCurrency(order.total) }}
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      {{ new Date(order.created).toLocaleDateString() }}
    </td>
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <div class="flex items-center justify-end gap-1">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click.prevent="confirmDelete(order)"
        >
          <AppIcon name="trash" class="h-4 w-4" />
          <span class="sr-only">Eliminar</span>
        </button>
        <div
          class="relative"
          :ref="
            (el) => {
              if (openActionsId === order.id) actionsMenuRef = el as HTMLElement
            }
          "
        >
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
            @click="toggleActionsMenu(order.id)"
          >
            <AppIcon name="horizontal-dots" class="h-4 w-4" />
            <span class="sr-only">Más opciones</span>
          </button>
          <div
            v-if="openActionsId === order.id"
            class="absolute right-0 z-10 mt-2 w-32 rounded-lg border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
          >
            <slot name="rowActions" :order="order">
              <router-link
                :to="{ name: 'order.detail', params: { id: order.id } }"
                class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 first:rounded-t-md"
              >
                <AppIcon name="eye" class="h-4 w-4 flex-shrink-0" />
                <span>Ver</span>
              </router-link>
            </slot>
          </div>
        </div>
      </div>
    </td>
  </tr>
  <DeleteModal :show="showDeleteModal" :label="order.code" @onConfirm="handleDelete" />
</template>

<style scoped></style>
