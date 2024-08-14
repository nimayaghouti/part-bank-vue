<script setup>
import AccountCard from '@/components/view/accountcard/AccountCard.vue'
import InstallmentBox from '@/components/view/accountBox/InstallmentBox.vue'
import ScoreBox from '@/components/view/accountBox/ScoreBox.vue'
import IndexTransactions from '@/components/view/transactions/IndexTransactions.vue'
import DashboardDialog from '@/components/view/DashboardDialog.vue'

import { ref } from 'vue'
import { useDataStore } from '@/stores/useDataStore'
import { hasDepositAccount } from '@/composables/useGetDeposit'
import { onMounted } from 'vue'

const dataStore = useDataStore()
const userData = dataStore.userData
// console.log(userData)

const hasAccount = ref(false)

onMounted(async () => {
  hasAccount.value = await hasDepositAccount(userData.token)
  // console.log('hasAccount', hasAccount.value)
})
</script>

<template>
  <section class="dashboard__info info">
    <div class="info__wrapper">
      <AccountCard class="info__account-card" />
      <ScoreBox class="info__account-box" />
      <InstallmentBox class="info__account-box" />
    </div>

    <IndexTransactions class="info__transactions" />
    <DashboardDialog v-if="!hasAccount" class="info__dialog" />
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
