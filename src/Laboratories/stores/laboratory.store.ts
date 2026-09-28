import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { filterLaboratory, Laboratory } from '@/Laboratories/types/Laboratory.ts'
import type { Meta, PaginatedApiResponse } from '@/types/Response.ts'

export const useLaboratoryStore = defineStore('laboratory', () => {
  const laboratories = ref<Laboratory[]>([])

  const filter = ref<filterLaboratory>({
    input: 'name',
    search: '',
    page: 1
  })
  const pagination = ref<Meta>({
    total: 0,
    current_page: 1,
    from: 1,
    last_page: 1,
    path: '',
    per_page: 10,
    to: 10,
  })

  const setLaboratories = (data: PaginatedApiResponse<Laboratory[]>) => {
    const { data: items, meta } = data
    laboratories.value = items
    pagination.value = meta
  }

  return {
    laboratories,
    filter,
    pagination,
    total: computed(() => pagination.value.total),
    setLaboratories,
  }
})
