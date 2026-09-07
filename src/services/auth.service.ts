import { farmashopApi } from '@/api/axios.ts'
import type {LoginPayload, User } from '@/types/Auth.ts'
import type { ApiResponse } from '@/types/Response.ts'

export const authService = {

  async csrfCookie() {
    await farmashopApi.get('/sanctum/csrf-cookie')
  },

  async login(payload: LoginPayload) {
    const { data } = await farmashopApi.post('/login', payload)
    return data
  },

  async logout() {
    const { data } = await farmashopApi.post('/logout')
    return data
  },

  async me(){
    const { data } = await farmashopApi.get<ApiResponse<User>>('/api/user')
    return data.data
  }
}
