<script setup lang="ts">
import ModalGlobal from '@/components/common/ModalGlobal.vue'
import { ref } from 'vue'
import type { SupplierForm } from '@/Suppliers/types/Supplier.ts'
import { useSupplier } from '@/Suppliers/composables/useSupplier.ts'
import { push } from 'notivue'
import type { PhoneMeta } from 'vue-tel-input'

interface Props {
  show: boolean
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  loading: false,
})

const emit = defineEmits<{
  'update:show': [show: boolean]
}>()

const { createSupplier } = useSupplier()
const titleModal = ref('Nuevo proveedor')
const form = ref<SupplierForm>({
  name: '',
  ruc: '',
  address: '',
  phone: '',
})
const phoneInput = ref('')

const handleSubmit = () => {
  if (!validateForm()) return
  createSupplier.mutate(form.value,{
    onSuccess: () => {
      handleCancel()
      push.success('El proveedor se creó correctamente')
    },
    onError: () => {
      push.error('Ocurrio un error al crear el proveedor')
    }
  })
}
const handleCancel = () => {
  emit('update:show', false)
}

const validateForm = () => {
  return form.value.name !== ''
}

const handlePhoneInput = (number: string, phoneObject: PhoneMeta) => {
  form.value.phone = phoneObject
}
</script>
<template>
  <div>
    <ModalGlobal
      :title="titleModal"
      :show="props.show"
      :onClose="handleCancel"
      :onConfirm="handleSubmit"
      :disableBtnConfirm="createSupplier.isPending.value || !validateForm()"
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
            <vue-tel-input
              id="txtPhone"
              v-model="phoneInput"
              :inputOptions="{ placeholder: 'Teléfono del proveedor' }"
              @on-input="handlePhoneInput"
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

<style scoped>
@reference "@/assets/main.css";

.vue-tel-input {
  @apply flex w-full items-center rounded-full border border-gray-300 bg-transparent text-sm text-gray-800 transition dark:border-gray-700 dark:bg-white/5 dark:text-white/90;
}

.vue-tel-input:focus-within {
  @apply border-brand-300 ring-3 ring-brand-500/10 dark:border-brand-800;
}

.vue-tel-input :deep(.vti__dropdown) {
  @apply rounded-l-full py-2.5 pr-2 pl-4 hover:bg-gray-50 dark:hover:bg-white/5;
}

.vue-tel-input :deep(.vti__dropdown-arrow) {
  @apply text-gray-400 dark:text-gray-500;
}

.vue-tel-input :deep(.vti__dropdown-list) {
  @apply z-50 mt-2 max-h-60 w-72 max-w-[90vw] overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 text-sm shadow-theme-lg dark:border-gray-700 dark:bg-gray-dark;
}

.vue-tel-input :deep(.vti__dropdown-item) {
  @apply flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300;
}

.vue-tel-input :deep(.vti__dropdown-item.highlighted) {
  @apply bg-gray-100 dark:bg-white/5;
}

.vue-tel-input :deep(.vti__country-code) {
  @apply text-gray-400 dark:text-gray-500;
}

.vue-tel-input :deep(.vti__input) {
  @apply w-full rounded-r-full bg-transparent py-2.5 pr-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white/90 dark:placeholder:text-gray-500;
}
</style>
