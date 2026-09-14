export interface ApiResponse<T> {
  data: T
}

export interface PaginatedApiResponse<T> {
  data: T
  meta: Meta
}

export interface Links {
  first: string
  last: string
  prev: string|null
  next: string|null
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links?: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url?: string
  label: string
  page?: number
  active: boolean
}
