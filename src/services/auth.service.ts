import { farmashopApi } from '@/api/axios.ts'
import type { LoginPayload, User } from '@/types/Auth.ts'
import { ref } from 'vue'

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
    const { data }  = await farmashopApi.get<User>('/api/user')
    return data
  }
}
