<script setup lang="ts">
import ModalGlobal from '@/components/common/ModalGlobal.vue'
import { ref, watch } from 'vue'
import type { Supplier } from '@/Suppliers/types/Supplier.ts'
import { useSupplier } from '@/Suppliers/composables/useSupplier.ts'
import { push } from 'notivue'

interface Props {
  show: boolean
  supplier: Supplier
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const emit = defineEmits<{
  'update:show': [show: boolean]
}>()

const { editSupplier } = useSupplier()
const titleModal = ref('Editar proveedor')
const form = ref<Supplier>({
  id: props.supplier.id,
  name: props.supplier.name,
  ruc: props.supplier.ruc,
  address: props.supplier.address,
  phone: props.supplier.phone,
})

const handleSubmit = () => {
  if (!validateForm()) return
  editSupplier.mutate(form.value,{
    onSuccess: () => {
      handleCancel()
      push.success('El proveedor se edito correctamente')
    },
    onError: () => {
      push.error('Ocurrio un error al editar el proveedor')
    }
  })
}
const handleCancel = () => {
  emit('update:show', false)
}

const validateForm = () => {
  return form.value.name !== ''
}

watch(
  () => props.supplier,
  (newVal) => (form.value = { ...newVal }),
  { immediate: true },
)
</script>
<template>
  <div>
    <ModalGlobal
      :title="titleModal"
      :show="props.show"
      :onClose="handleCancel"
      :onConfirm="handleSubmit"
      :disableBtnConfirm="editSupplier.isPending.value || !validateForm()"
    >
      <template #body>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="col-span-2">
            <label
              for="txtName"
              class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
            >
              Nombre<span class="text-error-500">*</span>
            </label>
            <input
              type="text"
              id="txtName"
              v-model="form.name"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              placeholder="Nombre del proveedor"
            />
          </div>
          <div>
            <label
              for="txtRuc"
              class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
              >RUC</label
            >
            <input
              type="text"
              id="txtRuc"
              v-model="form.ruc"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              placeholder="RUC del proveedor"
            />
          </div>
          <div>
            <label
              for="txtPhone"
              class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
              >Teléfono</label
            >
            <input
              type="text"
              id="txtPhone"
              v-model="form.phone"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              placeholder="Teléfono del proveedor"
            />
          </div>
          <div class="col-span-2">
            <label
              for="txtAddress"
              class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
              >Dirección</label
            >
            <textarea
              id="txtAddress"
              v-model="form.address"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              placeholder="Dirección del proveedor"
            ></textarea>
          </div>
        </div>
      </template>
    </ModalGlobal>
  </div>
</template>

<style scoped></style>
