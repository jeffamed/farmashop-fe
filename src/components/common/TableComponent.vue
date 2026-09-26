<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef'
import type { Meta } from '@/types/Response.ts'
type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | null
interface FilterSearch {
  input: string
  search: string
  page: number
  moreFilter?: Record<string, FilterValue>
}

interface FieldOption {
  value: string
  label: string
}

interface Props {
  columns: string[]
  fieldOptions?: FieldOption[]
  filterSearch: FilterSearch
  pagination?: Meta
  activeMoreFilter?: boolean
  moreFilter?: Record<string, FilterValue>
}

const props = withDefaults(defineProps<Props>(), {
  fieldOptions: () => [],
  activeMoreFilter: false,
})

const emit = defineEmits<{
  'update:filterSearch': [filter: FilterSearch]
}>()

const selectedField = ref('')
const search = ref('')
const fieldDropdownOpen = ref(false)
const fieldDropdownRef = ref<HTMLElement | null>(null)
const moreFilterDropdownOpen = ref(false)
const debouncedSearch = useDebouncedRef(search)
const newPage = ref<number>(1)

const selectedFieldLabel = computed(
  () => props.fieldOptions.find((field) => field.value === selectedField.value)?.label ?? '',
)

const toggleFieldDropdown = () => {
  fieldDropdownOpen.value = !fieldDropdownOpen.value
}

const selectField = (field: FieldOption) => {
  selectedField.value = field.value
  fieldDropdownOpen.value = false
}

const toggleMoreFilterDropdown = () => {
  moreFilterDropdownOpen.value = !moreFilterDropdownOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (fieldDropdownRef.value && !fieldDropdownRef.value.contains(event.target as Node)) {
    fieldDropdownOpen.value = false
  }
}

watch(
  () => props.fieldOptions,
  (options) => {
    if (options.length > 0) {
      selectedField.value = options[0]?.value ?? ''
    }
  },
  {
    immediate: true,
  },
)

watch(debouncedSearch, (search) => {
  emit('update:filterSearch', {
    input: selectedField.value,
    search,
    page: newPage.value,
    moreFilter: props.moreFilter,
  })
})

watch([selectedField, newPage], () => {
  emit('update:filterSearch', {
    input: selectedField.value,
    search: search.value,
    page: newPage.value,
    moreFilter: props.moreFilter,
  })
})

const pages = computed(() => {
  const lastPage = props.pagination?.last_page ?? 1
  const currentPage = props.pagination?.current_page ?? 1
  const range = 2

  const pagesArray: (number | string)[] = []
  const start = Math.max(1, currentPage - range)
  const end = Math.min(lastPage, currentPage + range)

  if (start > 1) {
    pagesArray.push(1)
    if (start > 2) {
      pagesArray.push('...')
    }
  }

  for (let i = start; i <= end; i++) {
    pagesArray.push(i)
  }

  if (end < lastPage) {
    if (end < lastPage - 1) {
      pagesArray.push('...')
    }
    pagesArray.push(lastPage)
  }

  return pagesArray
})

const nextPage = () => {
  if (props.pagination && props.pagination.current_page < props.pagination.last_page) {
    newPage.value = props.pagination.current_page + 1
  }
}
const prevPage = () => {
  if (props.pagination && props.pagination.current_page > 1) {
    newPage.value = props.pagination.current_page - 1
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark"
  >
    <!-- Toolbar -->
    <div
      class="flex flex-col gap-3 border-b border-gray-200 p-4 dark:border-gray-800 sm:flex-row sm:items-center sm:p-5"
    >
      <div v-if="props.fieldOptions.length > 0" ref="fieldDropdownRef" class="relative">
        <button
          type="button"
          class="flex h-11 w-full items-center justify-between gap-3 rounded-full border border-gray-300 bg-transparent px-4 text-sm font-medium text-gray-700 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:focus:border-brand-800 sm:w-auto"
          @click="toggleFieldDropdown"
        >
          {{ selectedFieldLabel }}
          <AppIcon
            name="chevron-down"
            class="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 dark:text-gray-400"
            :class="{ 'rotate-180': fieldDropdownOpen }"
          />
        </button>
        <div
          v-if="fieldDropdownOpen"
          class="absolute left-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white p-1.5 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <button
            v-for="field in fieldOptions"
            :key="field.value"
            type="button"
            class="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium"
            :class="
              field.value === selectedField
                ? 'bg-brand-500 text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
            "
            @click="selectField(field)"
          >
            {{ field.label }}
          </button>
        </div>
      </div>

      <div class="relative flex-1">
        <AppIcon
          name="search"
          class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="text"
          v-model="search"
          placeholder="Texto a buscar..."
          class="h-11 w-full rounded-full border border-gray-300 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
        />
      </div>

      <div v-if="activeMoreFilter" class="shrink-0">
        <button
          type="button"
          class="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors"
          :class="
            moreFilterDropdownOpen
              ? 'border-brand-300 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-400'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5'
          "
          @click="toggleMoreFilterDropdown"
        >
          <AppIcon name="filter" class="h-4 w-4 shrink-0" />
          Filtros
        </button>
      </div>
    </div>

    <div
      v-if="activeMoreFilter"
      class="relative z-30 grid transition-all duration-300 ease-in-out"
      :class="moreFilterDropdownOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div :class="moreFilterDropdownOpen ? 'overflow-visible' : 'overflow-hidden'">
        <div class="border-b border-gray-200 p-4 dark:border-gray-800 sm:p-5">
          <slot name="filters"></slot>
        </div>
      </div>
    </div>

    <div class="relative z-0 overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <th
              class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
              v-for="(column, idx) in columns"
              :key="idx"
            >
              {{ column }}
            </th>
            <th
              class="whitespace-nowrap px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Opciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
          <slot></slot>
        </tbody>
      </table>
    </div>

    <!-- Footer / pagination -->
    <div
      class="flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-800 sm:flex-row sm:px-6"
    >
      <span class="text-sm text-gray-500 dark:text-gray-400"
        >Mostrando {{ props.pagination?.from }} – {{ props.pagination?.to }} de
        {{ props.pagination?.total }}</span
      >
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5"
          :disabled="props.pagination?.current_page === 1"
          @click.prevent="prevPage"
        >
          <AppIcon name="chevron-right" class="h-4 w-4 rotate-180" />
          <span class="sr-only">Anterior</span>
        </button>
        <template v-for="(page, idx) in pages" :key="`${page}-${idx}`">
          <button
            v-if="typeof page === 'number'"
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
            :class="[
              page === props.pagination?.current_page
                ? 'bg-brand-500 text-white'
                : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5',
            ]"
            @click.prevent="newPage = page"
          >
            {{ page }}
          </button>
          <span v-else class="flex h-8 items-center px-2 text-gray-500 dark:text-gray-400">
            ...
          </span>
        </template>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5"
          :disabled="props.pagination?.current_page === props.pagination?.last_page"
          @click.prevent="nextPage"
        >
          <AppIcon name="chevron-right" class="h-4 w-4" />
          <span class="sr-only">Siguiente</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
