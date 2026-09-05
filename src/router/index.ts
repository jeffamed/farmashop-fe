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
import { authService } from '@/services/auth.service.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    // Almacen
    {
      path: '/products',
      name: 'products',
      component: ProductLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/type-products',
      name: 'type-products',
      component: TypeProductLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/presentations',
      name: 'presentations',
      component: PresentationLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/usages',
      name: 'usages',
      component: UsageLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/laboratories',
      name: 'laboratories',
      component: LaboratoryLayout,
      meta: { requiresAuth: true },
    },
    // Compras
    {
      path: '/orders',
      name: 'orders',
      component: OrderLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: SupplierLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/reimbursements',
      name: 'reimbursements',
      component: ReimbursementLayout,
      meta: { requiresAuth: true },
    },
    // Ventas
    {
      path: '/sales',
      name: 'sales',
      component: SaleLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomerLayout,
      meta: { requiresAuth: true },
    },
    // Acceso
    {
      path: '/users',
      name: 'users',
      component: UserLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleLayout,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {

  const authStore = useAuthStore()

  if(!authStore.initialized){
    await authStore.initialize()
  }

  if(to.name === 'login' && authStore.isAuthenticated){
    console.log('authenticated')
    return {
      name: 'home'
    }
  }

  if(!authStore.isAuthenticated && to.meta.requiresAuth){
    return {
      name: 'login'
    }
  }

  return true

})

export default router
