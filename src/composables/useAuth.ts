import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { authService } from '@/services/auth.service.ts'
import type { LoginPayload } from '@/types/Auth.ts'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store.ts'
import type { ValidateErrorResponse } from '@/types/ErrorResponse.ts'
import type { User } from '@/types/Auth.ts'
import type { AxiosError } from 'axios'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const authStore = useAuthStore()

  const userQuery = useQuery({
    queryKey: ['auth-user'],
    queryFn: authService.me,
    retry: false,
    staleTime: Infinity
  })

  const handleLogin = async (credentials: LoginPayload) => {
    await authService.csrfCookie()
    const { data } = await authService.login(credentials)
    const user = await authService.me()
    authStore.setUser(user)
    //return data
  }

  const login = useMutation<User, AxiosError<ValidateErrorResponse>, LoginPayload>({
    mutationFn: handleLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['auth-user'],
      })
    },
  })

  const handleLogout = async () => {
    await authService.logout()
    authStore.clearUser()
  }

  const logout = useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth-user'] })
      router.push({ name: 'login' })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const can = (permission: string) => authStore.can(permission)

  const canAll = (permissions: string[]) => {
    return permissions.some((permission) => can(permission))
  }

  return {
    user: userQuery.data,
    login,
    logout,
    isAuthenticated: computed(() => !!userQuery.data.value),
    full_name: computed(() =>  authStore.user?.name + ' ' + authStore.user?.last_name),
    can,
    canAll
  }
}
