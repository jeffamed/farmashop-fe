<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef'

interface Props {
  columns: string[]
  fieldOptions?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  fieldOptions: () => [],
})

const emit = defineEmits<{
  filter: [field: string, search: string]
}>()

const selectedField = ref('')
const search = ref('')
const fieldDropdownOpen = ref(false)
const fieldDropdownRef = ref<HTMLElement | null>(null)
const debouncedSearch = useDebouncedRef(search)

const toggleFieldDropdown = () => {
  fieldDropdownOpen.value = !fieldDropdownOpen.value
}

const selectField = (field: string) => {
  selectedField.value = field
  fieldDropdownOpen.value = false
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
      selectedField.value = options[0] ?? ''
    }
  },
  {
    immediate: true,
  },
)

watch([debouncedSearch, selectedField], ([search, field]) => {
  if (search !== '') {
    console.info('Emit filter:', field, search)
    emit('filter', field, search)
  }
})

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
          {{ selectedField }}
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
            :key="field"
            type="button"
            class="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium"
            :class="
              field === selectedField
                ? 'bg-brand-500 text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
            "
            @click="selectField(field)"
          >
            {{ field }}
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

      <button
        v-if="false"
        type="button"
        class="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        Filtros
      </button>
    </div>

    <!-- Table -->
    <!--<div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <th
              class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Producto
            </th>
            <th
              class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Laboratorio
            </th>
            <th
              class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Categoría
            </th>
            <th
              class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Precio
            </th>
            <th
              class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Estado
            </th>
            <th
              class="whitespace-nowrap px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Opciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
          <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <p class="font-medium text-gray-800 dark:text-white/90">Acetaminofén 500mg</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1042</p>
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Lab Génesis
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Analgésicos
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
            >
              C$ 12.50
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <span
                class="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500"
              >
                Disponible · 240
              </span>
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <div class="flex items-center justify-end gap-1">
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span class="sr-only">Editar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="trash" class="h-4 w-4" />
                  <span class="sr-only">Eliminar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="horizontal-dots" class="h-4 w-4" />
                  <span class="sr-only">Más opciones</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <p class="font-medium text-gray-800 dark:text-white/90">Amoxicilina 250mg susp.</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1043</p>
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              FarmaNova
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Antibióticos
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
            >
              C$ 45.00
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <span
                class="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-500"
              >
                Stock bajo · 18
              </span>
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <div class="flex items-center justify-end gap-1">
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span class="sr-only">Editar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="trash" class="h-4 w-4" />
                  <span class="sr-only">Eliminar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="horizontal-dots" class="h-4 w-4" />
                  <span class="sr-only">Más opciones</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <p class="font-medium text-gray-800 dark:text-white/90">Ibuprofeno 400mg</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1044</p>
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Lab Génesis
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Analgésicos
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
            >
              C$ 22.75
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <span
                class="inline-flex items-center rounded-full bg-error-50 px-2.5 py-1 text-xs font-medium text-error-700 dark:bg-error-500/15 dark:text-error-500"
              >
                Agotado · 0
              </span>
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <div class="flex items-center justify-end gap-1">
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span class="sr-only">Editar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="trash" class="h-4 w-4" />
                  <span class="sr-only">Eliminar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="horizontal-dots" class="h-4 w-4" />
                  <span class="sr-only">Más opciones</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <p class="font-medium text-gray-800 dark:text-white/90">Loratadina 10mg</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1045</p>
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Vitalis
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Antihistamínicos
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
            >
              C$ 18.90
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <span
                class="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500"
              >
                Disponible · 96
              </span>
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <div class="flex items-center justify-end gap-1">
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span class="sr-only">Editar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="trash" class="h-4 w-4" />
                  <span class="sr-only">Eliminar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="horizontal-dots" class="h-4 w-4" />
                  <span class="sr-only">Más opciones</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <p class="font-medium text-gray-800 dark:text-white/90">Omeprazol 20mg</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1046</p>
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              FarmaNova
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Gastro
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
            >
              C$ 34.40
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <span
                class="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-500"
              >
                Stock bajo · 7
              </span>
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <div class="flex items-center justify-end gap-1">
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span class="sr-only">Editar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="trash" class="h-4 w-4" />
                  <span class="sr-only">Eliminar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="horizontal-dots" class="h-4 w-4" />
                  <span class="sr-only">Más opciones</span>
                </button>
              </div>
            </td>
          </tr>
          <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <p class="font-medium text-gray-800 dark:text-white/90">Suero oral 500ml</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1047</p>
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Hidralab
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
            >
              Hidratación
            </td>
            <td
              class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
            >
              C$ 9.99
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <span
                class="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500"
              >
                Disponible · 310
              </span>
            </td>
            <td class="whitespace-nowrap px-5 py-4 sm:px-6">
              <div class="flex items-center justify-end gap-1">
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span class="sr-only">Editar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="trash" class="h-4 w-4" />
                  <span class="sr-only">Eliminar</span>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <AppIcon name="horizontal-dots" class="h-4 w-4" />
                  <span class="sr-only">Más opciones</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>-->

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-800" >
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
      <span class="text-sm text-gray-500 dark:text-gray-400">Mostrando 1–6 de 6</span>
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5"
        >
          <AppIcon name="chevron-right" class="h-4 w-4 rotate-180" />
          <span class="sr-only">Anterior</span>
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-sm font-medium text-white"
        >
          1
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5"
        >
          2
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5"
        >
          <AppIcon name="chevron-right" class="h-4 w-4" />
          <span class="sr-only">Siguiente</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
