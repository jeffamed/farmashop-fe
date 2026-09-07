export interface LoginPayload {
  email: string
  password: string
}

export interface Permission {
  name: string
  id: number
}

export interface User {
  name: string,
  last_name: string,
  email: string
  role: string
  permissions: Permission[]
}
