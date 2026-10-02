<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'

const stock = 240

const getStockColor = (quantity: number) => {
  if (quantity >= 100) return 'text-green-600 dark:text-green-400'
  if (quantity >= 30) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

const stockColor = getStockColor(stock)
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-5">
    <!-- Header with Image and Product Info -->
    <div class="flex gap-4 mb-4">
      <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
        <span class="text-xs font-bold text-gray-600 dark:text-gray-400">IMG</span>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Acetaminofén 500mg</h3>
        <p class="text-xs text-gray-600 dark:text-gray-400">PRD-1042 · Caja · 20 tabletas</p>
      </div>
    </div>

    <!-- Prices and Stock -->
    <div class="flex gap-4 justify-between items-end mb-4">
      <div class="flex gap-4">
        <div>
          <span class="text-xs text-gray-500 dark:text-gray-400">Compra</span>
          <p class="text-sm font-semibold text-gray-900 dark:text-white">C$ 8.50</p>
        </div>
        <div>
          <span class="text-xs text-gray-500 dark:text-gray-400">Venta</span>
          <p class="text-sm font-semibold text-gray-900 dark:text-white">C$ 12.50</p>
        </div>
      </div>
      <div class="text-right">
        <span class="text-xs text-gray-500 dark:text-gray-400">Stock</span>
        <p :class="['text-sm font-semibold', stockColor]">{{ stock }}</p>
      </div>
    </div>

    <!-- Bottom Section with Controls -->
    <div class="grid grid-cols-3 gap-3 items-end">
      <!-- Expiration Date -->
      <div>
        <label class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 block">
          F. Vencimiento
        </label>
        <input
          type="date"
          value="2027-12-31"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-2.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <!-- Quantity -->
      <div>
        <label class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 block">
          Cant.
        </label>
        <input
          type="number"
          value="1"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-2.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <!-- Discount -->
      <div>
        <label class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 block">
          Desc.
        </label>
        <input
          type="number"
          value="0"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-2.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
    </div>

    <!-- Add Button -->
    <button class="w-full mt-4 rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 inline-flex items-center justify-center gap-2">
      <AppIcon name="plus" class="h-4 w-4" />
      Agregar
    </button>
  </div>
</template>

<style scoped></style>
