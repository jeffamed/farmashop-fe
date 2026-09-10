<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import RegisterNameModal from '@/components/common/RegisterNameModal.vue'
import { usePresentation } from '../composables/usePresentation'
import SimpleCard from '@/components/common/SimpleCard.vue'
import { push } from 'notivue'
import { computed, ref } from 'vue'
import type { Payload } from '@/services/basicApiService.ts'

const title = ref('Presentaciones')
const show = ref(false)
const presentation_id = ref(0)
const presentation_name = ref('')

const { createPresentation, presentations, deletePresentation, search, editPresentation } = usePresentation()
const newPresentation = () => {
  presentation_id.value = 0
  presentation_name.value = ''
  show.value = true
}

const editPresentationAction = (presentation: { id: number; name: string }) => {
  presentation_id.value = presentation.id
  presentation_name.value = presentation.name
  show.value = true
}

const isSaving = computed(() => editPresentation.isPending.value || createPresentation.isPending.value)

const actionPresentation = (form: Payload) => {
  if (presentation_id.value > 0) {
    editPresentation.mutate(
      { id: presentation_id.value, payload: form },
      {
        onSuccess: () => {
          show.value = false
          presentation_id.value = 0
          presentation_name.value = ''
          push.success({
            title: 'Acción Exitosa..',
            message: 'La presentación ha sido editada correctamente',
          })
        },
      },
    )
  } else {
    createPresentation.mutate(form, {
      onSuccess: () => {
        show.value = false
        push.success({
          title: 'Creado Exitosamente',
          message: 'La presentación ha sido creada correctamente',
        })
      },
    })
  }
}

const removePresentation = (presentation_id: number|string) => {
  deletePresentation.mutate(presentation_id, {
    onSuccess: () => {
      push.success({
        title: 'Presentación eliminada',
        message: 'La presentación ha sido eliminada correctamente',
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
          :parent-path="{ name: 'Almacén', root: '/presentations' }"
          :current-path="{ name: title, root: '/presentations' }"
        />
        <PageHeader group="Almacén" :title="title" :count="presentations.length">
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
              @click="newPresentation"
            >
              <AppIcon name="plus" class="h-3 w-3" />
              Nueva Presentación
            </button>
            <RegisterNameModal
              title="Presentación"
              description="Presentaciones de productos"
              @save="actionPresentation"
              v-model:show="show"
              :loading="isSaving"
              :needEdit="presentation_id > 0"
              :value="presentation_name"
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
            placeholder="Buscar presentación..."
            v-model="search"
            class="h-11 w-full rounded-full border border-gray-300 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          />
        </div>
      </div>
      <div v-for="presentation in presentations" class="col-span-3" :key="presentation.id">
        <SimpleCard
          :title="presentation.name"
          :id="presentation.id"
          @onDelete="removePresentation"
          :onEdit="() => editPresentationAction(presentation)"
        />
      </div>
    </div>
  </admin-layout>
</template>
<style scoped></style>
