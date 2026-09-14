<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { useLaboratory } from '@/Laboratories/composables/useLaboratory.ts'
import DeleteModal from '@/components/common/Modals/DeleteModal.vue'
import EditFormModal from '@/Laboratories/components/EditFormModal.vue'
import type { Laboratory } from '@/Laboratories/types/Laboratory.ts'
import { push } from 'notivue'

const { laboratories, deleteLaboratory } = useLaboratory()
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const laboratory = ref<Laboratory>({
  id: 0,
  name: '',
  address: '',
})

const handleDelete = (deleteRegister: boolean) => {
  if (deleteRegister) {
    deleteLaboratory.mutate(laboratory.value.id, {
      onSuccess: () => {
        laboratory.value = {
          id: 0,
          name: '',
          address: '',
        }
        push.success('Laboratorio eliminado...')
      },
      onError: () => {
        push.error('Error al eliminar el laboratorio')
      },
    })
  }
  showDeleteModal.value = false
}

const actionButtons = (lab: Laboratory, action: string = 'delete') => {
  laboratory.value = lab
  if (action === 'delete') {
    showDeleteModal.value = true
  }
  if (action === 'edit') {
    showEditModal.value = true
  }
}
</script>

<template>
  <tr
    class="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
    v-for="laboratory in laboratories"
    :key="laboratory.id"
  >
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ laboratory.name }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6">
      <p class="font-medium text-gray-800 dark:text-white/90">{{ laboratory.address }}</p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 sm:px-6">
      <div class="flex items-center justify-end gap-1">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click.prevent="() => actionButtons(laboratory, 'edit')"
        >
          <AppIcon name="edit" class="h-4 w-4" />
          <span class="sr-only">Editar</span>
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click.prevent="() => actionButtons(laboratory, 'delete')"
        >
          <AppIcon name="trash" class="h-4 w-4" />
          <span class="sr-only">Eliminar</span>
        </button>
      </div>
    </td>
  </tr>
  <DeleteModal :show="showDeleteModal" :label="laboratory.name" @onConfirm="handleDelete" />
  <EditFormModal v-model:show="showEditModal" :laboratory="laboratory"/>
</template>

<style scoped></style>
