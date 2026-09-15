import { supplierService } from '@/Suppliers/services/supplierService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useSupplierStore } from '@/Suppliers/stores/supplier.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
export const useSupplier = () => {

  const service = supplierService()
  const store = useSupplierStore()
  const { suppliers, filter, total, pagination } = storeToRefs(store)
  const clientQuery = useQueryClient()

  const suppliersData = useQuery({
    queryKey: ['suppliers', filter],
    queryFn: () => service.getSuppliers(store.filter)
  })

  watch(suppliersData.data, (data) => {
    if (data) {
      store.setSuppliers(data)
    }
  })

  const createSupplier = useMutation({
    mutationFn: service.createSupplier,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['suppliers'],
      })
    }
  })

  const deleteSupplier = useMutation({
    mutationFn: service.deleteSupplier,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['suppliers'],
      })
    }
  })

  const editSupplier = useMutation({
    mutationFn: service.updateSupplier,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['suppliers'],
      })
    },
  })

  return{
    suppliersData,
    suppliers,
    filter,
    total,
    pagination,
    createSupplier,
    deleteSupplier,
    editSupplier,
  }
}
