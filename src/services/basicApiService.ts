import { farmashopApi } from '@/api/axios.ts'
import type { ApiResponse } from '@/types/Response.ts'
import type { StandardData } from '@/types/StandardData.ts'

export type Endpoint = 'locations' | 'usages' | 'presentations' | 'types' | 'suppliers' | 'laboratories'

export interface Payload {
  name: string
}

export interface PayloadUsage {
  description: string
}

export const basicApiService = <T=StandardData> (endpoint: Endpoint) => {
    return {
      getList: async (search?: string) => {
        const { data } = await farmashopApi.get<ApiResponse<T[]>>(`/api/v1/${endpoint}`, {
          params: { search },
        })
        return data.data
      },
      searchData: async (search?: string) => {
        const { data } = await farmashopApi.get<ApiResponse<T[]>>(`/api/v1/${endpoint}`, {
          params: { search, needPagination: 0, limit: 20, view: 'options' },
        })
        return data.data
      },
      getOne: async (id: string | number) => {
        const { data } = await farmashopApi.get(`/api/v1/${endpoint}/${id}`)
        return data
      },
      saveData: async (payload: Payload | PayloadUsage) => {
        const { data } = await farmashopApi.post(`/api/v1/${endpoint}`, payload)
        return data
      },
      deleteData: async (id: string | number) => {
        console.info(`Deleting ${endpoint} with id: ${id}`)
        await farmashopApi.delete(`/api/v1/${endpoint}/${id}`)
      },
      updateData: async (id: string | number, payload: Payload | PayloadUsage) => {
        const { data } = await farmashopApi.put(`/api/v1/${endpoint}/${id}`, payload)
        return data
      },
    }
}
