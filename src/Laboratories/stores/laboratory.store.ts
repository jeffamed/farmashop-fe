import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { filterLaboratory, Laboratory } from '@/Laboratories/types/Laboratory.ts'


export const useLaboratoryStore = defineStore('laboratory',() => {
    const laboratories = ref<Laboratory[]>([])
    const filter = ref<filterLaboratory>({
      input: 'name',
      search: ''
    })

  const setFilter = (filterSearch: filterLaboratory) => {
    filter.value = filterSearch
  }

  const setLaboratories = (data: Laboratory[]) => {
      laboratories.value = data
  }


    return {
      laboratories,
      filter,
      setFilter,
      setLaboratories,
    }
})
