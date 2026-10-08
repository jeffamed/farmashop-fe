import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { productService } from '@/Products/services/productService.ts'

export const useProduct = () => {
  const service = productService()
  const search = ref('')

  const query = useQuery({
    queryKey: ['product-order', search],
    queryFn: () => service.searchProductByCode(search.value),
    enabled: computed(() => search.value.length > 0),
  })

  return {
    search,
    product: computed(() => query.data.value ?? null),
    isPending: query.isPending,
    error: query.error,
  }
}
