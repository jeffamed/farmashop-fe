export interface CustomerForm {
  name: string,
  dni: string,
  address: string,
  email: string,
  phone: string
}

export interface Customer {
  id: number
  name: string
  dni: string
  address: string
  email: string
  phone: string
}

export interface filterCustomer {
  input: string,
  search: string,
  page: number,
  per_page?: number,
}
