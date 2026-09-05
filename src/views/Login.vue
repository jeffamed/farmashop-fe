<script setup lang="ts">
import { useAuth } from '@/composables/useAuth.ts'
import type { LoginPayload } from '@/types/Auth.ts'
import AppIcon from '@/components/icons/AppIcon.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuth()

const form: LoginPayload = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)

const handleSubmit = () => {
  login.mutate(form, {
    onSuccess: () => {
      router.push({ name: 'home' })
    }
  })
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-900">
    <div class="w-full max-w-md">
      <div class="mb-6 flex justify-center">
        <img src="/images/logo/auth-logo.svg" alt="Farmashop" class="h-10 w-auto" />
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:p-8">
        <div class="mb-6 text-center">
          <h3 class="text-title-sm font-semibold text-gray-800 dark:text-white/90">Iniciar sesión</h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        <div
          v-if="login.isError.value"
          class="mb-5 flex items-start gap-2 rounded-xl border border-error-500/20 bg-error-50 px-4 py-3 text-sm text-error-500 dark:border-error-500/30 dark:bg-error-500/15"
        >
          <AppIcon name="error" class="mt-0.5 h-4 w-4 shrink-0" />
          <span>Correo electrónico o contraseña incorrectos. Inténtalo nuevamente.</span>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="space-y-5">
            <div>
              <label for="email" class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90">
                Correo electrónico<span class="text-error-500">*</span>
              </label>
              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <AppIcon name="mail" class="h-5 w-5" />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="form.email"
                  required
                  autocomplete="email"
                  placeholder="info@farmashop.com"
                  class="block w-full rounded-full border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block mb-2.5 text-sm font-medium text-gray-800 dark:text-white/90">
                Contraseña<span class="text-error-500">*</span>
              </label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  id="password"
                  v-model="form.password"
                  required
                  autocomplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  class="block w-full rounded-full border border-gray-300 bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
                />
                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  @click="showPassword = !showPassword"
                >
                  <AppIcon :name="showPassword ? 'eye-close' : 'eye'" class="h-5 w-5" />
                  <span class="sr-only">{{ showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña' }}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="login.isPending.value"
              class="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <AppIcon v-if="login.isPending.value" name="spinner" class="h-4 w-4 animate-spin text-white" />
              {{ login.isPending.value ? 'Ingresando...' : 'Iniciar sesión' }}
            </button>
          </div>
        </form>
      </div>

      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {{ new Date().getFullYear() }} Farmashop. Todos los derechos reservados.
      </p>
    </div>
  </div>
</template>
