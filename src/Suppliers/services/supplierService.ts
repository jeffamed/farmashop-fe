import { type filterSupplier, type Supplier, type SupplierData, type SupplierForm } from '../types/Supplier'
import { farmashopApi } from '@/api/axios.ts'
import type { PaginatedApiResponse } from '@/types/Response.ts'

export const supplierService= () => {
    const path = import.meta.env.VITE_PATH_API_VERSION
    const route = `${path}/suppliers`
    return {
      getSuppliers: async (filters: filterSupplier) => {
        const { data: supplier } = await farmashopApi.get<PaginatedApiResponse<Supplier[]>>(
          route,
          { params: filters },
        )
        return supplier
      },
      createSupplier: async (supplier: SupplierForm) => {
        const { data: newSupplier } = await farmashopApi.post<Supplier>(route, supplier)
        return newSupplier
      },
      updateSupplier: async (supplier: SupplierData) => {
        const { data: supplierEdit } = await farmashopApi.put<Supplier>(`${route}/${supplier.id}`, supplier)
        return supplierEdit
      },
      deleteSupplier: async (id: number) => {
        await farmashopApi.delete(`${route}/${id}`)
      }
    }
}
