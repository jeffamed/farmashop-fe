import { useRouteApiRef } from '@/utils/composables/useRouteApiRef.ts'
import { farmashopApi } from '@/api/axios.ts'
import type { ApiResponse, PaginatedApiResponse } from '@/types/Response.ts'
import type { ProductForm, ProductLists } from '@/Products/types/Product.ts'
import type { Filter } from '@/types/StandardData.ts'
import type { Payload, PayloadUsage } from '@/services/basicApiService.ts'

export const productService = () => {
  const route = useRouteApiRef('products')
  return {
    getProducts: async (filters: Filter) => {
      const { data: products } = await farmashopApi.get<PaginatedApiResponse<ProductLists[]>>(
        route,
        { params: filters },
      )
      return products
    },
    saveProduct: async (payload: ProductForm) => {
      const { data } = await farmashopApi.post<ApiResponse<ProductLists>>(route, payload)
      return data
    },
    deleteProduct: async (id: number) => {
      await farmashopApi.delete(`${route}/${id}`)
    },
  }
}
