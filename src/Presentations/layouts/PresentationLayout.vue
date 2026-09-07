<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import RegisterNameModal from '@/components/common/RegisterNameModal.vue'

import { ref } from 'vue'
const title = ref<string>('Presentaciones')
const show = ref<boolean>(false)
</script>
<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <Breadcrumbs
          :parent-path="{ name: 'Almacén', root: '/presentations' }"
          :current-path="{ name: title, root: '/presentations' }"
        />
        <PageHeader group="Almacén" :title="title" :count="0">
          <template #actions>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              <AppIcon name="download" class="h-4 w-4" />
              Exportar
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
              @click="show = true"
            >
              <AppIcon name="plus" class="h-3 w-3" />
              Nueva Presentación
            </button>
            <RegisterNameModal
              title="Presentación"
              description="Presentaciones de productos"
              v-model:show="show"
            />
          </template>
        </PageHeader>
      </div>
    </div>
  </admin-layout>
</template>
<style scoped></style>
