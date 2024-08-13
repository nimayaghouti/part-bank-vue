<script setup>
import AccountCard from '@/components/view/accountcard/AccountCard.vue'
import IndexTransactions from '@/components/view/transactions/IndexTransactions.vue'
</script>

<template>
  <section class="dashboard__info info">
    <div class="info__wrapper">
      <AccountCard class="info__card" />
    </div>
    <IndexTransactions class="info__transactions">
  </section>
</template>

<style lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__wrapper {
    display: flex;
    gap: 1rem;
  }

  &__dialog {
    position: absolute; // relative to .info
    top: 0;
    left: 0;
  }
}
</style>
