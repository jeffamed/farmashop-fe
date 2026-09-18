<script setup lang="ts">
import { computed } from 'vue'

enum StockStatus {
  Available = 'Disponible',
  Low = 'Stock bajo',
  OutOfStock = 'Agotado',
}

interface StatusResponse {
  text: string
  color: string
}

const props = defineProps<{
  stock: number
}>()

const status = computed((): StatusResponse => {
  if (props.stock === 0) {
    return {
      text: StockStatus.OutOfStock,
      color: 'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500',
    }
  }
  if (props.stock < 20) {
    return {
      text: StockStatus.Low,
      color: 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500',
    }
  }
  return {
    text: StockStatus.Available,
    color: 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
  }
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
    :class="status.color"
  >
    {{ status.text }} · {{ props.stock }}
  </span>
</template>

<style scoped></style>
