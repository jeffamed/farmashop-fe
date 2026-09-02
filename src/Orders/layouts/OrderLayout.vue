<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <Breadcrumbs
        :parent-path="{ name: 'Compras', root: '/orders' }"
        :current-path="{ name: 'Órdenes de compra', root: '/orders' }"
      />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
</script>
<style scoped></style>
