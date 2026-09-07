<script setup lang="ts">
import type { Payload } from '@/services/basicApiService'
import ModalGlobal from '@/components/common/ModalGlobal.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { ref, watch } from 'vue'

interface Props {
  title: string
  description?: string
  show: boolean,
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  loading: false
})
const emit = defineEmits<{
  save: [payload: Payload]
}>()

const name = ref<string>('')

watch( () => props.show, () => {
  if (!props.show) {
    resetForm()
  }
})

const sendForm = () => {
  if (validateForm()) {
    emit('save', { name: name.value })
  }
}

const resetForm = () => {
  name.value = ''
}

const validateForm = () => {
  return name.value.length > 0
}

</script>

<template>
  <div>
    <ModalGlobal
      :title="`Agregar ${props.title.toLowerCase()}`"
      :description="props?.description"
      :show="show"
      :onClose="resetForm"
      :onConfirm="sendForm"
      :disableBtnConfirm="loading || !validateForm()"
    >
      <template #body>
        <form>
          <div class="grid gap-4 grid-cols-2">
            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90"
              >
                Nombre<span class="text-error-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                v-model="name"
                class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
                :placeholder="`Nombre de ${props.title.toLowerCase()}`"
              />
            </div>
          </div>
        </form>
      </template>
    </ModalGlobal>
  </div>
</template>

<style scoped></style>
