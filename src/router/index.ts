import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ProductList from '@/Products/pages/ProductList.vue'
import LocationPage from '@/Locations/pages/LocationPage.vue'
import TypeProductPage from '@/TypeProducts/pages/TypeProductPage.vue'
import PresentationPage from '@/Presentations/pages/PresentationPage.vue'
import UsagePage from '@/Usages/pages/UsagePage.vue'
import LaboratoryPage from '@/Laboratories/pages/LaboratoryPage.vue'
import OrderPage from '@/Orders/pages/OrderPage.vue'
import SupplierPage from '@/Suppliers/pages/SupplierPage.vue'
import ReimbursementPage from '@/Reimbursements/pages/ReimbursementPage.vue'
import SalePage from '@/Sales/pages/SalePage.vue'
import CustomerPage from '@/Customers/pages/CustomerPage.vue'
import UserPage from '@/Users/pages/UserPage.vue'
import RolePage from '@/Roles/pages/RolePage.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth.store.ts'
import ProductCreate from '@/Products/pages/ProductCreate.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ProductDetail from '@/Products/pages/ProductDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: DashboardView,
          meta: { requiresAuth: true },
        },
        // Almacen
        {
          path: '/products',
          name: 'products',
          component: ProductList,
          meta: { requiresAuth: true },
        },
        {
          path: '/product/create',
          name: 'product.create',
          component: ProductCreate,
          meta: { requiresAuth: true },
        },
        {
          path: '/product/:id',
          name: 'product.detail',
          component: ProductDetail,
          meta: { requiresAuth: true },
        },
        {
          path: 'locations',
          name: 'locations',
          component: LocationPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/type-products',
          name: 'type-products',
          component: TypeProductPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/presentations',
          name: 'presentations',
          component: PresentationPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/usages',
          name: 'usages',
          component: UsagePage,
          meta: { requiresAuth: true },
        },
        {
          path: '/laboratories',
          name: 'laboratories',
          component: LaboratoryPage,
          meta: { requiresAuth: true },
        },
        // Compras
        {
          path: '/orders',
          name: 'orders',
          component: OrderPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/suppliers',
          name: 'suppliers',
          component: SupplierPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/reimbursements',
          name: 'reimbursements',
          component: ReimbursementPage,
          meta: { requiresAuth: true },
        },
        // Ventas
        {
          path: '/sales',
          name: 'sales',
          component: SalePage,
          meta: { requiresAuth: true },
        },
        {
          path: '/customers',
          name: 'customers',
          component: CustomerPage,
          meta: { requiresAuth: true },
        },
        // Acceso
        {
          path: '/users',
          name: 'users',
          component: UserPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/roles',
          name: 'roles',
          component: RolePage,
          meta: { requiresAuth: true },
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/views/NotFound.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach(async (to) => {

  const authStore = useAuthStore()

  if(!authStore.initialized){
    await authStore.initialize()
  }

  if(to.name === 'login' && authStore.isAuthenticated){
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
