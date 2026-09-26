import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { farmashopApi } from '@/api/axios.ts'
import type { Payload } from '../types/DrawerForm'
export const useModule = () => {

  const clientQuery = useQueryClient()
  const saveModule = async (payload:Payload) => {
    const { data } = await farmashopApi.post(`/api/v1/${payload.route}`, payload)
    return data;
  }

  const clientCache = (cache: string) => {
    clientQuery.invalidateQueries({
      queryKey: [cache],
    })
  }

  const createModule = useMutation({
    mutationFn: (payload: Payload) => saveModule(payload),
  })

  return {
    createModule,
    clientCache
  }
}
