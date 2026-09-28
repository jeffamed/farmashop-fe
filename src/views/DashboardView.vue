<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import type { IconName } from '@/components/icons/type'

interface Kpi {
  icon: IconName
  iconBg: string
  label: string
  labelColor: string
  value: string
  valueColor: string
  trend: string
  trendDirection: 'up' | 'down'
  trendColor: string
  cardBg: string
}

interface ActivityItem {
  id: number
  icon: IconName
  iconBg: string
  text: string
  time: string
}

const kpis: Kpi[] = [
  {
    icon: 'bar-chart',
    iconBg: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500',
    label: 'Ventas del mes',
    labelColor: 'text-gray-500 dark:text-gray-400',
    value: 'C$ 125,430.75',
    valueColor: 'text-gray-800 dark:text-white/90',
    trend: '12.5%',
    trendDirection: 'up',
    trendColor: 'text-success-600 dark:text-success-500',
    cardBg: 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark',
  },
  {
    icon: 'box-cube',
    iconBg: 'bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500',
    label: 'Compras del mes',
    labelColor: 'text-gray-500 dark:text-gray-400',
    value: 'C$ 87,210.00',
    valueColor: 'text-gray-800 dark:text-white/90',
    trend: '8.1%',
    trendDirection: 'up',
    trendColor: 'text-success-600 dark:text-success-500',
    cardBg: 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark',
  },
  {
    icon: 'archive',
    iconBg: 'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400',
    label: 'Productos en stock',
    labelColor: 'text-gray-500 dark:text-gray-400',
    value: '1,248',
    valueColor: 'text-gray-800 dark:text-white/90',
    trend: '3.4%',
    trendDirection: 'up',
    trendColor: 'text-success-600 dark:text-success-500',
    cardBg: 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark',
  },
  {
    icon: 'warning',
    iconBg: 'bg-error-100 text-error-600 dark:bg-error-500/20 dark:text-error-400',
    label: 'Productos con stock bajo',
    labelColor: 'text-error-600 dark:text-error-400',
    value: '18',
    valueColor: 'text-error-700 dark:text-error-400',
    trend: '28.6%',
    trendDirection: 'down',
    trendColor: 'text-error-600 dark:text-error-400',
    cardBg: 'border-error-100 bg-error-50/60 dark:border-error-500/20 dark:bg-error-500/10',
  },
]

const inventoryMovements = [
  { label: 'Entradas (Compra)', value: '45%', color: 'bg-blue-light-500' },
  { label: 'Salidas (Venta)', value: '38%', color: 'bg-error-500' },
  { label: 'Ajustes', value: '10%', color: 'bg-orange-500' },
  { label: 'Devoluciones', value: '5%', color: 'bg-error-300' },
  { label: 'Otros', value: '2%', color: 'bg-gray-400' },
]

const topProducts = [
  { rank: 1, name: 'Paracetamol 500 mg', sales: 320, revenue: 'C$ 6,400.00' },
  { rank: 2, name: 'Ibuprofeno 400 mg', sales: 280, revenue: 'C$ 7,000.00' },
  { rank: 3, name: 'Amoxicilina 500 mg', sales: 210, revenue: 'C$ 10,500.00' },
  { rank: 4, name: 'Loratadina 10 mg', sales: 195, revenue: 'C$ 5,265.00' },
  { rank: 5, name: 'Omeprazol 20 mg', sales: 180, revenue: 'C$ 7,200.00' },
]

const lowStockProducts = [
  { name: 'Salbutamol Inh.', current: 3, min: 10 },
  { name: 'Losartán 50 mg', current: 5, min: 20 },
  { name: 'Metformina 850 mg', current: 8, min: 20 },
  { name: 'Amlodipino 5 mg', current: 4, min: 15 },
  { name: 'Insulina NPH 100 UI', current: 2, min: 10 },
]

const categorySales = [
  { name: 'Analgésicos', percent: 28, color: 'bg-blue-light-500' },
  { name: 'Antibióticos', percent: 22, color: 'bg-success-500' },
  { name: 'Antihistamínicos', percent: 15, color: 'bg-brand-400' },
  { name: 'Gastrointestinales', percent: 12, color: 'bg-orange-500' },
  { name: 'Cardiovasculares', percent: 10, color: 'bg-error-300' },
  { name: 'Vitaminas', percent: 8, color: 'bg-gray-400' },
  { name: 'Otros', percent: 5, color: 'bg-gray-300' },
]

const lastSales = [
  { id: 'V-001256', date: '12/09/2025 10:24', client: 'Juan Pérez', total: 'C$ 320.00' },
  { id: 'V-001255', date: '12/09/2025 09:15', client: 'Ana García', total: 'C$ 150.00' },
  { id: 'V-001254', date: '11/09/2025 16:40', client: 'Carlos M.', total: 'C$ 480.00' },
  { id: 'V-001253', date: '10/09/2025 14:20', client: 'Laura S.', total: 'C$ 210.00' },
  { id: 'V-001252', date: '10/09/2025 11:05', client: 'Pedro Ruiz', total: 'C$ 375.00' },
]

const lastPurchases = [
  { id: 'C-00089', date: '11/09/2025', supplier: 'Genfar', total: 'C$ 12,500.00' },
  { id: 'C-00088', date: '09/09/2025', supplier: 'Droguería SA', total: 'C$ 8,200.00' },
  { id: 'C-00087', date: '07/09/2025', supplier: 'Pfizer', total: 'C$ 15,300.00' },
  { id: 'C-00086', date: '05/09/2025', supplier: 'Laproff', total: 'C$ 6,750.00' },
  { id: 'C-00085', date: '03/09/2025', supplier: 'Noheli', total: 'C$ 9,400.00' },
]

const recentActivity: ActivityItem[] = [
  {
    id: 1,
    icon: 'box-cube',
    iconBg: 'bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500',
    text: 'Nueva venta V-001256',
    time: 'Hace 12 minutos',
  },
  {
    id: 2,
    icon: 'archive',
    iconBg: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500',
    text: 'Compra C-00089 recibida',
    time: 'Hace 1 hora',
  },
  {
    id: 3,
    icon: 'refresh',
    iconBg: 'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400',
    text: 'Ajuste de inventario',
    time: 'Hace 3 horas',
  },
  {
    id: 4,
    icon: 'warning',
    iconBg: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
    text: 'Producto con stock bajo',
    time: 'Hace 5 horas',
  },
  {
    id: 5,
    icon: 'user-group',
    iconBg: 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400',
    text: 'Nuevo cliente registrado',
    time: 'Hace 1 día',
  },
]
</script>

<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <!-- Header -->
    <div
      class="col-span-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white/90">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Resumen general de tu farmacia</p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 self-start rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5 sm:self-auto"
      >
        <AppIcon name="calendar-2-line" class="h-4 w-4" />
        01/09/2025 - 30/09/2025
        <AppIcon name="chevron-down" class="h-4 w-4" />
      </button>
    </div>

    <!-- KPI cards -->
    <div
      v-for="kpi in kpis"
      :key="kpi.label"
      class="col-span-12 rounded-2xl border p-5 shadow-theme-sm sm:col-span-6 xl:col-span-3"
      :class="kpi.cardBg"
    >
      <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full" :class="kpi.iconBg">
        <AppIcon :name="kpi.icon" class="h-6 w-6" />
      </div>
      <p class="text-sm font-medium" :class="kpi.labelColor">{{ kpi.label }}</p>
      <p class="mt-1 text-2xl font-bold" :class="kpi.valueColor">{{ kpi.value }}</p>
      <p class="mt-1 text-xs font-medium" :class="kpi.trendColor">
        {{ kpi.trendDirection === 'up' ? '↗' : '↘' }} {{ kpi.trend }}
        <span class="font-normal text-gray-400 dark:text-gray-500">vs. mes anterior</span>
      </p>
    </div>

    <!-- Ventas vs Compras -->
    <div
      class="col-span-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 xl:col-span-7 dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="mb-5 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">Ventas vs Compras</h3>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Últimos 9 meses
          <AppIcon name="chevron-down" class="h-3.5 w-3.5" />
        </button>
      </div>
      <div
        class="flex h-72 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500"
      >
        <AppIcon name="bar-chart" class="h-8 w-8" />
        <p class="text-sm">Gráfico próximamente</p>
      </div>
    </div>

    <!-- Movimientos de inventario -->
    <div
      class="col-span-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 xl:col-span-5 dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="mb-5 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">
          Movimientos de inventario
        </h3>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Este mes
          <AppIcon name="chevron-down" class="h-3.5 w-3.5" />
        </button>
      </div>
      <div class="flex flex-col items-center gap-6 sm:flex-row">
        <div
          class="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500"
        >
          <AppIcon name="pie-chart" class="h-8 w-8" />
        </div>
        <ul class="w-full flex-1 space-y-3">
          <li
            v-for="item in inventoryMovements"
            :key="item.label"
            class="flex items-center justify-between text-sm"
          >
            <span class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span class="h-2.5 w-2.5 shrink-0 rounded-full" :class="item.color"></span>
              {{ item.label }}
            </span>
            <span class="font-medium text-gray-800 dark:text-white/90">{{ item.value }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Productos más vendidos -->
    <div
      class="col-span-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 xl:col-span-4 dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">
          Productos más vendidos
        </h3>
        <button
          type="button"
          class="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Ver todos
        </button>
      </div>
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
            <th class="pb-2 font-medium">#</th>
            <th class="pb-2 font-medium">Producto</th>
            <th class="pb-2 text-right font-medium">Ventas</th>
            <th class="pb-2 text-right font-medium">Ingresos</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-for="product in topProducts" :key="product.rank">
            <td class="py-2.5 text-gray-400 dark:text-gray-500">{{ product.rank }}</td>
            <td class="py-2.5 font-medium text-gray-800 dark:text-white/90">{{ product.name }}</td>
            <td class="py-2.5 text-right text-gray-500 dark:text-gray-400">{{ product.sales }}</td>
            <td class="py-2.5 text-right font-medium text-gray-800 dark:text-white/90">
              {{ product.revenue }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Stock bajo -->
    <div
      class="col-span-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 xl:col-span-4 dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">Stock bajo</h3>
        <button
          type="button"
          class="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Ver todas
        </button>
      </div>
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
            <th class="pb-2 font-medium">Producto</th>
            <th class="pb-2 text-right font-medium">Stock actual</th>
            <th class="pb-2 text-right font-medium">Stock mínimo</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-for="product in lowStockProducts" :key="product.name">
            <td class="py-2.5 font-medium text-gray-800 dark:text-white/90">{{ product.name }}</td>
            <td class="py-2.5 text-right font-semibold text-error-600 dark:text-error-500">
              {{ product.current }}
            </td>
            <td class="py-2.5 text-right text-gray-500 dark:text-gray-400">{{ product.min }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Ventas por categoría -->
    <div
      class="col-span-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 xl:col-span-4 dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">
          Ventas por categoría
        </h3>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Este mes
          <AppIcon name="chevron-down" class="h-3.5 w-3.5" />
        </button>
      </div>
      <ul class="space-y-4">
        <li v-for="category in categorySales" :key="category.name">
          <div class="mb-1.5 flex items-center justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-300">{{ category.name }}</span>
            <span class="font-medium text-gray-800 dark:text-white/90">{{ category.percent }}%</span>
          </div>
          <div class="h-2 w-full rounded-full bg-gray-100 dark:bg-white/10">
            <div
              class="h-2 rounded-full"
              :class="category.color"
              :style="{ width: category.percent + '%' }"
            ></div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Últimas ventas -->
    <div
      class="col-span-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 xl:col-span-4 dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">Últimas ventas</h3>
        <button
          type="button"
          class="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Ver todas
        </button>
      </div>
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
            <th class="pb-2 font-medium">#</th>
            <th class="pb-2 font-medium">Fecha</th>
            <th class="pb-2 font-medium">Cliente</th>
            <th class="pb-2 text-right font-medium">Total</th>
            <th class="pb-2 text-right font-medium">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-for="sale in lastSales" :key="sale.id">
            <td class="py-2.5 font-medium text-gray-800 dark:text-white/90">{{ sale.id }}</td>
            <td class="py-2.5 whitespace-nowrap text-gray-500 dark:text-gray-400">{{ sale.date }}</td>
            <td class="py-2.5 text-gray-500 dark:text-gray-400">{{ sale.client }}</td>
            <td class="py-2.5 text-right font-medium text-gray-800 dark:text-white/90">
              {{ sale.total }}
            </td>
            <td class="py-2.5 text-right">
              <span
                class="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500"
              >
                Completada
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Últimas compras -->
    <div
      class="col-span-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 xl:col-span-4 dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">Últimas compras</h3>
        <button
          type="button"
          class="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Ver todas
        </button>
      </div>
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
            <th class="pb-2 font-medium">#</th>
            <th class="pb-2 font-medium">Fecha</th>
            <th class="pb-2 font-medium">Proveedor</th>
            <th class="pb-2 text-right font-medium">Total</th>
            <th class="pb-2 text-right font-medium">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-for="purchase in lastPurchases" :key="purchase.id">
            <td class="py-2.5 font-medium text-gray-800 dark:text-white/90">{{ purchase.id }}</td>
            <td class="py-2.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
              {{ purchase.date }}
            </td>
            <td class="py-2.5 text-gray-500 dark:text-gray-400">{{ purchase.supplier }}</td>
            <td class="py-2.5 text-right font-medium text-gray-800 dark:text-white/90">
              {{ purchase.total }}
            </td>
            <td class="py-2.5 text-right">
              <span
                class="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500"
              >
                Recibida
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Actividad reciente -->
    <div
      class="col-span-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm sm:p-6 xl:col-span-4 dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">Actividad reciente</h3>
        <button
          type="button"
          class="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Ver todas
        </button>
      </div>
      <ul class="space-y-4">
        <li v-for="activity in recentActivity" :key="activity.id" class="flex items-center gap-3">
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            :class="activity.iconBg"
          >
            <AppIcon :name="activity.icon" class="h-4 w-4" />
          </span>
          <p class="flex-1 text-sm text-gray-700 dark:text-gray-300">{{ activity.text }}</p>
          <span class="shrink-0 text-xs text-gray-400 dark:text-gray-500">{{ activity.time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
