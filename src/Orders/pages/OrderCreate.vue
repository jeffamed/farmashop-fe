<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import SelectSearch from '@/components/common/SelectSearch.vue'
import router from '@/router'
import { computed, ref, watch } from 'vue'
import DrawerComponent from '@/components/common/DrawerComponent.vue'
import ProductSearchDrawer from '@/Orders/components/ProductSearchDrawer.vue'
import type { orderDetails, OrderForm } from '@/Orders/types/Order.ts'
import type { SelectedProductCard } from '@/Products/types/Product.ts'
import ItemOrder from '@/Orders/components/ItemOrder.vue'
import { useSuppliers } from '@/Orders/composables/useSuppliers.ts'

const { search: searchSupplier, suppliers } = useSuppliers()
const isDrawerOpen = ref(false)
const errorForm = ref({
  details: '',
  order: '',
})
const form = ref<OrderForm>({
  invoice_number: '',
  supplier_id: null,
  product_id: null,
  product_code: '',
  product_name: '',
  stock: 0,
  expiration_date: '',
  quantity: 0,
  suggest_price: 0,
  unit_price: 0,
  discount: 0,
  tax: false,
})
const details = ref<orderDetails[]>([])
const additionalData = ref({
  current_price_product: 0,
  supplier_address: '',
  supplier_phone: '',
})

const totalBeforeTax = computed(() => {
  return details.value.reduce((total, item) => total + item.total, 0)
})
const totalOrder = computed(() => {
  let tax = 0
  const total = totalBeforeTax.value
  if (form.value.tax) {
    tax = total * 0.15
  }
  return total + tax
})

watch(() => form.value.supplier_id, (supplierId) => {
  const supplier = suppliers.value.find((supplier) => supplier.id === supplierId)
  additionalData.value.supplier_address = supplier?.address || ''
  additionalData.value.supplier_phone = supplier?.phone || ''
})

const handleProductSelected = (product: SelectedProductCard) => {
  form.value = {
    ...form.value,
    product_code: product.code,
    product_name: product.name,
    product_id: product.id,
    stock: product.stock,
    discount: product.discount,
    unit_price: product.purchase_price,
    quantity: product.quantity,
    expiration_date: product.expiration_date,
  }
  additionalData.value.current_price_product = product.unit_price
  isDrawerOpen.value = false
}
const pushDetail = (item: Omit<orderDetails, 'total'>) => {
  const total = item.quantity * item.unit_price * (1 - item.discount / 100)
  // product_id is the row key, so adding the same product again replaces its row
  details.value = details.value.filter((row) => row.product_id !== item.product_id)
  details.value.push({ ...item, total })
}
const handleProductAdded = (product: SelectedProductCard) => {
  pushDetail({
    product_id: product.id,
    product_code: product.code,
    product_name: product.name,
    quantity: product.quantity,
    unit_price: product.purchase_price,
    suggest_price: 0,
    expire_at: product.expiration_date,
    discount: product.discount,
  })
}
const addProductToOrder = () => {
  if (validateForm()) return
  const productOrder = { ...form.value }
  pushDetail({
    product_id: productOrder.product_id,
    product_code: productOrder.product_code,
    product_name: productOrder.product_name,
    quantity: productOrder.quantity,
    unit_price: productOrder.unit_price,
    suggest_price: productOrder.suggest_price,
    expire_at: productOrder.expiration_date,
    discount: productOrder.discount,
  })
  resetForm()
}
const validateForm = (): boolean => {
  let hasError = false
  errorForm.value.details = ''
  const formValue = { ...form.value }

  if (formValue.product_id === null) {
    hasError = true
    errorForm.value.details = 'Debe seleccionar o buscar un producto'
    return hasError
  }

  if (formValue.expiration_date === '') {
    hasError = true
    errorForm.value.details = 'La fecha de vencimiento no puede estar vacía'
    return hasError
  }

  if (formValue.quantity <= 0) {
    hasError = true
    errorForm.value.details = 'La cantidad no puede ser 0'
    return hasError
  }

  if (formValue.discount < 0 || formValue.discount > 100) {
    hasError = true
    errorForm.value.details = 'El descuento debe ser entre 0 y 100'
    return hasError
  }

  return hasError
}
const resetForm = () => {
  form.value = {
    invoice_number: '',
    supplier_id: null,
    product_id: null,
    product_code: '',
    product_name: '',
    stock: 0,
    expiration_date: '',
    quantity: 0,
    suggest_price: 0,
    unit_price: 0,
    discount: 0,
    tax: false,
  }
}
const handleSubmit = () => {
  if (!validateOrder()) return
  console.log('Formulario válido, proceder a guardar')
}
const validateOrder = () => {
  let orderCompleted = true

  if (form.value.invoice_number === '') {
    orderCompleted = false
    errorForm.value.order = 'Debe ingresar un número de factura'
  }

  if (form.value.supplier_id == null) {
    orderCompleted = false
    errorForm.value.order = 'Debe seleccionar un proveedor'
  }

  if (details.value.length === 0) {
    orderCompleted = false
    errorForm.value.details = 'Debe agregar al menos un producto'
  }
  return orderCompleted
}
const deleteItem = (productId: number) => {
  details.value = details.value.filter((item) => item.product_id !== productId)
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Header -->
    <div class="col-span-1 lg:col-span-3">
      <RouterLink
        :to="{ name: 'orders' }"
        class="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-400 uppercase hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      >
        <AppIcon name="chevron-right" class="h-3.5 w-3.5 rotate-180" />
        Compras / Órdenes
      </RouterLink>
      <h1 class="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white/90">
        Registrar compra
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Registra la factura, prepara los productos y revisa el total antes de guardar.
      </p>
    </div>

    <!-- Left Column - Forms -->
    <div class="col-span-1 lg:col-span-2 space-y-6">
      <!-- Supplier Information Section -->
      <div
        class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6"
      >
        <div class="flex items-start gap-3 mb-6">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 dark:bg-blue-500/20"
          >
            <AppIcon name="building" class="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Información del proveedor
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Datos generales de la factura de compra.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Número de factura <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.invoice_number"
              type="text"
              placeholder="00000000X"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Proveedor <span class="text-red-500">*</span>
            </label>
            <SelectSearch
              v-model="form.supplier_id"
              v-model:search="searchSupplier"
              :options="suppliers"
              placeholder="Seleccione el proveedor"
              search-placeholder="Buscar proveedor..."
              label="name"
              track-by="id"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >Teléfono</label
            >
            <input
              type="text"
              :value="additionalData.supplier_phone"
              disabled
              placeholder="Teléfono del proveedor"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >Dirección</label
            >
            <input
              type="text"
              disabled
              :value="additionalData.supplier_address"
              placeholder="Dirección del proveedor"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <!-- Product Information Section -->
      <div
        class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-start gap-3 mb-6">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 dark:bg-green-500/20"
            >
              <AppIcon name="box-cube" class="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Información del producto
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Selecciona y prepara un producto para la compra.
              </p>
            </div>
          </div>
          <button
            class="flex items-center gap-2 rounded-full border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            type="button"
            @click="isDrawerOpen = true"
          >
            <AppIcon name="search" class="h-4 w-4" />
            Buscar producto
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >Código</label
            >
            <input
              v-model="form.product_code"
              type="text"
              placeholder="PRD-1042"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >Producto</label
            >
            <input
              v-model="form.product_name"
              disabled
              type="text"
              placeholder="Acetaminofén 500mg · Caja · 20 tabletas"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >Stock actual</label
            >
            <input
              v-model="form.stock"
              disabled
              type="text"
              placeholder="240"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        <hr class="my-5 border-t border-gray-200 dark:border-gray-800" />

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Fecha de vencimiento <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.expiration_date"
              type="date"
              class="native-date-picker w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Cantidad comprada <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.quantity"
              type="number"
              placeholder="12"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Precio compra (C$) <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.unit_price"
              type="number"
              placeholder="8.5"
              step="0.01"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >Precio venta sugerido(C$)</label
            >
            <input
              v-model="form.suggest_price"
              type="number"
              placeholder="12.5"
              step="1"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <p v-show="additionalData.current_price_product > 0">
              <small>Precio actual: C${{ additionalData.current_price_product }}</small>
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
              >Descuento (%)</label
            >
            <input
              v-model="form.discount"
              type="number"
              placeholder="0"
              min="0"
              max="100"
              step="1"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>
        <p v-show="errorForm.details !== ''" class="text-red-500 font-medium">
          {{ errorForm.details }}
        </p>
        <button
          class="w-full rounded-full bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-center gap-2"
          @click.prevent="addProductToOrder"
        >
          <AppIcon name="plus" class="h-4 w-4" />
          Agregar a la compra
        </button>
      </div>

      <!-- Added Products Section -->
      <div
        class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          Productos agregados
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {{ details.length }} productos preparados en esta compra
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th class="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  PRODUCTO
                </th>
                <th class="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  VENCIMIENTO
                </th>
                <th class="px-3 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                  CANTIDAD
                </th>
                <th class="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">
                  PRECIO COMPRA
                </th>
                <th class="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">
                  TOTAL
                </th>
                <th class="px-3 py-2 text-center font-medium text-gray-700 dark:text-gray-300"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <template v-if="details.length > 0">
                <template v-for="item in details" :key="item.product_id">
                  <item-order :product="item" @deleteProduct="deleteItem" />
                </template>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5" class="px-3 py-2 text-center text-gray-600 dark:text-gray-400">
                    No hay productos en el carrito
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Right Column - Summary -->
    <div class="col-span-1 lg:col-span-1">
      <div
        class="sticky top-6 rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6"
      >
        <div class="flex items-center gap-2 mb-6">
          <AppIcon name="shopping-cart" class="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Resumen de compra</h3>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">{{ details.length }} productos</p>

        <div class="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span class="font-medium text-gray-900 dark:text-white"
              >C$ {{ totalBeforeTax ?? 0 }}</span
            >
          </div>
          <div class="flex justify-between text-sm" v-if="false">
            <span class="text-gray-600 dark:text-gray-400">Descuentos</span>
            <span class="font-medium text-green-600 dark:text-green-400">C$ 0.00</span>
          </div>
          <div class="flex justify-between text-sm">
            <div class="flex items-center gap-1">
              <input type="checkbox" name="iva" id="iva" v-model="form.tax" />
              <label for="iva" class="text-gray-600 dark:text-gray-400">Impuestos</label>
            </div>
            <span class="font-medium text-gray-900 dark:text-white">{{ form.tax ? 15 : 0 }} %</span>
          </div>
        </div>

        <div class="flex justify-between items-center mb-6">
          <span class="text-base font-semibold text-gray-900 dark:text-white">Total</span>
          <span class="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >C$ {{ totalOrder ?? 0 }}</span
          >
        </div>
        <p class="text-red-500">{{ errorForm.order }}</p>
        <div class="space-y-2">
          <button
            class="w-full rounded-full bg-brand-500 hover:bg-brand-600 px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @click.prevent="handleSubmit"
          >
            Guardar compra
          </button>
          <button
            type="button"
            class="w-full rounded-full border border-gray-300 px-5 py-2.5 text-center font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            @click="() => router.back()"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
    <DrawerComponent
      :open="isDrawerOpen"
      @update:open="isDrawerOpen = $event"
      title="Buscar Producto"
      description="Ajusta vencimiento, cantidad y descuento de cada producto antes de agregarlo."
      size="medium"
    >
      <template #default>
        <ProductSearchDrawer
          @selected:product="handleProductSelected"
          @add:product="handleProductAdded"
        />
      </template>
    </DrawerComponent>
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
