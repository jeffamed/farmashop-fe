import { productService } from '@/Products/services/productService.ts'
import { useProductStore } from '@/Products/store/product.store.ts'
import { storeToRefs } from 'pinia'
import { useMutation, useQuery, useQueryClient, noop } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import type { AxiosError } from 'axios'
import type { ValidateErrorResponse } from '@/types/ErrorResponse.ts'
import type { ProductForm, ProductLists } from '@/Products/types/Product.ts'
import type { ApiResponse } from '@/types/Response.ts'
import { useRoute } from 'vue-router'


export const useProduct = () => {
  const service = productService()
  const store = useProductStore()
  const { products, pagination,  filter, total } = storeToRefs(store)
  const clientQuery = useQueryClient()
  const route = useRoute()
  const productId = computed(() => Number(route.params.id))
  const routeName = computed(() => route.name)

  const productsData = useQuery({
    queryKey: ['products', filter],
    queryFn: () => service.getProducts(store.filter),
  })

  watch(productsData.data, (data) => {
    if (data){
      store.setProducts(data)
    }
  })

  const productDetail = useQuery({
    queryKey: ['product', productId],
    queryFn: () => service.getProduct(productId.value),
    enabled: !!productId.value && routeName.value === 'product.detail',
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  })

  const productDataEdit = useQuery({
    queryKey: ['product-edit', productId],
    queryFn: () => service.editProduct(productId.value),
    enabled: !!productId.value && routeName.value === 'product.edit',
  })

  const deleteProduct = useMutation({
    mutationFn: service.deleteProduct,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['products'],
      })
    }
  })

  const createProduct = useMutation<ApiResponse<ProductLists>, AxiosError<ValidateErrorResponse>, ProductForm>({
    mutationFn: service.saveProduct,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })

  const updateProduct = useMutation<ApiResponse<ProductLists>, AxiosError<ValidateErrorResponse>, ProductForm>({
    mutationFn: (payload) => service.updateProduct(productId.value, payload),
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['products'],
      })
      clientQuery.invalidateQueries({
        queryKey: ['product-edit', productId],
      })
    },
  })

  const prefethEdit = async (id: number) => {
    await clientQuery
      .query({
        queryKey: ['product-edit', id],
        queryFn: () => service.editProduct(id),
      })
  }

  const handleActiveProduct = useMutation({
    mutationFn: (payload: { id: number, active: boolean }) =>  service.activeProduct(payload.id, payload.active),
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['products'],
      })
    }
  })

  return {
    productsData,
    products,
    total,
    pagination,
    filter,
    deleteProduct,
    createProduct,
    productDetail,
    productDataEdit,
    updateProduct,
    prefethEdit,
    handleSetMoreFilter: store.setMoreFilter,
    handleActiveProduct,
  }

}
