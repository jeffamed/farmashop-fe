import { orderStore } from '@/Orders/store/order.store.ts'
import { orderService } from '@/Orders/services/orderService.ts'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

export const useOrder = () => {
  const store = orderStore()
  const { orders, filter, pagination, total } = storeToRefs(store)
  const service = orderService()

  const ordersData = useQuery({
    queryKey: ['orders', filter],
    queryFn: () => service.getOrders(store.filter)
  })

  watch(ordersData.data, (data) => {
    if (data){
      store.setOrders(data)
    }
  })

  return{
    orders,
    filter,
    pagination,
    total,
  }
}
