<script setup lang="ts">
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import { UploadButton, FilesList, UppyContextProvider } from '@uppy/vue'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import type { IconName } from '@/components/icons/type'

interface Props {
  type?: 'imagen' | 'documento'
  endpoint?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'imagen',
  endpoint: '/api/upload',
})

let uppyInstance: Uppy | null = null

onMounted(() => {
  uppyInstance = new Uppy({
    restrictions: {
      maxNumberOfFiles: props.type === 'imagen' ? 1 : 5,
      allowedFileTypes:
        props.type === 'imagen'
          ? ['image/jpeg', 'image/png', 'image/webp']
          : [
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
      maxFileSize: props.type === 'imagen' ? 5 * 1024 * 1024 : 10 * 1024 * 1024,
    },
  })

  uppyInstance.use(XHRUpload, {
    endpoint: props.endpoint,
    fieldName: props.type === 'imagen' ? 'image' : 'documents',
  })
})

const uppy = computed(() => uppyInstance)

onBeforeUnmount(() => {
  uppyInstance = null
})

interface Config {
  icon: IconName
  title: string
  description: string
  button: string
  restrictions: string
}

const config = computed((): Config => {
  const configs: Record<'imagen' | 'documento', Config> = {
    imagen: {
      icon: 'box' as const,
      title: 'Agrega una imagen para identificar el producto',
      description: 'Se mostrará una vista previa antes de guardar.',
      button: 'Seleccionar imagen',
      restrictions: 'JPG, PNG o WebP. Tamaño máximo: 5 MB.',
    },
    documento: {
      icon: 'docs' as const,
      title: 'Carga tus documentos',
      description: 'Sube documentos importantes para el producto.',
      button: 'Seleccionar documentos',
      restrictions: 'PDF, DOC o DOCX. Tamaño máximo: 10 MB.',
    },
  }
  return configs[props.type]
})
</script>

<template>
  <div v-if="uppy">
    <UppyContextProvider :uppy="uppy">
      <div
        class="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 p-6"
      >
        <div class="flex gap-6">
          <!-- Icono -->
          <div class="flex-shrink-0">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-600 bg-gray-800/50"
            >
              <AppIcon :name="config.icon" class="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <!-- Contenido -->
          <div class="flex flex-1 flex-col justify-between">
            <div>
              <h3 class="mb-1 text-sm font-semibold text-white">{{ config.title }}</h3>
              <p class="text-sm text-gray-400">{{ config.description }}</p>
            </div>
            <UploadButton>
              <AppIcon name="download" class="h-4 w-4" />
              {{ config.button }}
            </UploadButton>
          </div>
        </div>

        <!-- Restricciones -->
        <p class="mt-4 text-xs text-gray-500">{{ config.restrictions }}</p>
      </div>

      <!-- Lista de archivos -->
      <div v-if="uppy.getFiles().length > 0" class="mt-4">
        <FilesList />
      </div>
    </UppyContextProvider>
  </div>
</template>

<style scoped></style>
