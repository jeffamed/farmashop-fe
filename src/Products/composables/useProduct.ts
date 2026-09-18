import { productService } from '@/Products/services/productService.ts'
import { useProductStore } from '@/Products/store/product.store.ts'
import { storeToRefs } from 'pinia'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { watch } from 'vue'


export const useProduct = () => {
  const service = productService()
  const store = useProductStore()
  const { products, pagination,  filter, total } = storeToRefs(store)
  const clientQuery = useQueryClient()

  const productsData = useQuery({
    queryKey: ['products', filter],
    queryFn: () => service.getProducts(store.filter),
  })

  watch(productsData.data, (data) => {
    if (data){
      store.setProducts(data)
    }
  })

  const deleteProduct = useMutation({
    mutationFn: service.deleteProduct,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['products'],
      })
    }
  })

  return{
    productsData,
    products,
    total,
    pagination,
    filter,
    deleteProduct,
  }

}
