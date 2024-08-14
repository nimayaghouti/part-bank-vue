import { createRouter, createWebHistory } from 'vue-router'
import LoginLayout from '@/layouts/LoginLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import CreateAccountLayout from '@/layouts/CreateAccountLayout.vue'

const routes = [
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue')
      }
    ]
  },
  {
    path: '/createaccount',
    component: CreateAccountLayout,
    children: [
      {
        path: 'personal-info',
        name: 'personal-info',
        component: () => import('@/views/PersonalInfoView.vue'),
        meta: { title: 'اطلاعات فردی', prevButtonText: 'قبلی', nextButtonText: 'ثبت و ادامه' }
      },
      {
        path: 'id-card',
        name: 'id-card',
        component: () => import('@/views/UploadIDCardView.vue'),
        meta: { title: 'تصویر کارت ملی', prevButtonText: 'قبلی', nextButtonText: 'ثبت و ادامه' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
