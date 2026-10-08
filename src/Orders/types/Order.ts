export interface OrderList {
  id: number
  code: string
  user: string
  supplier: string
  subtotal: number
  iva: number
  total: number
  created: string
}

// type alias (no interface) so it is assignable to SelectOption (Record<string, OptionValue>)
export type OrderSupplier = {
  id: number
  name: string
  address: string
  phone: string
}

export interface OrderForm {
  invoice_number: string
  supplier_id: number|null
  product_id: number|null
  product_code: string
  product_name: string
  stock: number
  expiration_date: string
  quantity: number
  suggest_price: number
  unit_price: number
  discount: number
  tax: boolean
}


export interface orderDetails {
  product_id: number | null
  product_code: string
  product_name: string
  quantity: number
  unit_price: number
  suggest_price: number
  expire_at: string
  discount: number
  total: number
}
