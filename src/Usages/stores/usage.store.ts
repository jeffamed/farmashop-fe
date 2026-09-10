import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StandardData } from '@/types/StandardData.ts'

export const useUsageStore = defineStore('usage', () => {

  const usages = ref<StandardData[]>([])
  const search = ref<string>('')

  const setUsages = (data: StandardData[]) => {
    usages.value = data
  }

  return {
    usages,
    setUsages,
    search,
  }
})
