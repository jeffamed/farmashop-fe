import type { PhoneMeta } from 'vue-tel-input'

export interface SupplierForm {
  name: string,
  ruc: string,
  address: string,
  phone: PhoneMeta | string
}

export interface SupplierData {
  id: number
  name: string,
  ruc: string,
  address: string,
  phone: PhoneMeta | string
}

export interface Supplier extends SupplierData {
  phone_number: string
}

export interface filterSupplier {
  input: string,
  search: string,
  page: number,
  per_page?: number,
}
