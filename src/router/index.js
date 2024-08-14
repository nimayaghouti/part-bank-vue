import { createRouter, createWebHistory } from 'vue-router'

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
      layout: 'LoginLayout'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      layout: 'DashboardLayout'
    }
  },
  {
    path: '/personal-info',
    name: 'personal-info',
    component: () => import('@/views/PersonalInfoView.vue'),
    meta: {
      layout: 'CreateAccountLayout',
      title: 'اطلاعات فردی',
      prevButtonText: 'قبلی',
      nextButtonText: 'ثبت و ادامه'
    }
  },
  {
    path: '/id-card',
    name: 'id-card',
    component: () => import('@/views/UploadIDCardView.vue'),
    meta: {
      layout: 'CreateAccountLayout',
      title: 'تصویر کارت ملی',
      prevButtonText: 'قبلی',
      nextButtonText: 'ثبت و ادامه'
    }
  },
  {
    path: '/confirm-info',
    name: 'confirm-info',
    component: () => import('@/views/ConfirmInfoView.vue'),
    meta: {
      layout: 'CreateAccountLayout',
      title: 'تایید اطلاعات',
      prevButtonText: 'قبلی',
      nextButtonText: 'افتتاح حساب'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/ErrorView.vue'),
    meta: {
      layout: 'LoginLayout'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
