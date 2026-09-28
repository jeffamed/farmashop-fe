import { computed, ref, watch } from 'vue'
import {
  basicApiService,
  type Endpoint,
} from '@/services/basicApiService.ts'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef.ts'
import { useQuery } from '@tanstack/vue-query'
import { useProductStore } from '@/Products/store/product.store.ts'
import { storeToRefs } from 'pinia'

export const useOptionsSearch = (option: Endpoint) => {
  const search = ref('')
  const store = useProductStore()
  const { options } = storeToRefs(store)
  const service = basicApiService(option)
  const debounce = useDebouncedRef(search)

  const query = useQuery({
    queryKey: [option, debounce],
    queryFn: () => service.searchData(debounce.value),
  })

  watch(query.data, (optionValue) => {
    if (optionValue){
      store.setOptions(option, optionValue)
    }
  })

  return {
    search,
    options: computed(() => options.value[option]),
    isPending: query.isPending,
    error: query.error,
  }

}
