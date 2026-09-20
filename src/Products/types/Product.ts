import type { StandardData } from '@/types/StandardData.ts'

export interface ProductForm{
  code: string
  name: string
  unit_price: number
  cost: number
  discount: number
  supplier_id: number
  laboratory_id: number
  presentation_id: number
  location_id: number
  unit_box: number
  type_id: number
  usages: number[]
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

export interface Filter {
  name: string
  code: string
  laboratory: string
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

