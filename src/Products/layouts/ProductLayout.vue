<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import { ref } from 'vue'
const title = ref<string>('Productos')
</script>
<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <Breadcrumbs
          :parent-path="{ name: 'Almacén', root: '/products' }"
          :current-path="{ name: title, root: '/products' }"
        />
        <PageHeader group="Almacén" :title="title" :count="0">
          <template #actions>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full border
              border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700
              hover:bg-gray-50 dark:border-gray-700
              dark:text-gray-300 dark:hover:bg-white/5"
            >
              <AppIcon name="download" class="h-4 w-4" />
              Exportar
            </button>
          </template>
        </PageHeader>
      </div>
    </div>
  </admin-layout>
</template>
<style scoped></style>
