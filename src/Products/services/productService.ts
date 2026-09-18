import { useRouteApiRef } from '@/utils/composables/useRouteApiRef.ts'
import { farmashopApi } from '@/api/axios.ts'
import type { PaginatedApiResponse } from '@/types/Response.ts'
import type { ProductLists } from '@/Products/types/Product.ts'
import type { Filter } from '@/types/StandardData.ts'

export const productService = () => {
  const route = useRouteApiRef('products')
  return{
    getProducts: async (filters: Filter) => {
      const { data: products } = await farmashopApi.get<PaginatedApiResponse<ProductLists[]>>(route, {params: filters})
      return products
    },
    deleteProduct: async (id: number) => {
      await farmashopApi.delete(`${route}/${id}`)
    }
  }
}
