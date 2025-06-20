import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

import AdminPage from '@/components/AdminPage.vue'
import CartPage from '@/components/CartPage.vue'
import ConfirmationPage from '@/components/ConfirmationPage.vue'
import OrderHistory from '@/components/OrderHistory.vue'
import OrderPage from '@/components/OrderPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/cart', component: CartPage, meta: { requiresAuth: true } },
  { path: '/commande', component: OrderPage, meta: { requiresAuth: true } },
  { path: '/confirmation', component: ConfirmationPage },
  { path: '/history', component: OrderHistory, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if ((to.path === '/admin') && !userStore.isAdmin()) {
    return next('/')
  }

  if ((to.path === '/login' || to.path === '/register') && userStore.isAuthenticated()) {
    return next('/')
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

export default router