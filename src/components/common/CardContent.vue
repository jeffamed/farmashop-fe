<script setup lang="ts">
interface Props {
  title: string
  classBody?: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    classBody: 'grid gap-5 sm:grid-cols-2',
  },
)
</script>

<template>
  <div class="col-span-12">
    <div
      class="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark"
    >
      <h2
        class="mb-5 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
      >
        {{ props.title }}
      </h2>
      <div :class="props.classBody">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
