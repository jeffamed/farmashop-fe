import type { StandardData } from '@/types/StandardData.ts'

type availabilityStock = 'available' | 'low' |'out_of_stock'

export interface ProductForm{
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

