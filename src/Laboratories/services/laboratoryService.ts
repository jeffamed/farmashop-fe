import { type filterLaboratory, type Laboratory, type LaboratoryForm } from '../types/Laboratory'
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
      createLaboratory: async (laboratory: LaboratoryForm) => {
        const { data: newLaboratory } = await farmashopApi.post<Laboratory>(route, laboratory)
        return newLaboratory
      },
      updateLaboratory: async (laboratory: Laboratory) => {
        const { data: laboratoryEdit } = await farmashopApi.put<Laboratory>(`${route}/${laboratory.id}`, laboratory)
        return laboratoryEdit
      },
      deleteLaboratory: async (id: number) => {
        await farmashopApi.delete(`${route}/${id}`)
      }
    }
}
