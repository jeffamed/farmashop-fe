<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

withDefaults(defineProps<Props>(), {
  count: 0,
})
</script>

<template>
  <div class="flex flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h1 class="mt-1 text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white/90">
        {{ title }}
      </h1>
      <p v-if="count !== null" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ count }} {{ count === 1 ? 'registro encontrado' : 'registros encontrados' }}
      </p>
    </div>
    <div class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped></style>
