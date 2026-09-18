<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'

type OptionValue = string | number
type SelectOption = Record<string, any>
type SelectSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue?: OptionValue | OptionValue[] | null
  options: SelectOption[]
  multiple?: boolean
  placeholder?: string
  searchPlaceholder?: string
  label?: string
  trackBy?: string
  helperText?: string
  size?: SelectSize
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  multiple: false,
  placeholder: 'Seleccione una opción',
  searchPlaceholder: 'Buscar...',
  label: 'name',
  trackBy: 'id',
  helperText: 'Escribe para buscar y selecciona uno o varios.',
  size: 'md',
})

const sizeClasses = computed(() => {
  const sizes: Record<SelectSize, Record<string, string>> = {
    sm: {
      trigger: 'px-3 py-2 text-xs',
      triggerIcon: 'h-3.5 w-3.5',
      searchInput: 'py-1 pr-2 pl-8 text-xs',
      searchIcon: 'left-3 h-3.5 w-3.5',
      option: 'px-2.5 py-1.5 text-xs',
      optionCheck: 'h-3.5 w-3.5',
      optionCheckIcon: 'h-2 w-2',
      chip: 'py-0.5 pr-1.5 pl-2.5 text-[11px]',
      chipIcon: 'h-3.5 w-3.5',
      chipIconInner: 'h-2.5 w-2.5',
    },
    md: {
      trigger: 'px-4 py-3 text-sm',
      triggerIcon: 'h-4 w-4',
      searchInput: 'py-2 pr-2 pl-9 text-sm',
      searchIcon: 'left-3.5 h-4 w-4',
      option: 'px-3 py-2.5 text-sm',
      optionCheck: 'h-4 w-4',
      optionCheckIcon: 'h-2.5 w-2.5',
      chip: 'py-1 pr-2 pl-3 text-xs',
      chipIcon: 'h-4 w-4',
      chipIconInner: 'h-3 w-3',
    },
    lg: {
      trigger: 'px-5 py-3.5 text-base',
      triggerIcon: 'h-5 w-5',
      searchInput: 'py-2.5 pr-2 pl-10 text-base',
      searchIcon: 'left-4 h-5 w-5',
      option: 'px-4 py-3 text-base',
      optionCheck: 'h-5 w-5',
      optionCheckIcon: 'h-3 w-3',
      chip: 'py-1.5 pr-2.5 pl-3.5 text-sm',
      chipIcon: 'h-5 w-5',
      chipIconInner: 'h-3.5 w-3.5',
    },
  }
  return sizes[props.size]
})

const emit = defineEmits<{
  'update:modelValue': [value: OptionValue | OptionValue[] | null]
}>()

const isOpen = ref(false)
const search = ref('')
const rootRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

const selectedValues = computed<OptionValue[]>(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : []
  }
  return props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== ''
    ? [props.modelValue as OptionValue]
    : []
})

const selectedOptions = computed(() =>
  props.options.filter((option) => selectedValues.value.includes(option[props.trackBy])),
)

const filteredOptions = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return props.options
  return props.options.filter((option) =>
    String(option[props.label]).toLowerCase().includes(term),
  )
})

const hasSelection = computed(() => selectedOptions.value.length > 0)

const triggerLabel = computed(() => {
  if (props.multiple) {
    const count = selectedOptions.value.length
    return count ? `${count} seleccionado${count > 1 ? 's' : ''}` : props.placeholder
  }
  return selectedOptions.value[0]?.[props.label] ?? props.placeholder
})

function isSelected(option: SelectOption) {
  return selectedValues.value.includes(option[props.trackBy])
}

function openDropdown() {
  isOpen.value = true
  nextTick(() => searchInputRef.value?.focus())
}

function closeDropdown() {
  isOpen.value = false
  search.value = ''
}

function toggleDropdown() {
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

function selectOption(option: SelectOption) {
  const value = option[props.trackBy]

  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = current.indexOf(value)
    if (index === -1) {
      current.push(value)
    } else {
      current.splice(index, 1)
    }
    emit('update:modelValue', current)
    return
  }

  emit('update:modelValue', value)
  closeDropdown()
}

function removeOption(value: OptionValue, event: Event) {
  event.stopPropagation()
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  emit(
    'update:modelValue',
    current.filter((item) => item !== value),
  )
}

function handleClickOutside(event: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="rootRef" class="relative">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-2 rounded-full border border-gray-300 bg-transparent text-left transition focus:outline-none dark:border-gray-700 dark:bg-white/5"
      :class="[
        sizeClasses.trigger,
        isOpen ? 'border-brand-300 ring-3 ring-brand-500/10 dark:border-brand-800' : '',
        hasSelection ? 'text-gray-800 dark:text-white/90' : 'text-gray-400 dark:text-gray-500',
      ]"
      @click="toggleDropdown"
    >
      <span class="truncate">{{ triggerLabel }}</span>
      <AppIcon
        name="chevron-down"
        class="shrink-0 text-gray-500 transition-transform duration-200 dark:text-gray-400"
        :class="[sizeClasses.triggerIcon, { 'rotate-180': isOpen }]"
      />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white p-1.5 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="relative px-1 pt-1 pb-2">
        <AppIcon
          name="search"
          class="pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          :class="sizeClasses.searchIcon"
        />
        <input
          ref="searchInputRef"
          v-model="search"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full rounded-lg border-0 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none dark:text-white/90 dark:placeholder:text-gray-500"
          :class="sizeClasses.searchInput"
          @click.stop
        />
      </div>
      <ul class="max-h-60 overflow-y-auto">
        <li v-for="option in filteredOptions" :key="option[trackBy]">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-2 rounded-lg text-left font-medium transition"
            :class="[
              sizeClasses.option,
              isSelected(option)
                ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5',
            ]"
            @click="selectOption(option)"
          >
            <span class="truncate">{{ option[label] }}</span>
            <span
              v-if="isSelected(option)"
              class="flex shrink-0 items-center justify-center rounded-full bg-brand-500"
              :class="sizeClasses.optionCheck"
            >
              <AppIcon name="check" :class="sizeClasses.optionCheckIcon" />
            </span>
          </button>
        </li>
        <li
          v-if="!filteredOptions.length"
          class="px-3 py-2 text-sm text-gray-400 dark:text-gray-500"
        >
          Sin resultados
        </li>
      </ul>
    </div>

    <div v-if="multiple && selectedOptions.length" class="mt-3 flex flex-wrap items-center gap-2">
      <span
        v-for="option in selectedOptions"
        :key="option[trackBy]"
        class="inline-flex items-center gap-1.5 rounded-full bg-brand-500 font-medium text-white"
        :class="sizeClasses.chip"
      >
        {{ option[label] }}
        <button
          type="button"
          class="flex items-center justify-center rounded-full hover:bg-brand-600"
          :class="sizeClasses.chipIcon"
          @click="removeOption(option[trackBy], $event)"
        >
          <AppIcon name="close" :class="sizeClasses.chipIconInner" />
        </button>
      </span>
      <span
        class="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-100 px-1.5 text-xs font-medium text-gray-500 dark:bg-white/5 dark:text-gray-400"
      >
        {{ selectedOptions.length }}
      </span>
    </div>
    <p v-if="multiple" class="mt-2 text-xs text-gray-400 dark:text-gray-500">
      {{ helperText }}
    </p>
  </div>
</template>

<style scoped></style>
