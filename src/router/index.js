import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      layout: 'LoginLayout',
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      layout: 'DashboardLayout',
      requiresAuth: true
    }
  },
  {
    path: '/personal-info',
    name: 'personal-info',
    component: () => import('@/views/PersonalInfoView.vue'),
    meta: {
      layout: 'CreateAccountLayout',
      title: 'اطلاعات فردی',
      requiresAuth: true,
      requiresAccountCreation: true
    }
  },
  {
    path: '/id-card',
    name: 'id-card',
    component: () => import('@/views/UploadIDCardView.vue'),
    meta: {
      layout: 'CreateAccountLayout',
      title: 'تصویر کارت ملی',
      requiresAuth: true,
      requiresAccountCreation: true
    }
  },
  {
    path: '/confirm-info',
    name: 'confirm-info',
    component: () => import('@/views/ConfirmInfoView.vue'),
    meta: {
      layout: 'CreateAccountLayout',
      title: 'تایید اطلاعات',
      requiresAuth: true,
      requiresAccountCreation: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/ErrorView.vue'),
    meta: {
      layout: 'LoginLayout',
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedin
  const hasDepositAccount = userStore.hasDepositAccount

  if (isLoggedIn && to.name === 'login') {
    next({ name: 'dashboard' })
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.requiresAccountCreation && hasDepositAccount) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
