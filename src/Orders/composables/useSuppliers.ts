import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { basicApiService } from '@/services/basicApiService.ts'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef.ts'
import type { OrderSupplier } from '@/Orders/types/Order.ts'

export const useSuppliers = () => {
  const search = ref('')
  const debounce = useDebouncedRef(search)
  const service = basicApiService<OrderSupplier>('suppliers')

  const query = useQuery({
    queryKey: ['suppliers-order', debounce],
    queryFn: () => service.searchData(debounce.value),
  })

  return {
    search,
    suppliers: computed(() => query.data.value ?? []),
    isPending: query.isPending,
    error: query.error,
  }
}
