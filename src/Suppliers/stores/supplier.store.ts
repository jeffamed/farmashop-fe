import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { filterSupplier, Supplier } from '@/Suppliers/types/Supplier.ts'
import type { Meta, PaginatedApiResponse } from '@/types/Response.ts'

export const useSupplierStore = defineStore('supplier', () => {
  const suppliers = ref<Supplier[]>([])

  const filter = ref<filterSupplier>({
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

  const setSuppliers = (data: PaginatedApiResponse<Supplier[]>) => {
    const { data: items, meta } = data
    suppliers.value = items
    pagination.value = meta
  }

  return {
    suppliers,
    filter,
    pagination,
    total: computed(() => pagination.value.total),
    setSuppliers,
  }
})
