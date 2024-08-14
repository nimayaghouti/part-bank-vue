<script setup>
import AccountCard from '@/components/view/accountcard/AccountCard.vue'
import InstallmentBox from '@/components/view/accountBox/InstallmentBox.vue'
import ScoreBox from '@/components/view/accountBox/ScoreBox.vue'
import IndexTransactions from '@/components/view/transactions/IndexTransactions.vue'
import DashboardDialog from '@/components/view/DashboardDialog.vue'

import { ref } from 'vue'
import { useDataStore } from '@/stores/useDataStore'
import { getDepositAccount } from '@/composables/useGetDeposit'
import { onMounted } from 'vue'

const dataStore = useDataStore()
const userData = dataStore.userData
// console.log(userData)

const hasDepositAccount = ref(false)

onMounted(async () => {
  const depositData = await getDepositAccount(userData.token)
  // console.log(depositData)
  hasDepositAccount.value = depositData.id ? true : false
  // console.log('hasDepositAccount', hasDepositAccount.value)
  dataStore.setHasDepositAccount(hasDepositAccount.value)
  dataStore.setDepositData(depositData)
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
    <DashboardDialog v-if="!hasDepositAccount" class="info__dialog" />
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
