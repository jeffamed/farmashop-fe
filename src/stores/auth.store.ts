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
      const { data } = await authService.me()
      setUser(data)
    } catch (error) {
      clearUser()
      console.error(error)
    } finally {
      initialized.value = true
    }
  }

  const permissions = computed(() => auth.value?.permissions || [])

  const can = (permission: string) => {
    return permissions.value.some((p) => p.name === permission)
  }

  return {
    user: auth,
    initialized,
    isAuthenticated,
    permissions,
    clearUser,
    setUser,
    initialize,
    can
  }
})
