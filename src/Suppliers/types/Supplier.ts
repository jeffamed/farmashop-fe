export interface SupplierForm {
  name: string,
  ruc: string,
  address: string,
  phone: string
}

export interface Supplier{
  id : number,
  name: string,
  ruc: string,
  address: string,
  phone: string
}

export interface filterSupplier {
  input: string,
  search: string,
  page: number,
  per_page?: number,
}
