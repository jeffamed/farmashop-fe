import { useRouteApiRef } from '@/utils/composables/useRouteApiRef.ts'
import type { Filter } from '@/types/StandardData.ts'
import { farmashopApi } from '@/api/axios.ts'
import type { PaginatedApiResponse } from '@/types/Response.ts'
import type { OrderList } from '@/Orders/types/Order.ts'

export const orderService = () => {
  const route = useRouteApiRef('orders')
  return {
    getOrders: async (filters: Filter) => {
      const {data: orders} = await farmashopApi.get<PaginatedApiResponse<OrderList[]>>(route, {params: filters})
      return orders
    },
  }
}
