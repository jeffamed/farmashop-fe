import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StandardData } from '@/types/StandardData.ts'

export const useLocationStore = defineStore('location', () => {

  const locations = ref<StandardData[]>([])
  const search = ref<string>('')

  const setLocations = (data: StandardData[]) => {
    locations.value = data
  }

  return {
    locations,
    setLocations,
    search,
  }
})
