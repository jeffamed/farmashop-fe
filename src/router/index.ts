import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import ProductLayout from '@/Products/layouts/ProductLayout.vue'
import LocationLayout from '@/Locations/layouts/LocationLayout.vue'
import TypeProductLayout from '@/TypeProducts/layouts/TypeProductLayout.vue'
import PresentationLayout from '@/Presentations/layouts/PresentationLayout.vue'
import UsageLayout from '@/Usages/layouts/UsageLayout.vue'
import LaboratoryLayout from '@/Laboratories/layouts/LaboratoryLayout.vue'
import OrderLayout from '@/Orders/layouts/OrderLayout.vue'
import SupplierLayout from '@/Suppliers/layouts/SupplierLayout.vue'
import ReimbursementLayout from '@/Reimbursements/layouts/ReimbursementLayout.vue'
import SaleLayout from '@/Sales/layouts/SaleLayout.vue'
import CustomerLayout from '@/Customers/layouts/CustomerLayout.vue'
import UserLayout from '@/Users/layouts/UserLayout.vue'
import RoleLayout from '@/Roles/layouts/RoleLayout.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // Almacen
    {
      path: '/products',
      name: 'products',
      component: ProductLayout,
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationLayout,
    },
    {
      path: '/type-products',
      name: 'type-products',
      component: TypeProductLayout,
    },
    {
      path: '/presentations',
      name: 'presentations',
      component: PresentationLayout,
    },
    {
      path: '/usages',
      name: 'usages',
      component: UsageLayout,
    },
    {
      path: '/laboratories',
      name: 'laboratories',
      component: LaboratoryLayout,
    },
    // Compras
    {
      path: '/orders',
      name: 'orders',
      component: OrderLayout,
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: SupplierLayout,
    },
    {
      path: '/reimbursements',
      name: 'reimbursements',
      component: ReimbursementLayout,
    },
    // Ventas
    {
      path: '/sales',
      name: 'sales',
      component: SaleLayout,
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomerLayout,
    },
    // Acceso
    {
      path: '/users',
      name: 'users',
      component: UserLayout,
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleLayout,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

export default router
