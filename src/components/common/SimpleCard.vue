<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import DeleteModal from '@/components/common/Modals/DeleteModal.vue'
import type { CardColor } from '@/types/Modal.ts'
interface Props {
  id: string | number
  title: string
  color?: CardColor
  onEdit?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
})
const emit = defineEmits<{
  onDelete: [id: string | number]
}>()

const colorClasses: Record<CardColor, string> = {
  blue: 'bg-blue-light-500/15 text-blue-light-500',
  green: 'bg-success-500/15 text-success-500',
  pink: 'bg-theme-pink-500/15 text-theme-pink-500',
  purple: 'bg-theme-purple-500/15 text-theme-purple-500',
  orange: 'bg-orange-500/15 text-orange-500',
  brown: 'bg-orange-800/15 text-orange-800 dark:text-orange-300',
}

const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const showDeleteModal = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const handleEdit = () => {
  closeMenu()
  props.onEdit?.()
}

const handleDelete = (deleteRegister: boolean) => {
  if (deleteRegister) {
    emit('onDelete', props.id)
    closeMenu()
  }
  showDeleteModal.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.02]"
  >
    <div class="flex items-center gap-3">
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        :class="colorClasses[props.color]"
      >
        <slot name="icon">
          <AppIcon name="box" class="h-5 w-5" />
        </slot>
      </span>
      <span class="font-semibold text-gray-800 dark:text-white/90">{{ props.title }}</span>
    </div>

    <div ref="menuRef" class="relative">
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
        @click="toggleMenu"
      >
        <AppIcon name="horizontal-dots" class="h-5 w-5" />
        <span class="sr-only">Más opciones</span>
      </button>

      <div
        v-if="menuOpen"
        class="absolute right-0 z-10 mt-2 w-36 rounded-xl border border-gray-200 bg-white p-1.5 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <button
          type="button"
          class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
          @click="handleEdit"
        >
          <AppIcon name="edit" class="h-4 w-4" />
          Editar
        </button>
        <button
          type="button"
          class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10"
          @click="() => (showDeleteModal = true)"
        >
          <AppIcon name="trash" class="h-4 w-4" />
          Eliminar
        </button>
      </div>
    </div>

    <DeleteModal :show="showDeleteModal" :label="props.title" @onConfirm="handleDelete" />
  </div>
</template>

<style scoped></style>
