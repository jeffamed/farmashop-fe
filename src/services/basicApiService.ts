import { farmashopApi } from '@/api/axios.ts'

type Endpoint = 'locations' | 'usages' | 'presentations' | 'type-products'

export interface Payload {
  name: string
}

export const basicApiService = (endpoint: Endpoint) => {
    return {
      getList: async () => {
        const { data } = await farmashopApi.get(`/${endpoint}`)
        return data
      },
      getOne: async (id: string|number) => {
        const { data } = await farmashopApi.get(`/${endpoint}/${id}`)
        return data
      },
      saveData: async (payload: Payload) => {
        const { data } = await farmashopApi.post(`/${endpoint}`, payload)
        return data
      },
      deleteData: async (id: string|number) => {
        const { data } = await farmashopApi.delete(`/${endpoint}/${id}`)
        return data
      },
      updateData: async (id: string|number, payload: Payload) => {
        const { data } = await farmashopApi.put(`/${endpoint}/${id}`, payload)
        return data
      },
    }
}
