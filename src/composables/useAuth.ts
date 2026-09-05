import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { authService } from '@/services/auth.service.ts'
import type { LoginPayload } from '@/types/Auth.ts'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const userQuery = useQuery({
    queryKey: ['auth-user'],
    queryFn: authService.me,
    retry: false,
    staleTime: Infinity
  })

  const login = useMutation({
    mutationFn: async (credentials: LoginPayload) => {
      await authService.csrfCookie()
      return authService.login(credentials)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['auth-user'],
      })
    },
  })

  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth-user'] })
    },
  })

  return {
    user: userQuery.data,
    login,
    logout,
    isAuthenticated: computed(() => !!userQuery.data.value),
  }
}
