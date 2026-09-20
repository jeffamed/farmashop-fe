export interface StandardData {
  id: number
  name: string
}

export interface Filter{
  input: string
  search: string
  page: number
  per_page?: number
}
