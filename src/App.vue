<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
import { Notivue, Notification } from 'notivue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>
