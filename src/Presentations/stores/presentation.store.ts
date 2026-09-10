import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StandardData } from '@/types/StandardData.ts'

export const usePresentationStore = defineStore('presentation', () => {

  const presentations = ref<StandardData[]>([])
  const search = ref<string>('')

  const setPresentations = (data: StandardData[]) => {
    presentations.value = data
  }

  return {
    presentations,
    setPresentations,
    search,
  }
})
