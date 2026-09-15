import type { PhoneMeta } from 'vue-tel-input'

export interface CustomerForm {
  name: string
  dni: string
  address: string
  email: string
  phone: PhoneMeta | string
}
export interface CustomerData {
  id: number
  name: string
  dni: string
  address: string
  email: string
  phone: PhoneMeta | string
}

export interface Customer extends CustomerData {
  phone_number: string
}

export interface filterCustomer {
  input: string,
  search: string,
  page: number,
  per_page?: number,
}
