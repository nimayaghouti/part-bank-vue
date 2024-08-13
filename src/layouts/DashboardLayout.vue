<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
import Sidebar from '@/components/view/sidebar/TheSidebar.vue'
</script>

<template>
  <TheHeader />
  <main class="container container_watch-header">
    <div class="dashboard">
      <Sidebar class="dashboard__sidebar" />
      <router-view />
    </div>
  </main>
</template>
<style lang="scss">
.dashboard {
  width: 100%;
  height: 100%;
  max-height: 50.25rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
