<script setup lang="ts">
import ModalGlobal from '@/components/common/ModalGlobal.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { ref } from 'vue'

interface Props {
  title: string,
  description?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  save: [name: string]
}>()


const show = ref<boolean>(false)
const name = ref<string>('')

const sendForm = () => {
  emit('save', name.value)
  show.value = false
}

const resetForm = () => {
  name.value = ''
  show.value = false
}

</script>

<template>
  <div>
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
      @click="show = true"
    >
      <AppIcon name="plus" class="h-3 w-3" />
      Nueva {{ props.title.toLowerCase() }}
    </button>
    <ModalGlobal
      :title="`Agregar ${props.title.toLowerCase()}`"
      :description="props?.description"
      :show="show"
      :onClose="resetForm"
      :onConfirm="sendForm"
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
                :placeholder='`Nombre de ${props.title.toLowerCase()}`'
              />
            </div>
          </div>
        </form>
      </template>
    </ModalGlobal>
  </div>
</template>

<style scoped></style>
