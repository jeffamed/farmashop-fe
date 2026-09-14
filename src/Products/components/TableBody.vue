<script setup lang="ts"></script>

<template>
  <div> el contenidod de la tabla esta comentado aqui</div>
  <!-- Table -->
  <!--<div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr class="border-b border-gray-200 dark:border-gray-800">
          <th
            class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Producto
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Laboratorio
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Categoría
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Precio
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Estado
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Opciones
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
        <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <p class="font-medium text-gray-800 dark:text-white/90">Acetaminofén 500mg</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1042</p>
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Lab Génesis
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Analgésicos
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
          >
            C$ 12.50
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <span
              class="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500"
            >
              Disponible · 240
            </span>
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <div class="flex items-center justify-end gap-1">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                  />
                </svg>
                <span class="sr-only">Editar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="trash" class="h-4 w-4" />
                <span class="sr-only">Eliminar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="horizontal-dots" class="h-4 w-4" />
                <span class="sr-only">Más opciones</span>
              </button>
            </div>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <p class="font-medium text-gray-800 dark:text-white/90">Amoxicilina 250mg susp.</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1043</p>
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            FarmaNova
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Antibióticos
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
          >
            C$ 45.00
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <span
              class="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-500"
            >
              Stock bajo · 18
            </span>
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <div class="flex items-center justify-end gap-1">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                  />
                </svg>
                <span class="sr-only">Editar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="trash" class="h-4 w-4" />
                <span class="sr-only">Eliminar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="horizontal-dots" class="h-4 w-4" />
                <span class="sr-only">Más opciones</span>
              </button>
            </div>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <p class="font-medium text-gray-800 dark:text-white/90">Ibuprofeno 400mg</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1044</p>
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Lab Génesis
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Analgésicos
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
          >
            C$ 22.75
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <span
              class="inline-flex items-center rounded-full bg-error-50 px-2.5 py-1 text-xs font-medium text-error-700 dark:bg-error-500/15 dark:text-error-500"
            >
              Agotado · 0
            </span>
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <div class="flex items-center justify-end gap-1">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                  />
                </svg>
                <span class="sr-only">Editar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="trash" class="h-4 w-4" />
                <span class="sr-only">Eliminar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="horizontal-dots" class="h-4 w-4" />
                <span class="sr-only">Más opciones</span>
              </button>
            </div>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <p class="font-medium text-gray-800 dark:text-white/90">Loratadina 10mg</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1045</p>
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Vitalis
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Antihistamínicos
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
          >
            C$ 18.90
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <span
              class="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500"
            >
              Disponible · 96
            </span>
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <div class="flex items-center justify-end gap-1">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                  />
                </svg>
                <span class="sr-only">Editar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="trash" class="h-4 w-4" />
                <span class="sr-only">Eliminar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="horizontal-dots" class="h-4 w-4" />
                <span class="sr-only">Más opciones</span>
              </button>
            </div>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <p class="font-medium text-gray-800 dark:text-white/90">Omeprazol 20mg</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1046</p>
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            FarmaNova
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Gastro
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
          >
            C$ 34.40
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <span
              class="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-500"
            >
              Stock bajo · 7
            </span>
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <div class="flex items-center justify-end gap-1">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                  />
                </svg>
                <span class="sr-only">Editar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="trash" class="h-4 w-4" />
                <span class="sr-only">Eliminar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="horizontal-dots" class="h-4 w-4" />
                <span class="sr-only">Más opciones</span>
              </button>
            </div>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <p class="font-medium text-gray-800 dark:text-white/90">Suero oral 500ml</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">PRD-1047</p>
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Hidralab
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm text-gray-500 dark:text-gray-400 sm:px-6"
          >
            Hidratación
          </td>
          <td
            class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 sm:px-6"
          >
            C$ 9.99
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <span
              class="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500"
            >
              Disponible · 310
            </span>
          </td>
          <td class="whitespace-nowrap px-5 py-4 sm:px-6">
            <div class="flex items-center justify-end gap-1">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                  />
                </svg>
                <span class="sr-only">Editar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="trash" class="h-4 w-4" />
                <span class="sr-only">Eliminar</span>
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <AppIcon name="horizontal-dots" class="h-4 w-4" />
                <span class="sr-only">Más opciones</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>-->
</template>

<style scoped></style>
