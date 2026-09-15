import { type filterCustomer, type Customer, type CustomerForm } from '../types/Customer'
import { farmashopApi } from '@/api/axios.ts'
import type { PaginatedApiResponse } from '@/types/Response.ts'

export const customerService= () => {
    const path = import.meta.env.VITE_PATH_API_VERSION
    const route = `${path}/customers`
    return {
      getCustomers: async (filters: filterCustomer) => {
        const { data: customer } = await farmashopApi.get<PaginatedApiResponse<Customer[]>>(
          route,
          { params: filters },
        )
        return customer
      },
      createCustomer: async (customer: CustomerForm) => {
        const { data: newCustomer } = await farmashopApi.post<Customer>(route, customer)
        return newCustomer
      },
      updateCustomer: async (customer: Customer) => {
        const { data: customerEdit } = await farmashopApi.put<Customer>(`${route}/${customer.id}`, customer)
        return customerEdit
      },
      deleteCustomer: async (id: number) => {
        await farmashopApi.delete(`${route}/${id}`)
      }
    }
}
