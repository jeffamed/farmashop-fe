<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'

const props = defineProps<{
  content: string
}>()
const button = ref<HTMLButtonElement | null>(null)
const tooltip = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)

const showTooltip = () => {
  if (!button.value || !tooltip.value) return

  isVisible.value = true
  const buttonRect = button.value.getBoundingClientRect()
  tooltip.value.style.display = 'block'
  tooltip.value.style.top = buttonRect.top - tooltip.value.offsetHeight - 12 + window.scrollY + 'px'
  tooltip.value.style.left =
    buttonRect.left + buttonRect.width / 2 - tooltip.value.offsetWidth / 2 + window.scrollX + 'px'
}

const hideTooltip = () => {
  isVisible.value = false
  if (tooltip.value) {
    tooltip.value.style.display = 'none'
  }
}
</script>

<template>
  <div class="relative inline-block">
    <button
      ref="button"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
    >
      <AppIcon name="info-circle" />
    </button>
    <div
      ref="tooltip"
      class="z-50 px-4 py-3 text-sm font-normal text-white bg-black rounded-lg whitespace-normal break-words min-h-12 flex items-center max-w-xs"
      style="display: none; position: fixed"
    >
      {{ props.content }}
    </div>
  </div>
</template>

<style scoped></style>
