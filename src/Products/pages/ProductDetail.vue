<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import { useProduct } from '@/Products/composables/useProduct.ts'

const { productDetail } = useProduct()
const { data: product } = productDetail
</script>

<template>
  <div v-if="productDetail.isPending.value">
    <h3>Cargando...</h3>
  </div>

  <div v-else-if="product" class="grid grid-cols-12 gap-4 md:gap-6">
    <!-- Header -->
    <div class="col-span-12">
      <Breadcrumbs
        :parent-path="{ name: 'Productos', root: '/products' }"
        :current-path="{ name: 'Detalle del producto', root: '/products' }"
      />
      <div class="flex justify-between items-start mt-2">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white/90">
            Detalle del producto
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Información completa para revisar inventario, precios y origen.
          </p>
        </div>
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
        >
          <AppIcon name="edit" :size="20" /> Editar producto
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-8 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-dark mb-8"
    >
      <!-- Left Side - Image & Quick Stats -->
      <div class="flex flex-col gap-6">
        <div
          class="bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden aspect-square flex items-center justify-center"
        >
          <img :src="product.image" alt="Producto" class="w-full h-full object-contain" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-3"
          >
            <AppIcon name="price-tag" :size="24" class="opacity-70" />
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Venta</div>
              <div class="text-xl font-bold text-gray-800 dark:text-white/90">
                C$ {{ product.unit_price }}
              </div>
            </div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-3"
          >
            <AppIcon name="box" :size="24" class="opacity-70" />
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Stock</div>
              <div class="text-xl font-bold text-gray-800 dark:text-white/90">
                {{ product.stock }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Details -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Status Badges & Margin -->
        <div class="flex justify-between items-start">
          <div class="flex gap-3">
            <span
              class="px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
              >Disponible</span
            >
            <span
              class="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400"
              >{{ product.type }}</span
            >
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
              Margen estimado
            </div>
            <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">47.1%</div>
          </div>
        </div>

        <!-- Product Title & ID -->
        <div class="border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white/90 mb-2">
            {{ product.name }}
          </h2>
          <div class="text-gray-600 dark:text-gray-400">#{{ product.code }}</div>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <AppIcon name="price-tag" :size="24" class="mb-3 opacity-60" />
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
              Precio de venta
            </div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white/90">
              C$ {{ product.unit_price }}
            </div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <AppIcon name="price-tag" :size="24" class="mb-3 opacity-60" />
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
              Precio de compra
            </div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white/90">
              C$ {{ product.cost }}
            </div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <AppIcon name="presentation" :size="24" class="mb-3 opacity-60" />
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
              Presentación
            </div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white/90">
              {{ product.presentation }}
            </div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <AppIcon name="calendar-2-line" :size="24" class="mb-3 opacity-60" />
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
              Expiración
            </div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white/90">31 dic 2027</div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <AppIcon name="location-pin" :size="24" class="mb-3 opacity-60" />
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
              Ubicación
            </div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white/90">Estante A1</div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <AppIcon name="pill" :size="24" class="mb-3 opacity-60" />
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
              Tipo
            </div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white/90">Genérico</div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <AppIcon name="box" :size="24" class="mb-3 opacity-60" />
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
              Unidades por caja
            </div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white/90">20</div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <AppIcon name="gift" :size="24" class="mb-3 opacity-60" />
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
              Descuento
            </div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white/90">0%</div>
          </div>
        </div>

        <!-- Inventory Level -->
        <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white/90">Nivel de inventario</h3>
            <div class="text-lg font-bold text-gray-800 dark:text-white/90">240 unidades</div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Mínimo recomendado: 40 unidades
          </p>
          <div class="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div class="w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-400"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Info Sections -->
    <div class="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-dark"
      >
        <AppIcon name="truck" :size="24" class="mb-4 opacity-70" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white/90 mb-4">
          Información del proveedor
        </h3>
        <div class="space-y-4">
          <div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">
              R.U.C.
            </div>
            <div class="text-gray-900 dark:text-white font-medium">J03100001234567</div>
          </div>
          <div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">
              NOMBRE
            </div>
            <div class="text-gray-900 dark:text-white font-medium">Distribuidora Central</div>
          </div>
          <div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">
              TELÉFONO
            </div>
            <div class="text-gray-900 dark:text-white font-medium">+505 2255 0140</div>
          </div>
          <div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">
              DIRECCIÓN
            </div>
            <div class="text-gray-900 dark:text-white font-medium">Reparto San Juan, Managua</div>
          </div>
        </div>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-dark"
      >
        <AppIcon name="building" :size="24" class="mb-4 opacity-70" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white/90 mb-4">
          Información del laboratorio
        </h3>
        <div class="space-y-4">
          <div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">
              NOMBRE
            </div>
            <div class="text-gray-900 dark:text-white font-medium">Lab Génesis</div>
          </div>
          <div>
            <div class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">
              DIRECCIÓN
            </div>
            <div class="text-gray-900 dark:text-white font-medium">
              Km 8.5 Carretera Norte, Managua
            </div>
          </div>
        </div>
      </div>

      <div
        class="lg:col-span-2 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-dark"
      >
        <AppIcon name="task" :size="24" class="mb-4 opacity-70" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white/90 mb-4">Usos del producto</h3>
        <div class="flex gap-4">
          <span
            class="px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 font-semibold"
            >Dolor</span
          >
          <span
            class="px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 font-semibold"
            >Fiebre</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
