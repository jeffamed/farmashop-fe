<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import RegisterNameModal from '@/components/common/RegisterNameModal.vue'
import { useLocation } from '../composables/useLocation'
import SimpleCard from '@/components/common/SimpleCard.vue'
import { push } from 'notivue'
import { computed, ref } from 'vue'
import type { Payload } from '@/services/basicApiService.ts'

const title = ref('Ubicaciones')
const show = ref(false)
const location_id = ref(0)
const location_name = ref('')

const { createLocation, locations, deleteLocation, search, editLocation } = useLocation()
const newLocation = () => {
  location_id.value = 0
  location_name.value = ''
  show.value = true
}

const editLocationAction = (location: { id: number; name: string }) => {
  location_id.value = location.id
  location_name.value = location.name
  show.value = true
}

const isSaving = computed(() => editLocation.isPending.value || createLocation.isPending.value)

const actionLocation = (form: Payload) => {
  if (location_id.value > 0) {
    editLocation.mutate(
      { id: location_id.value, payload: form },
      {
        onSuccess: () => {
          show.value = false
          location_id.value = 0
          location_name.value = ''
          push.success({
            title: 'Acción Exitosa..',
            message: 'La ubicación ha sido editada correctamente',
          })
        },
      },
    )
  } else {
    createLocation.mutate(form, {
      onSuccess: () => {
        show.value = false
        push.success({
          title: 'Creado Exitosamente',
          message: 'La ubicación ha sido creada correctamente',
        })
      },
    })
  }
}

const removeLocation = (location_id: number|string) => {
  deleteLocation.mutate(location_id, {
    onSuccess: () => {
      push.success({
        title: 'Ubicación eliminada',
        message: 'La ubicación ha sido eliminada correctamente',
      })
    },
  })
}
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
              @click="newLocation"
            >
              <AppIcon name="plus" class="h-3 w-3" />
              Nueva Ubicación
            </button>
            <Teleport to="body">
              <RegisterNameModal
                title="Ubicación"
                description="Estantes en el local"
                @save="actionLocation"
                v-model:show="show"
                :loading="isSaving"
                :needEdit="location_id > 0"
                :value="location_name"
              />
            </Teleport>
            <RegisterNameModal
              title="Ubicación"
              description="Estantes en el local"
              @save="actionLocation"
              v-model:show="show"
              :loading="isSaving"
              :needEdit="location_id > 0"
              :value="location_name"
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
        <SimpleCard
          :title="location.name"
          :id="location.id"
          @onDelete="removeLocation"
          :onEdit="() => editLocationAction(location)"
        />
      </div>
    </div>
  </admin-layout>
</template>
<style scoped></style>
