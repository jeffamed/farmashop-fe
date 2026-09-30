<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import BadgeStock from './BadgeStock.vue'
import { useProduct } from '@/Products/composables/useProduct.ts'
import { onMounted, onUnmounted, ref } from 'vue'
import DeleteModal from '@/components/common/Modals/DeleteModal.vue'
import type { ProductLists } from '@/Products/types/Product.ts'
import { push } from 'notivue'

const { products, deleteProduct, prefethEdit, handleActiveProduct } = useProduct()

const openActionsId = ref<number | string | null>(null)
const actionsMenuRef = ref<HTMLElement | null>(null)

const showDeleteModal = ref(false)
const product = ref<ProductLists>({
  id: 0,
  active: true,
  name: '',
  code: '',
  laboratory: '',
  type: '',
  unit_price: 0,
  stock: 0,
})

const toggleActionsMenu = (id: number | string) => {
  openActionsId.value = openActionsId.value === id ? null : id
}

const handleClickOutside = (event: MouseEvent) => {
  if (actionsMenuRef.value && !actionsMenuRef.value.contains(event.target as Node)) {
    openActionsId.value = null
  }
}

const formatCurrent = (value: number) => {
  return value.toFixed(2)
}

const confirmDelete = (productToDelete: ProductLists) => {
  product.value = productToDelete
  showDeleteModal.value = true
}

const handleDelete = (deleteRegister: boolean) => {
  if (deleteRegister) {
    deleteProduct.mutate(product.value.id, {
      onSuccess: () => {
        push.success('Producto eliminado correctamente')
      },
      onError: () => {
        push.error('Ocurrió un error al eliminar el producto')
      },
    })
  }
  showDeleteModal.value = false
}

const handleActive = (id: number, active: boolean) => {
  handleActiveProduct.mutate(
    { id, active },
    {
      onSuccess: () => {
        const textActive = active ? 'habilitado' : 'deshabilitado'
        push.success(`Producto ${textActive} correctamente`)
      },
    },
  )
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <tr
    class="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
    v-for="product in products"
    :key="product.id"
  >
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <router-link :to="{ name: 'product.detail', params: { id: product.id } }">
        <p class="font-medium text-gray-800 dark:text-white/90">{{ product.name }}</p>
      </router-link>
      <p class="text-xs text-gray-400 dark:text-gray-500">{{ product.code }}</p>
      <span
        class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-gray-400 text-gray-700 dark:bg-gray-500/15 dark:text-gray-500"
        v-show="!product.active"
        >Deshabilitado</span
      >
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      {{ product.laboratory }}
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      {{ product.type }}
    </td>
    <td
      class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
    >
      C$ {{ formatCurrent(product.unit_price) }}
    </td>
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <BadgeStock :stock="product.stock" />
    </td>
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <div class="flex items-center justify-end gap-1">
        <router-link
          @mouseenter="prefethEdit(product.id)"
          :to="{ name: 'product.edit', params: { id: product.id } }"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <AppIcon name="edit" class="h-4 w-4" />
          <span class="sr-only">Editar</span>
        </router-link>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click.prevent="confirmDelete(product)"
        >
          <AppIcon name="trash" class="h-4 w-4" />
          <span class="sr-only">Eliminar</span>
        </button>
        <div
          class="relative"
          :ref="
            (el) => {
              if (openActionsId === product.id) actionsMenuRef = el as HTMLElement
            }
          "
        >
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
            @click="toggleActionsMenu(product.id)"
          >
            <AppIcon name="horizontal-dots" class="h-4 w-4" />
            <span class="sr-only">Más opciones</span>
          </button>
          <div
            v-if="openActionsId === product.id"
            class="absolute right-0 z-10 mt-2 w-32 rounded-lg border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
          >
            <slot name="rowActions" :product="product">
              <router-link
                :to="{ name: 'product.detail', params: { id: product.id } }"
                class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 first:rounded-t-md"
              >
                <AppIcon name="eye" class="h-4 w-4 flex-shrink-0" />
                <span>Ver</span>
              </router-link>
              <div
                class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 last:rounded-b-md"
              >
                <AppIcon name="table" class="h-4 w-4 flex-shrink-0" />
                <span>Ir a Kardex</span>
              </div>
              <button
                v-if="product.active"
                class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 last:rounded-b-md text-red-500"
                @click.prevent="handleActive(product.id, false)"
              >
                <AppIcon name="close" class="h-4 w-4 flex-shrink-0" />
                <span>Deshabilitar</span>
              </button>
              <button
                v-else
                @click.prevent="handleActive(product.id, true)"
                class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 last:rounded-b-md"
              >
                <AppIcon name="check" class="h-4 w-4 flex-shrink-0" />
                <span>Habilitar</span>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </td>
  </tr>
  <DeleteModal :show="showDeleteModal" :label="product.name" @onConfirm="handleDelete" />
</template>

<style scoped></style>
