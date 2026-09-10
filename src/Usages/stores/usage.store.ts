import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StandardData } from '@/types/StandardData.ts'
export interface Usage {
  id: number
  description: string
}
export const useUsageStore = defineStore('usage', () => {

  const usages = ref<Usage[]>([])
  const search = ref<string>('')

  const setUsages = (data: Usage[]) => {
    usages.value = data
  }

  return {
    usages,
    setUsages,
    search,
  }
})
