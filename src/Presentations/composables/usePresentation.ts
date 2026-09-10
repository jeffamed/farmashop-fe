import { basicApiService, type Payload } from '@/services/basicApiService.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { usePresentationStore } from '@/Presentations/stores/presentation.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef'

export const usePresentation = () => {
  type UpdatePresentationVariables = {
    id: number
    payload: Payload
  }

  const presentationStore = usePresentationStore()
  const { presentations, search } = storeToRefs(presentationStore)
  const queryClient = useQueryClient()
  const debouncedSearch = useDebouncedRef(search)
  const presentationService = basicApiService('presentations')

  const { isPending, data, error, isError } = useQuery({
    queryKey: ['presentations', debouncedSearch],
    queryFn: () => presentationService.getList(debouncedSearch.value),
  })

  watch(data, (presentations) => {
    if (presentations) {
      presentationStore.setPresentations(presentations)
    }
  })

  const createPresentation = useMutation({
    mutationFn: presentationService.saveData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['presentations'],
      })
    },
  })

  const deletePresentation = useMutation({
    mutationFn: presentationService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['presentations'],
      })
    },
  })

  const editPresentation = useMutation({
    mutationFn: ({id, payload}: UpdatePresentationVariables) => presentationService.updateData(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['presentations'],
      })
    },
  })

  return {
    isPending,
    presentations,
    error,
    isError,
    createPresentation,
    deletePresentation,
    editPresentation,
    search
  }
}
