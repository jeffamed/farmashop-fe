<script setup lang="ts">
import { computed } from 'vue'
import type { Size } from '@/types/Modal.ts'
import AppIcon from '@/components/icons/AppIcon.vue'

interface Props {
  title: string
  description?: string | null
  show: boolean
  onClose: () => void
  onConfirm: () => void
  confirmText?: string
  colorConfirm?: string
  colorHoverConfirm?: string
  cancelText?: string
  modalId?: string
  size?: Size
  disableBtnConfirm?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  description: null,
  confirmText: 'Guardar',
  cancelText: 'Cancelar',
  modalId: 'default-modal',
  size: 'medium',
  disableBtnConfirm: true,
  loading: false,
  colorConfirm: 'brand-500',
  colorHoverConfirm: 'brand-600'
})

const sizeClass = computed(
  () =>
    ({
      small: 'max-w-sm',
      medium: 'max-w-md',
      large: 'max-w-2xl',
    })[props.size],
)
</script>

<template>
  <Teleport to="body">
    <div v-if="props.show" class="fixed inset-0 z-99999 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-gray-900/50" @click="props.onClose" />

      <div
        :id="props.modalId"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`${props.modalId}-title`"
        class="relative w-full rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        :class="sizeClass"
      >
        <div
          class="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-gray-800 sm:px-6 sm:py-5"
        >
          <div>
            <h3
              :id="`${props.modalId}-title`"
              class="text-lg font-semibold text-gray-800 dark:text-white/90"
            >
              {{ props.title }}
            </h3>
            <p
              v-if="props.description !== null"
              class="mt-1 text-sm text-gray-500 dark:text-gray-400"
            >
              {{ props.description }}
            </p>
          </div>
          <button
            type="button"
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
            @click="props.onClose"
          >
            <AppIcon name="close" class="h-5 w-5" />
            <span class="sr-only">Cerrar</span>
          </button>
        </div>

        <div class="space-y-4 px-5 py-5 md:space-y-6 sm:px-6 sm:py-6">
          <slot name="body" />
        </div>

        <div
          class="flex items-center justify-end gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-800 sm:px-6 sm:py-5"
        >
          <button
            type="button"
            class="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            @click="props.onClose"
          >
            {{ props.cancelText }}
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-full  px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            :class="`bg-${props.colorConfirm} hover:bg-${props.colorHoverConfirm}`"
            @click="props.onConfirm"
            :disabled="props.disableBtnConfirm || props.loading"
          >
            <AppIcon v-if="props.loading" name="spinner" class="h-4 w-4 animate-spin text-white" />
            {{ props.loading ? 'Cargando...' : props.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
