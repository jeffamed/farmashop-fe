<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <Breadcrumbs
        :parent-path="{ name: 'Ventas', root: '/sales' }"
        :current-path="{ name: 'Registro de ventas', root: '/sales' }"
      />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
</script>
<style scoped></style>
