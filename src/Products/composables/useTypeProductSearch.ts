import { computed, ref, watch } from 'vue'
import { basicApiService } from '@/services/basicApiService.ts'
import { useQuery } from '@tanstack/vue-query'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef.ts'

export const useTypeProductSearch = () => {
  const search = ref('')
  const service = basicApiService('types')
  const debounce = useDebouncedRef(search)

  const query = useQuery({
    queryKey: ['types', debounce],
    queryFn: () => service.searchData(debounce.value),
  })

  const typeProducts = computed(() => {
    return query.data.value ?? []
  })

  return {
    search,
    typeProducts,
    isPending: query.isPending,
    error: query.error,
  }
}
