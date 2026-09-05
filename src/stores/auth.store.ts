// stores/auth.store.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@/types/Auth.ts'
import { authService } from '@/services/auth.service.ts'

export const useAuthStore = defineStore('auth', () =>  {
  const auth = ref<User|null>(null)
  const initialized = ref<boolean>(false)

  const isAuthenticated = computed(() => !!auth.value)

  const clearUser = () => {
    auth.value = null
  }

  const setUser = (user: User) => {
    auth.value = user
  }

  const initialize = async () => {
    try {
      const data: User = await authService.me()
      setUser(data)
    } catch (error) {
      clearUser()
      console.error(error)
    } finally {
      initialized.value = true
    }
  }

  return {
    user: auth,
    initialized,
    isAuthenticated,
    clearUser,
    setUser,
    initialize,
  }
})
