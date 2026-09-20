<script setup lang="ts">
import { ref } from 'vue'
import SelectSearch from '@/components/common/SelectSearch.vue'

const availabilityOptions = [
  { id: 'available', name: 'Disponible' },
  { id: 'out_of_stock', name: 'Agotado' },
  { id: 'low', name: 'Bajo' },
]

const type = ref<string | number | null>(null)
const usage = ref<string | number | null>(null)
const laboratory = ref<string | number | null>(null)
const availability = ref<string | number | null>(null)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label class="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          Tipo
        </label>
        <SelectSearch
          v-model="type"
          :options="[]"
          size="md"
          placeholder="Seleccione el tipo"
          search-placeholder="Buscar tipo..."
          label="name"
          track-by="id"
        />
      </div>
      <div>
        <label class="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          Uso
        </label>
        <SelectSearch
          v-model="usage"
          :options="[]"
          size="md"
          placeholder="Seleccione el uso"
          search-placeholder="Buscar uso..."
          label="name"
          track-by="id"
        />
      </div>
      <div>
        <label class="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          Laboratorio
        </label>
        <SelectSearch
          v-model="laboratory"
          :options="[]"
          size="md"
          placeholder="Seleccione el laboratorio"
          search-placeholder="Buscar laboratorio..."
          label="name"
          track-by="id"
        />
      </div>
      <div>
        <label class="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          Disponibilidad
        </label>
        <SelectSearch
          v-model="availability"
          :options="availabilityOptions"
          size="md"
          placeholder="Seleccione la disponibilidad"
          search-placeholder="Buscar disponibilidad..."
          label="name"
          track-by="id"
        />
      </div>
    </div>
    <div class="flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
      <button
        type="button"
        class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
      >
        Limpiar
      </button>
      <button
        type="button"
        class="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
      >
        Aplicar
      </button>
    </div>
  </div>
</template>

<style scoped></style>
