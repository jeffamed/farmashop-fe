<script setup lang="ts">
import ModalGlobal from '@/components/common/ModalGlobal.vue'
import { ref } from 'vue'
import type { CustomerForm } from '@/Customers/types/Customer.ts'
import { useCustomer } from '@/Customers/composables/useCustomer.ts'
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

const { createCustomer } = useCustomer()
const titleModal = ref('Nuevo cliente')
const form = ref<CustomerForm>({
  name: '',
  dni: '',
  address: '',
  email: '',
  phone: '',
})

const handleSubmit = () => {
  if (!validateForm()) return
  createCustomer.mutate(form.value, {
    onSuccess: () => {
      handleCancel()
      push.success('El cliente se creó correctamente')
    },
    onError: () => {
      push.error('Ocurrio un error al crear el cliente')
    },
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
      :disableBtnConfirm="createCustomer.isPending.value || !validateForm()"
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
              v-model="form.dni"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              placeholder="Cédula del cliente"
            />
          </div>
          <div>
            <label
              for="txtEmail"
              class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
              >Correo Electronico</label
            >
            <input
              type="email"
              id="txtEmail"
              v-model="form.email"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              placeholder="Correo del cliente"
            />
          </div>
          <div class="col-span-2">
            <label
              for="txtPhone"
              class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
            >
              Teléfono
            </label>
            <vue-tel-input
              id="txtPhone"
              class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
              :value="form.phone"
              :inputOptions="{ placeholder: 'Teléfono del cliente' }"
              @on-input="handlePhoneInput"
            ></vue-tel-input>
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
