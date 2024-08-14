<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

import LoginLayout from '@/layouts/LoginLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import CreateAccountLayout from '@/layouts/CreateAccountLayout.vue'

const route = useRoute()

const layoutName = ref(route.meta.layout)

watch(
  () => route.meta.layout,
  (newLayout) => {
    layoutName.value = newLayout
  }
)

const currentLayout = computed(() => {
  switch (layoutName.value) {
    case 'LoginLayout':
      return LoginLayout
    case 'DashboardLayout':
      return DashboardLayout
    case 'CreateAccountLayout':
      return CreateAccountLayout
    default:
      return null
  }
})
</script>

<template>
  <component :is="currentLayout" />
</template>

<style lang="scss"></style>
