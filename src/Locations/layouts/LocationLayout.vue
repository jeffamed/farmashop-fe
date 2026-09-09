<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import RegisterNameModal from '@/components/common/RegisterNameModal.vue'
import { useLocation } from '../composables/useLocation'
import SimpleCard from '@/components/common/SimpleCard.vue'
import { push } from 'notivue'
import { ref, watch } from 'vue'

const title = ref<string>('Ubicaciones')
const show = ref<boolean>(false)

const { createLocation, locations, deleteLocation, search } = useLocation()

watch(createLocation.isSuccess, (value) => {
  if (value) {
    show.value = false
  }
  push.success({
    title: 'Creado Exitosamente',
    message: 'La ubicación ha sido creada correctamente',
  })
})

watch(deleteLocation.isSuccess, () => {
  push.success({
    title: 'Ubicación eliminada',
    message: 'La ubicación ha sido eliminada correctamente',
  })
})

</script>
<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <Breadcrumbs
          :parent-path="{ name: 'Almacen', root: '/locations' }"
          :current-path="{ name: title, root: '/locations' }"
        />
        <PageHeader group="Almacén" :title="title" :count="locations.length">
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
              Nueva Ubicación
            </button>
            <RegisterNameModal
              title="Ubicación"
              description="Estantes en el local"
              @save="createLocation.mutate"
              v-model:show="show"
              :loading="createLocation?.isPending.value ?? false"
            />
          </template>
        </PageHeader>
      </div>
      <div class="col-span-12">
        <div class="relative flex-1">
          <AppIcon
            name="search"
            class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <input
            type="text"
            placeholder="Buscar ubicación..."
            v-model="search"
            class="h-11 w-full rounded-full border border-gray-300 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          />
        </div>
      </div>
      <div v-for="location in locations" class="col-span-3" :key="location.id">
        <SimpleCard :title="location.name" :id="location.id" @onDelete="deleteLocation.mutate" />
      </div>
    </div>
  </admin-layout>
</template>
<style scoped></style>
