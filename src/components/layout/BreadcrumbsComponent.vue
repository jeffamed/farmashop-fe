<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'

interface path {
  name: string
  root: string | null
}
interface Props {
  parentPath: path
  currentPath: path
}

const props = defineProps<Props>()
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <RouterLink
          class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
          :to="props.parentPath.root ?? '/'"
        >
          <AppIcon name="home-outline" class="w-4 h-4 me-1.5" />
          {{ props.parentPath.name }}
        </RouterLink>
      </li>
      <li>
        <div class="flex items-center space-x-1.5">
          <AppIcon name="chevron-right-lg" class="w-3.5 h-3.5 rtl:rotate-180 text-body" />
          <RouterLink
            :to="props.currentPath.root ?? '/'"
            class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
          >
            {{ props.currentPath.name }}
          </RouterLink>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped></style>
