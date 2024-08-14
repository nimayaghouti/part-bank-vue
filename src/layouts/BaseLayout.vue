<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main class="container container_watch-header">
    <slot name="content"></slot>
  </main>
</template>
<style lang="scss"></style>
