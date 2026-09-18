<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
</script>

<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <!-- Header -->
    <div class="col-span-12">
      <RouterLink
        to="/products"
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
    <div class="col-span-12">
      <div
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark"
      >
        <h2
          class="mb-5 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
        >
          Identificación
        </h2>
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Código <span class="text-error-500">*</span>
            </label>
            <input
              type="text"
              placeholder="00000X"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
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
              type="text"
              placeholder="Nombre del producto"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Precios -->
    <div class="col-span-12">
      <div
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark"
      >
        <h2
          class="mb-5 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
        >
          Precios
        </h2>
        <div class="grid gap-5 sm:grid-cols-3">
          <div>
            <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Precio venta (C$) <span class="text-error-500">*</span>
            </label>
            <input
              type="number"
              value="0"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
            />
          </div>
          <div>
            <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Precio compra (C$)
            </label>
            <input
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
              type="number"
              value="0"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Clasificación e inventario -->
    <div class="col-span-12">
      <div
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark"
      >
        <h2
          class="mb-5 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
        >
          Clasificación e inventario
        </h2>
        <div class="grid gap-5 sm:grid-cols-3">
          <div>
            <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Proveedor
            </label>
            <div class="relative">
              <select
                class="block w-full appearance-none rounded-full border border-gray-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option disabled selected>Seleccione el proveedor</option>
              </select>
              <AppIcon
                name="chevron-down"
                class="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Laboratorio
            </label>
            <div class="relative">
              <select
                class="block w-full appearance-none rounded-full border border-gray-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option disabled selected>Seleccione el laboratorio</option>
              </select>
              <AppIcon
                name="chevron-down"
                class="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Presentación
            </label>
            <div class="relative">
              <select
                class="block w-full appearance-none rounded-full border border-gray-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option disabled selected>Seleccione la presentación</option>
              </select>
              <AppIcon
                name="chevron-down"
                class="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
            </div>
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
            <div class="relative">
              <select
                class="block w-full appearance-none rounded-full border border-gray-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option disabled selected>Seleccione la ubicación</option>
              </select>
              <AppIcon
                name="chevron-down"
                class="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Tipo
            </label>
            <div class="relative">
              <select
                class="block w-full appearance-none rounded-full border border-gray-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option disabled selected>Seleccione el tipo</option>
              </select>
              <AppIcon
                name="chevron-down"
                class="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Unidades en caja
            </label>
            <input
              type="number"
              value="0"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
            />
          </div>
        </div>

        <hr class="my-6 border-t border-gray-200 dark:border-gray-800" />

        <div>
          <h3 class="mb-3 text-sm font-medium text-gray-800 dark:text-white/90">Usos</h3>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="rounded-full border border-gray-300 px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Analgésico
            </button>
            <button
              type="button"
              class="rounded-full border border-gray-300 px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Antibiótico
            </button>
            <button
              type="button"
              class="rounded-full border border-gray-300 px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Antihistamínico
            </button>
            <button
              type="button"
              class="rounded-full border border-gray-300 px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Gastro
            </button>
            <button
              type="button"
              class="rounded-full border border-gray-300 px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Hidratación
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones -->
    <div class="col-span-12 flex items-center justify-end gap-3">
      <button
        type="button"
        class="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
      >
        Cancelar
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
      >
        <AppIcon name="download" class="h-4 w-4" />
        Guardar producto
      </button>
    </div>
  </div>
</template>

<style scoped></style>
