import { farmashopApi } from '@/api/axios.ts'
import type { ApiResponse } from '@/types/Response.ts'
import type { StandardData } from '@/types/StandardData.ts'

type Endpoint = 'locations' | 'usages' | 'presentations' | 'type-products'

export interface Payload {
  name: string
}

export const basicApiService = (endpoint: Endpoint) => {
    return {
      getList: async () => {
        const { data } = await farmashopApi.get<ApiResponse<StandardData[]>>(`/api/v1/${endpoint}`)
        console.info(data.data)
        return data.data
      },
      getOne: async (id: string|number) => {
        const { data } = await farmashopApi.get(`/api/v1/${endpoint}/${id}`)
        return data
      },
      saveData: async (payload: Payload) => {
        const { data } = await farmashopApi.post(`/api/v1/${endpoint}`, payload)
        return data
      },
      deleteData: async (id: string|number) => {
        const { data } = await farmashopApi.delete(`/api/v1/${endpoint}/${id}`)
        return data
      },
      updateData: async (id: string|number, payload: Payload) => {
        const { data } = await farmashopApi.put(`/api/v1/${endpoint}/${id}`, payload)
        return data
      },
    }
}
