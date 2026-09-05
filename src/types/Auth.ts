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
  //TODO add role and permissions
  //role: string
  //permissions: Permission[]
}
