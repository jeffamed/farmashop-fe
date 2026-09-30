import type { StandardData } from '@/types/StandardData.ts'

type availabilityStock = 'available' | 'low' |'out_of_stock'

export interface ProductForm {
  code: string
  name: string
  price: number
  cost: number
  discount: number
  stock: number
  supplier_id: number
  laboratory_id: number
  presentation_id: number
  location_id: number
  unit_box: number
  type_id: number
  usages: number[]
  images?: File[] | null
}

export interface ProductLists{
  id: number
  name: string
  code: string
  laboratory: string
  type: string
  unit_price: number
  stock: number
  active: boolean
}

export interface MoreFilter {
  availability: availabilityStock | null
  type: number[] | null
  usage: number[] | null
  laboratory: number[] | null
}

export interface Filter {
  input: string
  search: string
  page: number,
  moreFilter: MoreFilter
  //per_page?: number
}

export interface MetaOptions {
  types: StandardData[]
  locations: StandardData[]
  usages: StandardData[]
  presentations: StandardData[]
  laboratories: StandardData[]
  suppliers: StandardData[]
  //suppliers: Record<string, string | number>[]
}

interface Laboratory {
  name: string
  address: string
}

interface Supplier {
  ruc: string,
  name: string
  address: string,
  telephone: string
}

export interface ProductDetails {
  id: number
  code: string
  name: string
  unit_price: number
  cost: number
  discount: number
  stock: number
  presentation: string
  unit_box: number
  type: string
  usages: string[]
  image: string,
  location: string
  laboratory: Laboratory
  supplier: Supplier
}

export interface ProductEdit {
  id: number
  code: string
  name: string
  unit_price: number
  cost: number
  discount: number
  presentation_id: number
  unit_box: number
  type_id: number
  usages: number[]
  image_current: string
  location_id: number
  laboratory_id: number
  supplier_id: number
}
