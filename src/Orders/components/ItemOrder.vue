<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import type { orderDetails } from '@/Orders/types/Order.ts'

defineProps<{
  product: orderDetails
}>()

const emit = defineEmits<{
  'deleteProduct': [productId: number]
}>()

const removeProduct = (product_id: number|null) => {
  if (!product_id) return
  emit('deleteProduct', product_id)
}
</script>

<template>
  <tr class="hover:bg-white/5 dark:hover:bg-white/10">
    <td class="px-3 py-3">
      <div class="font-medium text-gray-900 dark:text-white">{{ product.product_name }}</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">{{ product.product_code }}</div>
    </td>
    <td class="px-3 py-3 text-gray-600 dark:text-gray-400">{{ product.expire_at }}</td>
    <td class="px-3 py-3 text-center text-gray-600 dark:text-gray-400">{{ product.quantity }}</td>
    <td class="px-3 py-3 text-right text-gray-600 dark:text-gray-400">
      C$ {{ product.unit_price }}
    </td>
    <td class="px-3 py-3 text-right font-medium text-gray-900 dark:text-white">C$ {{ product.total }}</td>
    <td class="px-3 py-3 text-center">
      <button class="text-red-500 hover:text-red-700 dark:hover:text-red-400 focus:outline-none"
              @click.prevent="removeProduct(product.product_id)"
      >
        <AppIcon name="trash" class="h-4 w-4" />
      </button>
    </td>
  </tr>
</template>

<style scoped></style>
