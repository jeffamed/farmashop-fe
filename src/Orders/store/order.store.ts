import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Filter } from '@/types/StandardData.ts'
import type { OrderList } from '@/Orders/types/Order.ts'
import type { Meta, PaginatedApiResponse } from '@/types/Response.ts'

export const orderStore = defineStore('order', () => {
  const orders = ref<OrderList[]>([])
  const filter = ref<Filter>({
    input: 'code',
    search: '',
    page: 1,
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

  const setOrders = (data: PaginatedApiResponse<OrderList[]>) => {
    const { data: items, meta } = data
    orders.value = items
    pagination.value = meta
  }
  return {
    orders,
    filter,
    pagination,

    total: computed(() => pagination.value.total),

    setOrders,
  }
})
