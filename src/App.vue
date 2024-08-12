<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const route = useRoute()
const layoutName = ref(route.meta.layout || 'LoginLayout')

watch(
  () => route.meta.layout,
  (newLayout) => {
    layoutName.value = newLayout || 'LoginLayout'
  }
)

const currentLayout = computed(() =>
  defineAsyncComponent(() => import(`@/layouts/${layoutName.value}.vue`))
)
</script>

<template>
  <component :is="currentLayout" />
</template>

<style lang="scss"></style>
