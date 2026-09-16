<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import RegisterNameModal from '@/components/common/RegisterNameModal.vue'
import { useUsage } from '../composables/useUsage'
import SimpleCard from '@/components/common/SimpleCard.vue'
import { push } from 'notivue'
import { computed, ref } from 'vue'
import type { Payload } from '@/services/basicApiService.ts'

const title = ref('Usos')
const show = ref(false)
const usage_id = ref(0)
const usage_name = ref('')

const { createUsage, usages, deleteUsage, search, editUsage } = useUsage()
const newUsage = () => {
  usage_id.value = 0
  usage_name.value = ''
  show.value = true
}

const editUsageAction = (usage: { id: number; description: string }) => {
  usage_id.value = usage.id
  usage_name.value = usage.description
  show.value = true
}

const isSaving = computed(() => editUsage.isPending.value || createUsage.isPending.value)

const actionUsage = (form: Payload) => {
  if (usage_id.value > 0) {
    editUsage.mutate(
      { id: usage_id.value, payload: form },
      {
        onSuccess: () => {
          show.value = false
          usage_id.value = 0
          usage_name.value = ''
          push.success({
            title: 'Acción Exitosa..',
            message: 'El uso ha sido editado correctamente',
          })
        },
      },
    )
  } else {
    createUsage.mutate(form, {
      onSuccess: () => {
        show.value = false
        push.success({
          title: 'Creado Exitosamente',
          message: 'El uso ha sido creado correctamente',
        })
      },
    })
  }
}

const removeUsage = (usage_id: number|string) => {
  deleteUsage.mutate(usage_id, {
    onSuccess: () => {
      push.success({
        title: 'Uso eliminado',
        message: 'El uso ha sido eliminado correctamente',
      })
    },
  })
}
</script>
<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="col-span-12">
      <Breadcrumbs
        :parent-path="{ name: 'Almacén', root: '/usages' }"
        :current-path="{ name: title, root: '/usages' }"
      />
      <PageHeader group="Almacén" :title="title" :count="usages.length">
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
            @click="newUsage"
          >
            <AppIcon name="plus" class="h-3 w-3" />
            Nuevo Uso
          </button>
          <RegisterNameModal
            title="Uso"
            description="Uso para que el medicamento sea clasificado"
            @save="actionUsage"
            v-model:show="show"
            :loading="isSaving"
            :needEdit="usage_id > 0"
            :value="usage_name"
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
          placeholder="Buscar uso..."
          v-model="search"
          class="h-11 w-full rounded-full border border-gray-300 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
        />
      </div>
    </div>
    <div v-for="usage in usages" class="col-span-3" :key="usage.id">
      <SimpleCard
        :title="usage.description"
        :id="usage.id"
        @onDelete="removeUsage"
        :onEdit="() => editUsageAction(usage)"
      />
    </div>
  </div>
</template>
<style scoped></style>
