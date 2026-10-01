<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import router from '@/router'
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <RouterLink
          :to="{ name: 'orders' }"
          class="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-400 uppercase hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <AppIcon name="chevron-right" class="h-3.5 w-3.5 rotate-180" />
          Almacén / Compras
        </RouterLink>
        <h1 class="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white/90">
          Detalle de compra
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Información de la factura, proveedor y productos recibidos.
        </p>
      </div>
      <div class="px-3 py-1 rounded-full bg-green-500/10 dark:bg-green-500/20">
        <span class="text-sm font-semibold text-green-600 dark:text-green-400">Recibida</span>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Order Details -->
      <div class="col-span-1 lg:col-span-2 space-y-6">
        <!-- Order Summary Card -->
        <div class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <p class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase mb-2">Compra Registrada</p>
              <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CMP-2026-0048</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">Factura FAC-004821</p>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
              <AppIcon name="clipboard" class="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4">
            <div>
              <p class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2">Referencia</p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white"># 48</p>
            </div>
            <div>
              <p class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <AppIcon name="calender" class="h-3.5 w-3.5" />
                Fecha
              </p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">01 oct 2026</p>
            </div>
            <div>
              <p class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <AppIcon name="user-circle" class="h-3.5 w-3.5" />
                Registrada por
              </p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">Yefry Moraga</p>
            </div>
            <div>
              <p class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <AppIcon name="box" class="h-3.5 w-3.5" />
                Productos
              </p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">2 líneas</p>
            </div>
          </div>
        </div>

        <!-- Supplier Information -->
        <div class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6">
          <div class="flex items-start gap-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 dark:bg-green-500/20">
              <AppIcon name="truck" class="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Información del proveedor</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Datos asociados a esta compra.</p>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <AppIcon name="building" class="h-3.5 w-3.5" />
                Proveedor
              </p>
              <p class="text-base font-semibold text-gray-900 dark:text-white">Distribuidora Central</p>
            </div>
            <div>
              <p class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <AppIcon name="docs" class="h-3.5 w-3.5" />
                R.U.C.
              </p>
              <p class="text-base font-semibold text-gray-900 dark:text-white">J0310000123456</p>
            </div>
            <div>
              <p class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <AppIcon name="phone" class="h-3.5 w-3.5" />
                Teléfono
              </p>
              <p class="text-base font-semibold text-gray-900 dark:text-white">+505 2255 0140</p>
            </div>
            <div>
              <p class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <AppIcon name="location-pin" class="h-3.5 w-3.5" />
                Dirección
              </p>
              <p class="text-base font-semibold text-gray-900 dark:text-white">Reparto San Juan, Managua</p>
            </div>
          </div>
        </div>

        <!-- Products Section -->
        <div class="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Productos de la compra</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Detalle de cantidades, descuentos y vencimientos.</p>
            </div>
            <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th class="px-3 py-3 text-left font-medium text-gray-700 dark:text-gray-300">PRODUCTO</th>
                  <th class="px-3 py-3 text-left font-medium text-gray-700 dark:text-gray-300">EXPIRACIÓN</th>
                  <th class="px-3 py-3 text-center font-medium text-gray-700 dark:text-gray-300">CANTIDAD</th>
                  <th class="px-3 py-3 text-right font-medium text-gray-700 dark:text-gray-300">PRECIO</th>
                  <th class="px-3 py-3 text-right font-medium text-gray-700 dark:text-gray-300">DESCUENTO</th>
                  <th class="px-3 py-3 text-right font-medium text-gray-700 dark:text-gray-300">TOTAL</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr class="hover:bg-white/5 dark:hover:bg-white/10">
                  <td class="px-3 py-3">
                    <div class="flex items-center gap-3">
                      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                        <span class="text-xs font-bold text-gray-600 dark:text-gray-400">IMG</span>
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-white">Acetaminofén 500mg</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">PRD-1042 · Tableta</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-3 py-3 text-gray-600 dark:text-gray-400">31 dic 2027</td>
                  <td class="px-3 py-3 text-center text-gray-600 dark:text-gray-400">24</td>
                  <td class="px-3 py-3 text-right text-gray-600 dark:text-gray-400">C$ 8.50</td>
                  <td class="px-3 py-3 text-right text-gray-600 dark:text-gray-400">0%</td>
                  <td class="px-3 py-3 text-right font-medium text-gray-900 dark:text-white">C$ 204.00</td>
                </tr>
                <tr class="hover:bg-white/5 dark:hover:bg-white/10">
                  <td class="px-3 py-3">
                    <div class="flex items-center gap-3">
                      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                        <span class="text-xs font-bold text-gray-600 dark:text-gray-400">IMG</span>
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-white">Loratadina 10mg</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">PRD-1045 · Tableta</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-3 py-3 text-gray-600 dark:text-gray-400">30 oct 2027</td>
                  <td class="px-3 py-3 text-center text-gray-600 dark:text-gray-400">12</td>
                  <td class="px-3 py-3 text-right text-gray-600 dark:text-gray-400">C$ 12.25</td>
                  <td class="px-3 py-3 text-right text-gray-600 dark:text-gray-400">5%</td>
                  <td class="px-3 py-3 text-right font-medium text-gray-900 dark:text-white">C$ 139.65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Back Button -->
        <button
          @click="() => router.back()"
          class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          <AppIcon name="chevron-right" class="h-4 w-4 rotate-180" />
          Regresar al listado
        </button>
      </div>

      <!-- Right Column - Summary -->
      <div class="col-span-1 lg:col-span-1">
        <div class="sticky top-6 rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resumen Financiero</h3>

          <div class="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="font-medium text-gray-900 dark:text-white">C$ 343.65</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Impuesto (15%)</span>
              <span class="font-medium text-gray-900 dark:text-white">C$ 51.55</span>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-base font-semibold text-gray-900 dark:text-white">Total</span>
            <div class="flex items-center gap-2">
              <AppIcon name="current-dollar" class="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">C$ 395.20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
