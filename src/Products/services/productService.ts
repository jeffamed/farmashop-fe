import { useRouteApiRef } from '@/utils/composables/useRouteApiRef.ts'
import { farmashopApi } from '@/api/axios.ts'
import type { ApiResponse, PaginatedApiResponse } from '@/types/Response.ts'
import type { ProductDetails, ProductForm, ProductLists } from '@/Products/types/Product.ts'
import type { Filter } from '@/types/StandardData.ts'

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

    getProduct: async (id: number) => {
      const { data: product } = await farmashopApi.get<ProductDetails>(`${route}/${id}`)
      return product
    },

    saveProduct: async (payload: ProductForm) => {
      const formData = new FormData()

      formData.append('code', payload.code)
      formData.append('name', payload.name)
      formData.append('price', String(payload.price))
      formData.append('cost', String(payload.cost))
      formData.append('discount', String(payload.discount))
      formData.append('stock', String(payload.stock))
      formData.append('supplier_id', String(payload.supplier_id))
      formData.append('laboratory_id', String(payload.laboratory_id))
      formData.append('presentation_id', String(payload.presentation_id))
      formData.append('location_id', String(payload.location_id))
      formData.append('unit_box', String(payload.unit_box))
      formData.append('type_id', String(payload.type_id))

      payload.usages.forEach((usageId) => {
        formData.append('usages[]', String(usageId))
      })

      if(payload.images !== null && payload.images !== undefined && payload.images.length > 0){
        payload.images.forEach((image) => {
          formData.append('images[]', image)
        })
      }
      const { data } = await farmashopApi.post<ApiResponse<ProductLists>>(route, formData)
      return data
    },

    deleteProduct: async (id: number) => {
      await farmashopApi.delete(`${route}/${id}`)
    },
  }
}
