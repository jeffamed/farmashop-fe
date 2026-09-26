<script setup lang="ts">
import SelectSearch from '@/components/common/SelectSearch.vue'
import { ref } from 'vue'
import { useModule } from '@/Products/composables/useModule.ts'
import type { Payload, Form } from '@/Products/types/DrawerForm'
import { push } from 'notivue'

const { createModule, clientCache } = useModule()
const form = ref<Form>({
  route: '',
  ruc: '',
  name: '',
  description: '',
})

const modules = ref<Record<string, string>[]>([
  {
    id: 'suppliers',
    name: 'Proveedores',
  },
  {
    id: 'laboratories',
    name: 'Laboratorios',
  },
  {
    id: 'presentations',
    name: 'Presentaciones',
  },
  {
    id: 'locations',
    name: 'Ubicación',
  },
  {
    id: 'types',
    name: 'Tipo',
  },
  {
    id: 'usages',
    name: 'Usos',
  },
])
const searchModule = ref('')

const transformPayload = (): Payload => {
  const formTmp = form.value
  const defaultPayload = () => ({
    route: formTmp.route,
    name: formTmp.name,
  })

  const transform: Record<string, () => Payload> = {
    suppliers: () => ({
      route: formTmp.route,
      ruc: formTmp.ruc,
      name: formTmp.name,
    }),
    usages: () => ({
      route: formTmp.route,
      description: formTmp.description,
    }),
  }

  return (transform[formTmp.route] ?? defaultPayload)()
}
const saveRegister = () => {
  const params = transformPayload()
  createModule.mutate(params, {
    onSuccess: () => {
      push.success('Módulo creado correctamente')
      clientCache(params.route)
      resetForm()
    },
  })
}

const resetForm = () => {
  form.value = {
    route: '',
    ruc: '',
    name: '',
    description: '',
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Puedes agregar una nueva opción sin salir de esta vista. Completa todos los campos para
        continuar.
      </p>
    </div>

    <div class="space-y-5">
      <div>
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Módulo <span class="text-error-500">*</span>
        </label>
        <SelectSearch
          v-model="form.route"
          v-model:search="searchModule"
          :options="modules"
          placeholder="Selecciona un módulo"
        />
      </div>

      <div v-if="form.route !== 'usages'">
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Nombre <span class="text-error-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ingresa el nombre"
          class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          v-model="form.name"
        />
      </div>
      <div v-if="form.route === 'suppliers'">
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          RUC <span class="text-error-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ingresa el RUC"
          class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          v-model="form.ruc"
        />
      </div>

      <div v-if="form.route === 'usages'">
        <label class="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
          Descripción <span class="text-error-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ingresa la descripción"
          class="block w-full rounded-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          v-model="form.description"
        />
      </div>
    </div>

    <button
      type="button"
      @click.prevent="saveRegister"
      class="w-full text-white rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium hover:bg-brand-600 focus:ring-4 focus:ring-brand-500/10 focus:outline-none"
    >
      Guardar
    </button>
  </div>
</template>

<style scoped></style>
