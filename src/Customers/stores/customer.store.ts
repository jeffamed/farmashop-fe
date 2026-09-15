import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { filterCustomer, Customer } from '@/Customers/types/Customer.ts'
import type { Meta, PaginatedApiResponse } from '@/types/Response.ts'

export const useCustomerStore = defineStore('customer', () => {
  const customers = ref<Customer[]>([])

  const filter = ref<filterCustomer>({
    input: 'name',
    search: '',
    page: 1
  })
  const pagination = ref<Meta>({
    total: 0,
    current_page: 1,
    from: 1,
    last_page: 1,
    path: '',
    per_page: 10,
    to: 10,
  })

  const setCustomers = (data: PaginatedApiResponse<Customer[]>) => {
    const { data: items, meta } = data
    customers.value = items
    pagination.value = meta
  }

  return {
    customers,
    filter,
    pagination,
    total: computed(() => pagination.value.total),
    setCustomers,
  }
})
