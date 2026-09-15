import { customerService } from '@/Customers/services/customerService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useCustomerStore } from '@/Customers/stores/customer.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
export const useCustomer = () => {

  const service = customerService()
  const store = useCustomerStore()
  const { customers, filter, total, pagination } = storeToRefs(store)
  const clientQuery = useQueryClient()

  const customersData = useQuery({
    queryKey: ['customers', filter],
    queryFn: () => service.getCustomers(store.filter)
  })

  watch(customersData.data, (data) => {
    if (data) {
      store.setCustomers(data)
    }
  })

  const createCustomer = useMutation({
    mutationFn: service.createCustomer,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['customers'],
      })
    }
  })

  const deleteCustomer = useMutation({
    mutationFn: service.deleteCustomer,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['customers'],
      })
    }
  })

  const editCustomer = useMutation({
    mutationFn: service.updateCustomer,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['customers'],
      })
    },
  })

  return{
    customersData,
    customers,
    filter,
    total,
    pagination,
    createCustomer,
    deleteCustomer,
    editCustomer,
  }
}
