import { basicApiService, type Payload } from '@/services/basicApiService.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export const useLocation = () => {

  //const queryClient = useQueryClient()

  const locationService = basicApiService('locations')

  const { isPending, data, error, isError } = useQuery({
    queryKey: ['location'],
    queryFn: locationService.getList,
  })

  const createLocation = useMutation({
    mutationFn: locationService.saveData,
    /*onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['location'],
      })
    },*/
  })

  return {
    isPending,
    data,
    error,
    isError,
    createLocation
  }
}
