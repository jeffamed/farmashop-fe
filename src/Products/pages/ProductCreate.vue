<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import router from '@/router'
import type { ProductForm } from '@/Products/types/Product.ts'
import { ref } from 'vue'
import CardContent from '@/components/common/CardContent.vue'
import SelectSearch from '@/components/common/SelectSearch.vue'
import { useProduct } from '@/Products/composables/useProduct.ts'
import { useOptionsSearch } from '@/Products/composables/useOptionsSearch.ts'

const { createProduct } = useProduct()
const { search: searchSupplier, options: suppliers } = useOptionsSearch('suppliers')
const { search: searchLaboratory, options: laboratories } = useOptionsSearch('laboratories')
const { search: searchPresentation, options: presentations } = useOptionsSearch('presentations')
const { search: searchLocation, options: locations } = useOptionsSearch('locations')
const { search: searchType, options: typeProducts } = useOptionsSearch('types')
const { search: searchUsage, options: usages } = useOptionsSearch('usages')

const form = ref<ProductForm>({
  code: '',
  name: '',
  unit_price: 0,
  cost: 0,
  discount: 0,
  supplier_id: 0,
  laboratory_id: 0,
  presentation_id: 0,
  location_id: 0,
  unit_box: 0,
  type_id: 0,
  usages: [],
})

const saveProduct = () => {
  createProduct.mutate(form.value)
}
</script>

<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <!-- Header -->
    <div class="col-span-12">
      <RouterLink
        :to="{ name: 'products' }"
        class="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-400 uppercase hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      >
        <AppIcon name="chevron-right" class="h-3.5 w-3.5 rotate-180" />
        Almacén / Productos
      </RouterLink>
      <h1 class="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white/90">
        Registrar producto
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Completa la información comercial y de inventario. Los campos con
        <span class="text-error-500">*</span> son obligatorios.
      </p>
    </div>

    <!-- Identificación -->
    <CardContent title="Identificación">
      <div>
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Código
        </label>
        <input
          type="text"
          placeholder="00000X"
          class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          v-model="form.code"
        />
        <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">
          Se genera automáticamente si lo dejas vacío.
        </p>
      </div>
      <div>
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Nombre <span class="text-error-500">*</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Nombre del producto"
          class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
        />
      </div>
    </CardContent>

    <!-- Precios -->
    <CardContent title="Precios" classBody="grid gap-5 sm:grid-cols-3">
      <div>
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Precio venta (C$) <span class="text-error-500">*</span>
        </label>
        <input
          v-model="form.unit_price"
          type="number"
          value="0"
          min="0"
          class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
        />
      </div>
      <div>
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Precio compra (C$)
        </label>
        <input
          v-model="form.cost"
          type="number"
          value="0"
          class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
        />
      </div>
      <div>
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Descuento (%)
        </label>
        <input
          v-model="form.discount"
          type="number"
          value="0"
          class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
        />
      </div>
    </CardContent>

    <!-- Clasificación e inventario -->
    <CardContent title="Clasificación e inventario" classBody="">
      <div class="grid gap-5 sm:grid-cols-3">
        <div>
          <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
            Proveedor
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
          <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
            Laboratorio
          </label>
          <SelectSearch
            v-model="form.laboratory_id"
            v-model:search="searchLaboratory"
            :options="laboratories"
            placeholder="Seleccione el laboratorio"
            search-placeholder="Buscar laboratorio..."
            label="name"
            track-by="id"
          />
        </div>
        <div>
          <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
            Presentación
          </label>
          <SelectSearch
            v-model="form.presentation_id"
            v-model:search="searchPresentation"
            :options="presentations"
            placeholder="Seleccione la presentación"
            search-placeholder="Buscar presentación..."
            label="name"
            track-by="id"
          />
        </div>
      </div>
      <div class="mt-5 grid gap-5 sm:grid-cols-3">
        <div>
          <div class="mb-2.5 flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-800 dark:text-white/90">
              Ubicación
            </label>
            <button
              type="button"
              class="inline-flex items-center gap-1 text-xs font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
            >
              <AppIcon name="plus" class="h-3 w-3" />
              Nueva
            </button>
          </div>
          <SelectSearch
            v-model="form.location_id"
            v-model:search="searchLocation"
            :options="locations"
            placeholder="Seleccione la ubicación"
            search-placeholder="Buscar ubicación..."
            label="name"
            track-by="id"
          />
        </div>
        <div>
          <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
            Tipo
          </label>
          <SelectSearch
            v-model="form.type_id"
            v-model:search="searchType"
            :options="typeProducts"
            placeholder="Seleccione el tipo"
            search-placeholder="Buscar tipo..."
            label="name"
            track-by="id"
          />
        </div>
        <div>
          <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
            Unidades en caja
          </label>
          <input
            v-model="form.unit_box"
            type="number"
            value="0"
            min="0"
            class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          />
        </div>
      </div>
      <hr class="my-6 border-t border-gray-200 dark:border-gray-800" />
      <div>
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Usos
        </label>
        <SelectSearch
          v-model="form.usages"
          v-model:search="searchUsage"
          :options="usages"
          :multiple="true"
          placeholder="Seleccione los usos"
          search-placeholder="Buscar uso..."
          label="description"
          track-by="id"
          helper-text="Escribe para buscar y selecciona uno o varios."
        />
      </div>
    </CardContent>

    <!-- Acciones -->
    <div class="col-span-12 flex items-center justify-end gap-3">
      <button
        type="button"
        class="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        @click="() => router.back()"
      >
        Cancelar
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
        @click.prevent="saveProduct"
      >
        <AppIcon name="download" class="h-4 w-4" />
        Guardar producto
      </button>
    </div>
  </div>
</template>

<style scoped></style>
