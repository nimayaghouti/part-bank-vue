<script setup>
import IndexTransactions from '@/components/view/transactions/IndexTransactions.vue'
</script>

<template>
  <div class="dashboard__info info">
    <IndexTransactions class="info__transactions" />
  </div>
</template>

<style lang="scss">
.info {
  width: 100rem;
}
</style>
