<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import router from '@/router'
import { ref } from 'vue'

const form = ref({
  invoice_number: '',
  supplier_id: 0,
  phone: '',
  address: '',
  product_code: '',
  product_name: '',
  stock: 0,
  expiration_date: '',
  quantity: 0,
  purchase_price: 0,
  sale_price: 0,
  discount: 0,
})
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
      <div class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6">
        <div class="flex items-start gap-3 mb-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
            <AppIcon name="building" class="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Información del proveedor</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Datos generales de la factura de compra.</p>
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
            <select class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none">
              <option selected disabled>Seleccione el proveedor</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Teléfono</label>
            <input
              v-model="form.phone"
              type="text"
              placeholder="Teléfono del proveedor"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Dirección</label>
            <input
              v-model="form.address"
              type="text"
              placeholder="Dirección del proveedor"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <!-- Product Information Section -->
      <div class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6">
        <div class="flex items-start gap-3 mb-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 dark:bg-green-500/20">
            <AppIcon name="box-cube" class="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Información del producto</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Selecciona y prepara un producto para la compra.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Código</label>
            <input
              v-model="form.product_code"
              type="text"
              placeholder="PRD-1042"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Producto</label>
            <input
              v-model="form.product_name"
              type="text"
              placeholder="Acetaminofén 500mg · Caja · 20 tabletas"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Stock actual</label>
            <input
              v-model="form.stock"
              type="number"
              placeholder="240"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        <hr class="my-5 border-t border-gray-200 dark:border-gray-800" />

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Fecha de vencimiento <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.expiration_date"
              type="date"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Precio compra (C$) <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.purchase_price"
              type="number"
              placeholder="8.5"
              step="0.01"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Precio venta (C$)</label>
            <input
              v-model="form.sale_price"
              type="number"
              placeholder="12.5"
              step="0.01"
              class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Descuento (%)</label>
          <input
            v-model="form.discount"
            type="number"
            placeholder="0"
            step="0.01"
            class="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <button class="w-full rounded-full bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-center gap-2">
          <AppIcon name="plus" class="h-4 w-4" />
          Agregar a la compra
        </button>
      </div>

      <!-- Added Products Section -->
      <div class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Productos agregados</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">1 productos preparados en esta compra</p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th class="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">PRODUCTO</th>
                <th class="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">VENCIMIENTO</th>
                <th class="px-3 py-2 text-center font-medium text-gray-700 dark:text-gray-300">CANTIDAD</th>
                <th class="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">PRECIO</th>
                <th class="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">TOTAL</th>
                <th class="px-3 py-2 text-center font-medium text-gray-700 dark:text-gray-300"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="hover:bg-white/5 dark:hover:bg-white/10">
                <td class="px-3 py-3">
                  <div class="font-medium text-gray-900 dark:text-white">Loratadina 10mg</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">PRD-1045 · Caja · 10 tabletas</div>
                </td>
                <td class="px-3 py-3 text-gray-600 dark:text-gray-400">2027-10-30</td>
                <td class="px-3 py-3 text-center text-gray-600 dark:text-gray-400">8</td>
                <td class="px-3 py-3 text-right text-gray-600 dark:text-gray-400">C$ 12.25</td>
                <td class="px-3 py-3 text-right font-medium text-gray-900 dark:text-white">C$ 98.00</td>
                <td class="px-3 py-3 text-center">
                  <button class="text-red-500 hover:text-red-700 dark:hover:text-red-400 focus:outline-none">
                    <AppIcon name="trash" class="h-4 w-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Right Column - Summary -->
    <div class="col-span-1 lg:col-span-1">
      <div class="sticky top-6 rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6">
        <div class="flex items-center gap-2 mb-6">
          <AppIcon name="shopping-cart" class="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Resumen de compra</h3>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">1 productos</p>

        <div class="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span class="font-medium text-gray-900 dark:text-white">C$ 98.00</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Descuentos</span>
            <span class="font-medium text-green-600 dark:text-green-400">C$ 0.00</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Impuestos</span>
            <span class="font-medium text-gray-900 dark:text-white">C$ 0.00</span>
          </div>
        </div>

        <div class="flex justify-between items-center mb-6">
          <span class="text-base font-semibold text-gray-900 dark:text-white">Total</span>
          <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">C$ 98.00</span>
        </div>

        <div class="space-y-2">
          <button class="w-full rounded-full bg-brand-500 hover:bg-brand-600 px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
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
  </div>
</template>

<style scoped></style>
