import { basicApiService, type Payload } from '@/services/basicApiService.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useUsageStore } from '@/Usages/stores/usage.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef'

export const useUsage = () => {
  type UpdateUsageVariables = {
    id: number
    payload: Payload
  }

  const usageStore = useUsageStore()
  const { usages, search } = storeToRefs(usageStore)
  const queryClient = useQueryClient()
  const debouncedSearch = useDebouncedRef(search)
  const usageService = basicApiService('usages')

  const { isPending, data, error, isError } = useQuery({
    queryKey: ['usages', debouncedSearch],
    queryFn: () => usageService.getList(debouncedSearch.value),
  })

  watch(data, (usages) => {
    if (usages) {
      usageStore.setUsages(usages)
    }
  })

  const createUsage = useMutation({
    mutationFn: usageService.saveData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usages'],
      })
    },
  })

  const deleteUsage = useMutation({
    mutationFn: usageService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usages'],
      })
    },
  })

  const editUsage = useMutation({
    mutationFn: ({id, payload}: UpdateUsageVariables) => usageService.updateData(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usages'],
      })
    },
  })

  return {
    isPending,
    usages,
    error,
    isError,
    createUsage,
    deleteUsage,
    editUsage,
    search
  }
}
