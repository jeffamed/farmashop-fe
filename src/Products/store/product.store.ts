import { defineStore } from 'pinia'
import type { ProductLists } from '@/Products/types/Product.ts'
import { computed, ref } from 'vue'
import type { Meta, PaginatedApiResponse } from '@/types/Response.ts'
import type { Filter } from '@/types/StandardData.ts'

export const useProductStore = defineStore('product', () => {
   const products = ref<ProductLists[]>([])
  const filter = ref<Filter>({
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

  const setProducts = (data: PaginatedApiResponse<ProductLists[]>) => {
    const { data: items, meta } = data
    products.value = items
    pagination.value = meta
  }

  return {
    products,
    pagination,
    filter,
    total: computed(() => pagination.value.total),
    setProducts,
  }
})
