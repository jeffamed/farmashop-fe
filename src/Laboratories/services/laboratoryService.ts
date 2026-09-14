import { type filterLaboratory, type Laboratory } from '../types/Laboratory'
import { farmashopApi } from '@/api/axios.ts'
import type { PaginatedApiResponse } from '@/types/Response.ts'

export const laboratoryService= () => {
    const path = import.meta.env.VITE_PATH_API_VERSION
    const route = `${path}/laboratories`
    return {
      getLaboratories: async (filters: filterLaboratory) => {
        const { data: laboratory } = await farmashopApi.get<PaginatedApiResponse<Laboratory[]>>(
          route,
          { params: filters },
        )
        return laboratory
      },
    }
}
