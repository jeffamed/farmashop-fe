<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'

const props = defineProps<{
  open?: boolean
  title: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

const isOpen = ref(props.open ?? false)

const closeDrawer = () => {
  isOpen.value = false
  emit('update:open', false)
  emit('close')
}

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    closeDrawer()
  }
}
</script>

<template>
  <!-- drawer backdrop -->
  <div
    v-show="isOpen || open"
    class="fixed inset-0 z-30 bg-black/50 transition-opacity"
    @click="handleBackdropClick"
  />

  <!-- drawer component -->
  <div
    v-show="isOpen || open"
    class="fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 w-80 border-l border-gray-200 dark:border-gray-700"
    tabindex="-1"
    aria-labelledby="drawer-contact-label"
  >
    <div class="border-b border-gray-200 dark:border-gray-700 pb-4 mb-5 flex items-center justify-between">
      <h5 id="drawer-label-contact" class="inline-flex items-center text-lg font-medium text-gray-900 dark:text-white">
        {{ title }}
      </h5>
      <button
        type="button"
        @click="closeDrawer"
        class="text-gray-500 dark:text-gray-400 bg-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0"
      >
        <AppIcon name="close" />
        <span class="sr-only">Close menu</span>
      </button>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
