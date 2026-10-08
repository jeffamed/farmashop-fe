<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import ProductCard from '@/Orders/components/ProductCard.vue'
import { useOrder } from '@/Orders/composables/useOrder.ts'
import type { SelectedProductCard } from '@/Products/types/Product.ts'

const { search_product, productsData } = useOrder()
const emit = defineEmits<{
  'selected:product': [product: SelectedProductCard]
  'add:product': [product: SelectedProductCard]
}>()
const products = computed(() => productsData.data.value)
const getProductSelected = (product: SelectedProductCard) => {
  emit('selected:product', product)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Search Input -->
    <div class="rounded-2xl p-4">
      <div class="relative">
        <AppIcon
          name="search"
          class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          v-model="search_product"
          type="text"
          placeholder="Buscar producto..."
          class="w-full rounded-full border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 pl-12 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
    </div>

    <div v-if="products">
      <!-- Product Cards -->
      <div class="space-y-3" v-for="product in products" :key="product.id">
        <ProductCard
          :product="product"
          @selected:product="getProductSelected"
          @add:product="(selected) => emit('add:product', selected)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
