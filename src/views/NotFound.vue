<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-900">
    <div class="w-full max-w-md text-center">
      <div class="mb-6 flex justify-center">
        <img src="/images/logo/auth-logo.svg" alt="Farmashop" class="h-10 w-auto" />
      </div>

      <div
        class="rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:p-10"
      >
        <div
          class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
        >
          <AppIcon name="search" class="h-8 w-8" />
        </div>

        <h1
          class="text-title-md font-bold leading-tight text-gray-800 dark:text-white/90 sm:text-title-lg"
        >
          404
        </h1>
        <h2 class="mt-2 text-lg font-semibold text-gray-800 dark:text-white/90">
          Página no encontrada
        </h2>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Lo sentimos, la página que buscas no existe o fue movida a otra ubicación.
        </p>

        <router-link
          :to="{ name: 'home' }"
          class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          <AppIcon name="home-outline" class="h-4 w-4" />
          Volver al inicio
        </router-link>
      </div>

      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {{ new Date().getFullYear() }} Farmashop. Todos los derechos reservados.
      </p>
    </div>
  </div>
</template>
