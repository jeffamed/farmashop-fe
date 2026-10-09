import { orderStore } from '@/Orders/store/order.store.ts'
import { orderService } from '@/Orders/services/orderService.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { productService } from '@/Products/services/productService.ts'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef.ts'
import type { orderDetails, OrderForm } from '@/Orders/types/Order.ts'

export const useOrder = () => {
  const search_product = ref('')
  const debounce_product = useDebouncedRef(search_product, 500)
  const store = orderStore()
  const { orders, filter, pagination, total } = storeToRefs(store)
  const service = orderService()
  const { searchProducts } = productService()
  const clientQuery = useQueryClient()

  const ordersData = useQuery({
    queryKey: ['orders', filter],
    queryFn: () => service.getOrders(store.filter)
  })

  const productsData = useQuery({
    queryKey: ['products-order', debounce_product],
    queryFn: () => searchProducts(debounce_product.value),
  })

  watch(ordersData.data, (data) => {
    if (data){
      store.setOrders(data)
    }
  })

  const createOrder = useMutation({
    mutationFn: (payload:{order: OrderForm, details: orderDetails[]}) =>  service.createOrder(payload.order, payload.details),
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['orders']
      })
    }
  })

  return{
    orders,
    filter,
    pagination,
    total,

    search_product,
    productsData,
    createOrder
  }
}
