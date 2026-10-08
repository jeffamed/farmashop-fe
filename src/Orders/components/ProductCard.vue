<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import type { ProductSearch, SelectedProductCard } from '@/Products/types/Product.ts'
import { computed, reactive } from 'vue'

interface Form {
  quantity: number
  purchase_price: number
  discount: number
  expiration_date: string
}

const props = defineProps<{
  product: ProductSearch
}>()

const emit = defineEmits<{
  'selected:product': [product: SelectedProductCard]
  'add:product': [product: SelectedProductCard]
}>()

const form = reactive<Form>({
  quantity: 1,
  purchase_price: props.product.cost ?? 0,
  discount: 0,
  expiration_date: '',
})


const getStockColor = (quantity: number) => {
  if (quantity >= 100) return 'text-green-600 dark:text-green-400'
  if (quantity >= 30) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}
const stockColor = getStockColor(props.product.stock)
const loadProduct = () => {
  emit('selected:product', {...props.product, ...form})
}
const canAdd = computed(
  () => form.expiration_date !== '' && form.quantity > 0 && form.purchase_price >= 0 &&
    form.discount >= 0 && form.discount <= 100,
)
const addProduct = () => {
  if (!canAdd.value) return
  emit('add:product', {...props.product, ...form})
}
</script>

<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-5"
  >
    <!-- Header with Image and Product Info -->
    <div class="flex gap-4 mb-4">
      <div
        class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
      >
        <img
          v-if="props.product.image !== ''"
          :src="props.product.image"
          alt="product"
          width="100"
        />
        <img v-else src="/images/resource/no_image.png" alt="sin imagen" />
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {{ props.product.name }}
        </h3>
        <p class="text-xs text-gray-600 dark:text-gray-400">
          {{ props.product.code }} · {{ props.product.presentation }} ·
          {{ props.product.unit_box }} und/caja
        </p>
      </div>
    </div>

    <!-- Prices and Stock -->
    <div class="flex gap-4 justify-between items-end mb-4">
      <div class="flex gap-4">
        <div>
          <span class="text-xs text-gray-500 dark:text-gray-400">Ant.Compra</span>
          <p class="text-sm font-semibold text-gray-900 dark:text-white">
            C$ {{ props.product.cost_prev ?? 0 }}
          </p>
        </div>
        <div>
          <span class="text-xs text-gray-500 dark:text-gray-400">Ult.Compra</span>
          <p class="text-sm font-semibold text-gray-900 dark:text-white">
            C$ {{ props.product.cost }}
          </p>
        </div>
        <div>
          <span class="text-xs text-gray-500 dark:text-gray-400">Venta</span>
          <p class="text-sm font-semibold text-gray-900 dark:text-white">
            C$ {{ props.product.unit_price }}
          </p>
        </div>
      </div>
      <div class="text-right">
        <span class="text-xs text-gray-500 dark:text-gray-400">Stock</span>
        <p :class="['text-sm font-semibold', stockColor]">{{ props.product.stock }}</p>
      </div>
    </div>

    <!-- Bottom Section with Controls -->
    <div class="grid grid-cols-2 gap-3 items-end">
      <!-- Expiration Date -->
      <div>
        <label
          class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 block"
        >
          F. Vencimiento
        </label>
        <input
          v-model="form.expiration_date"
          type="date"
          placeholder="DD/MM/YYYY"
          class="native-date-picker w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-2.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
        />
      </div>

      <!-- Quantity -->
      <div>
        <label
          class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 block"
        >
          Cant.
        </label>
        <input
          type="number"
          v-model="form.quantity"
          value="1"
          min="1"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-2.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <!-- Purchase price -->
      <div>
        <label
          class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 block"
        >
          Precio compra
        </label>
        <input
          type="number"
          v-model.number="form.purchase_price"
          min="0"
          step="0.01"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-2.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <!-- Discount -->
      <div>
        <label
          class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 block"
        >
          Desc.
        </label>
        <input
          type="number"
          v-model="form.discount"
          value="0"
          min="0"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-2.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
    </div>

    <!-- Add Button -->
    <div class="flex gap-2">
      <button
        class="w-full mt-4 rounded-full px-4 py-2.5 text-center border-amber-50 font-medium text-white focus:outline-none focus:ring-2 inline-flex items-center justify-center gap-2"
        @click.prevent="loadProduct"
      >
        <AppIcon name="edit" class="h-4 w-4" />
        Cargar
      </button>
      <button
        :disabled="!canAdd"
        class="w-full mt-4 rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
        @click.prevent="addProduct"
      >
        <AppIcon name="plus" class="h-4 w-4" />
        Agregar
      </button>
    </div>
  </div>
</template>

<style scoped>
.native-date-picker::-webkit-calendar-picker-indicator {
  display: block !important;
  -webkit-appearance: auto !important;
  opacity: 1 !important;
  cursor: pointer;
}
</style>
