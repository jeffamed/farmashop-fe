<script setup lang="ts">
import ModalGlobal from '@/components/common/ModalGlobal.vue'
import { ref, watch } from 'vue'
import type { Customer } from '@/Customers/types/Customer.ts'
import { useCustomer } from '@/Customers/composables/useCustomer.ts'
import { push } from 'notivue'

interface Props {
  show: boolean
  customer: Customer
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const emit = defineEmits<{
  'update:show': [show: boolean]
}>()

const { editCustomer } = useCustomer()
const titleModal = ref('Editar cliente')
const form = ref<Customer>({
  id: props.customer.id,
  name: props.customer.name,
  cedula: props.customer.cedula,
  address: props.customer.address,
  email: props.customer.email,
  phone: props.customer.phone,
})

const handleSubmit = () => {
  if (!validateForm()) return
  editCustomer.mutate(form.value,{
    onSuccess: () => {
      handleCancel()
      push.success('El cliente se edito correctamente')
    },
    onError: () => {
      push.error('Ocurrio un error al editar el cliente')
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
  () => props.customer,
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
      :disableBtnConfirm="editCustomer.isPending.value || !validateForm()"
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
              placeholder="Nombre del cliente"
            />
          </div>
          <div>
            <label
              for="txtCedula"
              class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
              >Cédula</label
            >
            <input
              type="text"
              id="txtCedula"
              v-model="form.cedula"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              placeholder="Cédula del cliente"
            />
          </div>
          <div>
            <label
              for="txtEmail"
              class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
              >Correo</label
            >
            <input
              type="email"
              id="txtEmail"
              v-model="form.email"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              placeholder="Correo del cliente"
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
              placeholder="Teléfono del cliente"
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
              placeholder="Dirección del cliente"
            ></textarea>
          </div>
        </div>
      </template>
    </ModalGlobal>
  </div>
</template>

<style scoped></style>
