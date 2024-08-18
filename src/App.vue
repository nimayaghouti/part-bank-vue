<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

import LoginLayout from '@/layouts/LoginLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import CreateAccountLayout from '@/layouts/CreateAccountLayout.vue'
import TheToast from './components/common/TheToast.vue'
import { useAppStore } from './stores/appStore'

const layouts = {
  LoginLayout,
  DashboardLayout,
  CreateAccountLayout
}

const appStore = useAppStore()
const route = useRoute()

const layoutName = ref(route.meta.layout)

watch(
  () => route.meta.layout,
  (newLayout) => {
    layoutName.value = newLayout
  }
)

const currentLayout = computed(() => layouts[layoutName.value] || null)
</script>

<template>
  <component :is="currentLayout" />
  <TheToast
    :isShowing="appStore.isToastShowing"
    :mode="appStore.toastMode"
    :message="appStore.toastMessage"
    :appear-from-x="appStore.appearFromX"
    :appear-from-y="appStore.appearFromY"
  />
</template>

<style lang="scss"></style>
