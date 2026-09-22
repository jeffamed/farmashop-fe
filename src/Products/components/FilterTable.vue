<script setup lang="ts">
import { ref } from 'vue'
import SelectSearch from '@/components/common/SelectSearch.vue'
import { useOptionsSearch } from '@/Products/composables/useOptionsSearch.ts'
import type { MoreFilter } from '@/Products/types/Product.ts'

const emit = defineEmits<{
  filter_availability: [filters: MoreFilter]
}>();

const { search: searchType, options: typeProducts } = useOptionsSearch('types')
const { search: searchUsage, options: usages } = useOptionsSearch('usages')
const { search: searchLaboratory, options: laboratories } = useOptionsSearch('laboratories')

const availabilityOptions = [
  { id: 'available', name: 'Disponible' },
  { id: 'low', name: 'Bajo' },
  { id: 'out_of_stock', name: 'Agotado' },
]

const searchAvailability = ref('')

const filters = ref<MoreFilter>({
  type: null,
  usage: null,
  laboratory: null,
  availability: null,
})

const sendFilter = () => {
  emit('filter_availability', filters.value)
}

const clearFilters = () => {
  filters.value = {
    type: null,
    usage: null,
    laboratory: null,
    availability: null,
  }
  emit('filter_availability', filters.value)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label class="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          Tipo
        </label>
        <SelectSearch
          v-model="filters.type"
          v-model:search="searchType"
          :options="typeProducts"
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
          v-model="filters.usage"
          v-model:search="searchUsage"
          :options="usages"
          size="md"
          placeholder="Seleccione el uso"
          search-placeholder="Buscar uso..."
          label="description"
          track-by="id"
        />
      </div>
      <div>
        <label class="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
          Laboratorio
        </label>
        <SelectSearch
          v-model="filters.laboratory"
          v-model:search="searchLaboratory"
          :options="laboratories"
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
          v-model="filters.availability"
          v-model:search="searchAvailability"
          :options="availabilityOptions"
          size="md"
          placeholder="Seleccione la disponibilidad"
          search-placeholder="Buscar disponibilidad..."
          label="name"
          track-by="id"
        />
      </div>
    </div>
    <div
      class="flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-800"
    >
      <button
        type="button"
        class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        @click.prevent="clearFilters"
      >
        Limpiar
      </button>
      <button
        type="button"
        class="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        @click="sendFilter"
      >
        Aplicar
      </button>
    </div>
  </div>
</template>

<style scoped></style>
