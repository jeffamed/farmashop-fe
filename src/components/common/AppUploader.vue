<script setup lang="ts">
import Uppy from '@uppy/core'
import UppyImageEditor from '@uppy/image-editor'
import { Dropzone, FilesList, UppyContextProvider } from '@uppy/vue'
import { computed } from 'vue'
import '@uppy/vue/css/style.css'
import '@uppy/vue/css/image-editor.css'

interface Props {
  maxFiles?: number
  maxFileSize?: number
  allowedFileTypes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  maxFiles: 5,
  maxFileSize: 5 * 1024 * 1024,
  allowedFileTypes: () => ['image/jpeg', 'image/png', 'image/webp'],
})

const emit = defineEmits<{
  filesChange: [files: File[]]
}>()

const uppy = computed(() =>
  new Uppy({
    restrictions: {
      maxNumberOfFiles: props.maxFiles,
      allowedFileTypes: props.allowedFileTypes,
      maxFileSize: props.maxFileSize,
    },
  }).use(UppyImageEditor),
)

const getFiles = (): File[] => {
  return uppy.value
    .getFiles()
    .map((file) => file.data)
    .filter((file): file is File => file instanceof File)
}

uppy.value.on('file-added', () => {
  emit('filesChange', getFiles())
})

uppy.value.on('file-removed', () => {
  emit('filesChange', getFiles())
})
</script>

<template>
  <UppyContextProvider :uppy="uppy">
    <div class="uploader-wrapper">
      <div class="dropzone-container">
        <Dropzone />
      </div>
      <div class="files-container">
        <FilesList />
      </div>
    </div>
  </UppyContextProvider>
</template>

<style>
.uploader-wrapper {
  display: flex !important;
  gap: 24px !important;
  align-items: flex-start !important;
}

.dropzone-container {
  flex: 0 0 auto !important;
  width: 260px !important;
}

.files-container {
  flex: 1 !important;
  min-width: 0 !important;
}

.uppy-Dropzone {
  border: 2px dashed #4a5568 !important;
  border-radius: 12px !important;
  background-color: rgba(26, 32, 46, 0.5) !important;
  padding: 32px 16px !important;
  text-align: center !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
}

.uppy-Dropzone:hover {
  border-color: #6b7a99 !important;
  background-color: rgba(26, 32, 46, 0.8) !important;
}

.uppy-Dropzone-inner {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 12px !important;
}

.uppy-Dropzone-icon {
  width: 48px !important;
  height: 48px !important;
  color: #7b8fc0 !important;
}

.uppy-Dropzone-title {
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #e2e8f0 !important;
  margin: 0 !important;
}

.uppy-Dropzone-hint {
  font-size: 12px !important;
  color: #a0aec0 !important;
  margin: 0 !important;
}

.uppy-FileList {
  max-height: 240px !important;
  overflow-y: auto !important;
  padding-right: 8px !important;
  margin: 0 !important;
}

.uppy-FileList-item {
  background-color: rgba(26, 32, 46, 0.7) !important;
  border: 1px solid #4a5568 !important;
  border-radius: 8px !important;
  padding: 12px !important;
  margin-bottom: 8px !important;
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}

.uppy-FileList-item-name {
  color: #e2e8f0 !important;
  font-size: 13px !important;
  flex: 1 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.uppy-FileList-item-preview {
  width: 36px !important;
  height: 36px !important;
  border-radius: 6px !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
}

.uppy-FileList-item-remove {
  background-color: transparent !important;
  color: #ef5350 !important;
  border: none !important;
  cursor: pointer !important;
  padding: 4px 8px !important;
  border-radius: 4px !important;
  font-size: 11px !important;
  flex-shrink: 0 !important;
}

.uppy-FileList-item-remove:hover {
  background-color: rgba(239, 83, 80, 0.1) !important;
}

/* Scrollbar styling */
.uppy-FileList::-webkit-scrollbar {
  width: 6px !important;
}

.uppy-FileList::-webkit-scrollbar-track {
  background: rgba(26, 32, 46, 0.3) !important;
  border-radius: 3px !important;
}

.uppy-FileList::-webkit-scrollbar-thumb {
  background: #4a5568 !important;
  border-radius: 3px !important;
}

.uppy-FileList::-webkit-scrollbar-thumb:hover {
  background: #6b7a99 !important;
}

.uppy-Modal {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.uppy-Modal-inner {
  background-color: #1a202e !important;
  border-radius: 12px !important;
}
</style>
