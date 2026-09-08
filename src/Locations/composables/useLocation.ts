import { basicApiService, type Payload } from '@/services/basicApiService.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useLocationStore } from '@/Locations/stores/location.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

export const useLocation = () => {

  const locationStore = useLocationStore()
  const { locations } = storeToRefs(locationStore)
  const queryClient = useQueryClient()

  const locationService = basicApiService('locations')

  const { isPending, data, error, isError } = useQuery({
    queryKey: ['location'],
    queryFn: locationService.getList,
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
        queryKey: ['location'],
      })
    },
  })

  const deleteLocation = useMutation({
    mutationFn: locationService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['location'],
      })
    },
  })

  return {
    isPending,
    locations,
    error,
    isError,
    createLocation,
    deleteLocation
  }
}
