import { basicApiService, type Payload } from '@/services/basicApiService.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useLocationStore } from '@/Locations/stores/location.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef'

export const useLocation = () => {
  type UpdateLocationVariables = {
    id: number
    payload: Payload
  }

  const locationStore = useLocationStore()
  const { locations, search } = storeToRefs(locationStore)
  const queryClient = useQueryClient()
  const debouncedSearch = useDebouncedRef(search)
  const locationService = basicApiService('locations')

  const { isPending, data, error, isError } = useQuery({
    queryKey: ['locations', debouncedSearch],
    queryFn: () => locationService.getList(debouncedSearch.value),
  })

  watch(data, (locations) => {
    if (locations) {
      locationStore.setLocations(locations)
    }
  })

  const createLocation = useMutation({
    mutationFn: locationService.saveData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['locations'],
      })
    },
  })

  const deleteLocation = useMutation({
    mutationFn: locationService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['locations'],
      })
    },
  })

  const editLocation = useMutation({
    mutationFn: ({id, payload}: UpdateLocationVariables) => locationService.updateData(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['locations'],
      })
    },
  })

  return {
    isPending,
    locations,
    error,
    isError,
    createLocation,
    deleteLocation,
    editLocation,
    search
  }
}
