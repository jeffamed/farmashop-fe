import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StandardData } from '@/types/StandardData.ts'

export const useTypeProductStore = defineStore('typeProduct', () => {

  const typeProducts = ref<StandardData[]>([])
  const search = ref<string>('')

  const setTypeProducts = (data: StandardData[]) => {
    typeProducts.value = data
  }

  return {
    typeProducts,
    setTypeProducts,
    search,
  }
})
