<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import router from '@/router'
import type { ProductForm } from '@/Products/types/Product.ts'
import { ref } from 'vue'
import CardContent from '@/components/common/CardContent.vue'
import SelectSearch from '@/components/common/SelectSearch.vue'
import { useProduct } from '@/Products/composables/useProduct.ts'
import { useOptionsSearch } from '@/Products/composables/useOptionsSearch.ts'
import DrawerComponent from '@/components/common/DrawerComponent.vue'
import { push } from 'notivue'
import type { ValidateErrorResponse } from '@/types/ErrorResponse.ts'
import AppUploader from '@/components/common/AppUploader.vue'
import AppTooltip from '@/components/common/AppTooltip.vue'
import DrawerForm from '@/Products/components/DrawerForm.vue'

const { createProduct } = useProduct()
const { search: searchSupplier, options: suppliers } = useOptionsSearch('suppliers')
const { search: searchLaboratory, options: laboratories } = useOptionsSearch('laboratories')
const { search: searchPresentation, options: presentations } = useOptionsSearch('presentations')
const { search: searchLocation, options: locations } = useOptionsSearch('locations')
const { search: searchType, options: typeProducts } = useOptionsSearch('types')
const { search: searchUsage, options: usages } = useOptionsSearch('usages')

const errorForm = ref<ValidateErrorResponse | null>(null)

const form = ref<ProductForm>({
  code: '',
  name: '',
  price: 0,
  cost: 0,
  stock: 0,
  discount: 0,
  supplier_id: 0,
  laboratory_id: 0,
  presentation_id: 0,
  location_id: 0,
  unit_box: 0,
  type_id: 0,
  usages: [],
  images: [],
})

const isDrawerOpen = ref(false)

const saveProduct = () => {
  createProduct.mutate(form.value, {
    onSuccess: () => {
      push.success('Producto creado correctamente')
      router.push({ name: 'products' })
    },
    onError: (e) => {
      errorForm.value = e?.response?.data ?? null
    },
  })
}

const errorMessage = (input: string) => {
  const errorsValue = errorForm.value
  if (errorsValue && errorsValue.errors) {
    return errorsValue?.errors[input]?.toString() ?? ''
  }
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
        <p v-show="errorForm && errorForm.errors.name" class="text-red-500">
          <span>{{ errorMessage('name') }}</span>
        </p>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
            Imagen del producto
          </label>
          <AppTooltip content="Solo se permite 1 imagen" />
        </div>
        <AppUploader
          @files-change="form.images = $event"
          :max-files="1"
          :allowed-file-types="['image/jpeg', 'image/png', 'image/webp']"
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
          v-model="form.price"
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
      <template #btnAction>
        <button
          class="inline-flex items-center justify-center text-white bg-brand-500 border border-transparent hover:bg-brand-600 focus:ring-4 focus:ring-brand-500/10 shadow-sm font-medium rounded-full text-sm px-4 py-2.5 focus:outline-none"
          type="button"
          @click="isDrawerOpen = true"
        >
          <AppIcon name="plus" />
        </button>
      </template>
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
          <p v-show="errorForm && errorForm.errors.supplier_id" class="text-red-500">
            <span>{{ errorMessage('supplier_id') }}</span>
          </p>
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
          <p v-show="errorForm && errorForm.errors.laboratory_id" class="text-red-500">
            <span>{{ errorMessage('laboratory_id') }}</span>
          </p>
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
          <p v-show="errorForm && errorForm.errors.presentation_id" class="text-red-500">
            <span>{{ errorMessage('presentation_id') }}</span>
          </p>
        </div>
      </div>
      <div class="mt-5 grid gap-5 sm:grid-cols-3">
        <div>
          <div class="mb-2.5 flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-800 dark:text-white/90">
              Ubicación
            </label>
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
          <p v-show="errorForm && errorForm.errors.location_id" class="text-red-500">
            <span>{{ errorMessage('location_id') }}</span>
          </p>
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
          <p v-show="errorForm && errorForm.errors.type_id" class="text-red-500">
            <span>{{ errorMessage('type_id') }}</span>
          </p>
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
          <p v-show="errorForm && errorForm.errors.unit_box" class="text-red-500">
            <span>{{ errorMessage('unit_box') }}</span>
          </p>
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
    <p v-if="errorForm && !errorForm.hasOwnProperty('errors')"><small>{{ errorForm.message }}</small></p>
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
    <DrawerComponent :open="isDrawerOpen" @update:open="isDrawerOpen = $event" title="Crear registro">
      <template #default>
        <DrawerForm />
      </template>
    </DrawerComponent>
  </div>
</template>

<style scoped></style>
<style src="@uppy/vue/css/style.css"></style>
<style src="@uppy/vue/css/image-editor.css"></style>
