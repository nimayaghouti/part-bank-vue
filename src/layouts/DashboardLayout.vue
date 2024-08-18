<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import Sidebar from '@/components/view/dashboard/sidebar/TheSidebar.vue'
</script>

<template>
  <BaseLayout>
    <template #content>
      <div class="dashboard">
        <Sidebar class="dashboard__sidebar" />
        <router-view />
      </div>
    </template>
  </BaseLayout>
</template>
<style lang="scss">
.dashboard {
  width: 100%;
  height: 100%;
  max-height: 50.25rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  &__info {
    position: relative;
  }
}
</style>
