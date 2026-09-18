<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import AppIcon from '@/components/icons/AppIcon.vue'

interface Props {
  modelValue?: object | any[] | string | number | null
  options: any[]
  multiple?: boolean
  closeOnSelect?: boolean
  placeholder?: string
  label?: string
  trackBy?: string
  searchable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  closeOnSelect: true,
  placeholder: 'Seleccione una opción',
  searchable: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']]
}>()
</script>

<template>
  <Multiselect
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :options="props.options"
    :multiple="props.multiple"
    :close-on-select="props.closeOnSelect"
    :placeholder="props.placeholder"
    :label="props.label"
    :track-by="props.trackBy"
    :searchable="props.searchable"
    :use-teleport="true"
    content-wrapper-class="app-multiselect-panel"
    select-label=""
    selected-label=""
    deselect-label=""
  >
    <template #caret="{ toggle }">
      <div
        class="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
        @mousedown.prevent.stop="toggle()"
      >
        <AppIcon name="chevron-down" class="app-multiselect-caret h-4 w-4 transition-transform duration-200" />
      </div>
    </template>
  </Multiselect>
</template>

<style scoped>
@reference "@/assets/main.css";

:deep(.multiselect) {
  @apply min-h-0 text-sm;
}

:deep(.multiselect__tags) {
  @apply flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-full border border-gray-300 bg-transparent py-2.5 pr-10 pl-4 transition dark:border-gray-700 dark:bg-white/5;
}

:deep(.multiselect--active .multiselect__tags) {
  @apply border-brand-300 ring-3 ring-brand-500/10 dark:border-brand-800;
  border-radius: 9999px !important;
}

/*
  vue-multiselect flattens the bottom corners of .multiselect__input while
  active (it assumes the default 5px-radius, flush-with-dropdown look). It's
  invisible on its own (no bg/border here), but combined with the base
  border-radius:5px it leaves an asymmetric radius baked into the input's box
  that can peek out at the pill's edge. Force it to match the pill instead.
*/
:deep(.multiselect__input) {
  border-radius: 9999px !important;
}

.multiselect--active .app-multiselect-caret {
  transform: rotate(180deg);
}

:deep(.multiselect__tags-wrap) {
  @apply flex flex-wrap items-center gap-1.5;
}

:deep(.multiselect__input),
:deep(.multiselect__single) {
  @apply m-0 min-h-0 border-0 bg-transparent p-0 text-sm text-gray-800 dark:text-white/90;
}

:deep(.multiselect__input::placeholder) {
  @apply text-gray-400 dark:text-gray-500;
}

:deep(.multiselect__placeholder) {
  @apply m-0 p-0 text-sm text-gray-400 dark:text-gray-500;
}

:deep(.multiselect__tag) {
  @apply m-0 flex items-center gap-1.5 rounded-full bg-brand-500 py-1 pr-7 pl-3 text-xs font-medium text-white;
}

:deep(.multiselect__tag-icon) {
  @apply rounded-full;
}

:deep(.multiselect__tag-icon:hover),
:deep(.multiselect__tag-icon:focus) {
  @apply bg-brand-600;
}

:deep(.multiselect__tag-icon::after) {
  color: white;
}
</style>

<!--
  vue-multiselect teleports the open panel to <body> (useTeleport), so it no
  longer lives inside this component's DOM subtree and scoped `:deep()`
  selectors (which compile to `[data-v-hash] .selector`) can't reach it.
  contentWrapperClass tags the panel with `app-multiselect-panel` instead, and
  these rules target that class directly, unscoped. Selectors are kept
  compound (two classes) so they reliably beat vue-multiselect's own
  single-class defaults regardless of stylesheet injection order.
-->
<style>
@reference "@/assets/main.css";

.app-multiselect-panel.multiselect__content-wrapper {
  @apply mt-2 max-h-60 rounded-xl border border-gray-200 bg-white p-1.5 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark;
}

.app-multiselect-panel .multiselect__option {
  @apply rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-400;
}

.app-multiselect-panel .multiselect__option::after {
  @apply hidden;
}

.app-multiselect-panel .multiselect__option--highlight {
  @apply bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300;
}

.app-multiselect-panel .multiselect__option--selected {
  @apply bg-brand-500 font-medium text-white;
}

.app-multiselect-panel .multiselect__option--selected.multiselect__option--highlight {
  @apply bg-brand-600 text-white;
}
</style>
