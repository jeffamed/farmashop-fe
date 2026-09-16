<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import RegisterNameModal from '@/components/common/RegisterNameModal.vue'
import { useTypeProduct } from '../composables/useTypeProduct'
import SimpleCard from '@/components/common/SimpleCard.vue'
import { push } from 'notivue'
import { computed, ref } from 'vue'
import type { Payload } from '@/services/basicApiService.ts'

const title = ref('Tipos de producto')
const show = ref(false)
const type_product_id = ref(0)
const type_product_name = ref('')

const { createTypeProduct, typeProducts, deleteTypeProduct, search, editTypeProduct } = useTypeProduct()
const newTypeProduct = () => {
  type_product_id.value = 0
  type_product_name.value = ''
  show.value = true
}

const editTypeProductAction = (typeProduct: { id: number; name: string }) => {
  type_product_id.value = typeProduct.id
  type_product_name.value = typeProduct.name
  show.value = true
}

const isSaving = computed(() => editTypeProduct.isPending.value || createTypeProduct.isPending.value)

const actionTypeProduct = (form: Payload) => {
  if (type_product_id.value > 0) {
    editTypeProduct.mutate(
      { id: type_product_id.value, payload: form },
      {
        onSuccess: () => {
          show.value = false
          type_product_id.value = 0
          type_product_name.value = ''
          push.success({
            title: 'Acción Exitosa..',
            message: 'El tipo de producto ha sido editado correctamente',
          })
        },
      },
    )
  } else {
    createTypeProduct.mutate(form, {
      onSuccess: () => {
        show.value = false
        push.success({
          title: 'Creado Exitosamente',
          message: 'El tipo de producto ha sido creado correctamente',
        })
      },
    })
  }
}

const removeTypeProduct = (type_product_id: number|string) => {
  deleteTypeProduct.mutate(type_product_id, {
    onSuccess: () => {
      push.success({
        title: 'Tipo de producto eliminado',
        message: 'El tipo de producto ha sido eliminado correctamente',
      })
    },
  })
}
</script>
<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="col-span-12">
      <Breadcrumbs
        :parent-path="{ name: 'Almacén', root: '/type-products' }"
        :current-path="{ name: title, root: '/type-products' }"
      />
      <PageHeader group="Almacén" :title="title" :count="typeProducts.length">
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
            @click="newTypeProduct"
          >
            <AppIcon name="plus" class="h-3 w-3" />
            Nuevo Tipo de producto
          </button>
          <RegisterNameModal
            title="Tipo de producto"
            description="Uso para que el medicamento sea clasificado"
            @save="actionTypeProduct"
            v-model:show="show"
            :loading="isSaving"
            :needEdit="type_product_id > 0"
            :value="type_product_name"
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
          placeholder="Buscar tipo de producto..."
          v-model="search"
          class="h-11 w-full rounded-full border border-gray-300 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
        />
      </div>
    </div>
    <div v-for="typeProduct in typeProducts" class="col-span-3" :key="typeProduct.id">
      <SimpleCard
        :title="typeProduct.name"
        :id="typeProduct.id"
        @onDelete="removeTypeProduct"
        :onEdit="() => editTypeProductAction(typeProduct)"
      />
    </div>
  </div>
</template>
<style scoped></style>
