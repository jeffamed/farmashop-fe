import { useRouteApiRef } from '@/utils/composables/useRouteApiRef.ts'
import type { Filter } from '@/types/StandardData.ts'
import { farmashopApi } from '@/api/axios.ts'
import type { PaginatedApiResponse } from '@/types/Response.ts'
import type { orderDetails, OrderForm, OrderList } from '@/Orders/types/Order.ts'

export const orderService = () => {
  const route = useRouteApiRef('orders')
  return {
    getOrders: async (filters: Filter) => {
      const {data: orders} = await farmashopApi.get<PaginatedApiResponse<OrderList[]>>(route, {params: filters})
      return orders
    },
    createOrder: async (order: OrderForm, details: orderDetails[]) => {
      const payload = {
          supplier_id: order.supplier_id,
          number_order: order.invoice_number,
          iva: order.tax ? 15 : 0,
          subtotal: order.subtotal,
          total: order.total,
          details
      }
      const { data } = await farmashopApi.post<OrderList>(route, payload)
      return data
    }
  }
}
