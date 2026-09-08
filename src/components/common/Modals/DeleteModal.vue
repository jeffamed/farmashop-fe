<script setup lang="ts">
import ModalGlobal from '@/components/common/ModalGlobal.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
interface Props {
  show: boolean
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  label: '',
})

const emit = defineEmits<{
  onConfirm: [confirm: boolean]
}>()
</script>

<template>
  <ModalGlobal
    title="¿Confirmar eliminación?"
    :show="show"
    confirmText="Eliminar"
    colorConfirm="error-500"
    colorHoverConfirm="error-600"
    :onClose="() => emit('onConfirm', false)"
    :onConfirm="() => emit('onConfirm', true)"
    :disableBtnConfirm="false"
  >
    <template #body>
      <div class="flex items-start gap-3">
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-error-50 text-error-500 dark:bg-error-500/10"
        >
          <AppIcon name="trash-icon-lg" class="h-5 w-5" />
        </span>
        <div>
          <p>¿Estás seguro de eliminar este registro?</p>
          <p class="mt-1 font-semibold text-gray-800 dark:text-white/90">{{ props.label }}</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Esta acción no se puede deshacer.
          </p>
        </div>
      </div>
    </template>
  </ModalGlobal>
</template>

<style scoped></style>
