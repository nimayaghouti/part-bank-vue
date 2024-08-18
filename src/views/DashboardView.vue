<script setup>
import AccountCard from '@/components/view/dashboard/AccountCard.vue'
import InstallmentBox from '@/components/view/dashboard/accountBox/InstallmentBox.vue'
import ScoreBox from '@/components/view/dashboard/accountBox/ScoreBox.vue'
import IndexTransactions from '@/components/view/dashboard/transactions/IndexTransactions.vue'
import DashboardDialog from '@/components/view/dashboard/DashboardDialog.vue'

import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getDepositAccount } from '@/services/getDepositService'

const userStore = useUserStore()
const userData = userStore.userData
// console.log(userData)

const hasDepositAccount = ref(false)
const depositData = ref([])
const hasDataLoaded = ref(false)

onMounted(async () => {
  try {
    depositData.value = await getDepositAccount(userData.token)

    hasDepositAccount.value = depositData.value?.id ? true : false
    hasDataLoaded.value = true

    userStore.setHasDepositAccount(hasDepositAccount.value)
    userStore.setDepositData(depositData.value)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <section class="dashboard__info info">
    <template v-if="hasDataLoaded">
      <div class="info__wrapper">
        <AccountCard
          class="info__account-card"
          :deposit-data="depositData"
          :has-deposit-account="hasDepositAccount"
        />
        <ScoreBox
          class="info__account-box"
          :deposit-data="depositData"
          :has-deposit-account="hasDepositAccount"
        />
        <InstallmentBox
          class="info__account-box"
          :deposit-data="depositData"
          :has-deposit-account="hasDepositAccount"
        />
      </div>

      <IndexTransactions
        class="info__transactions"
        :deposit-data="depositData"
        :has-deposit-account="hasDepositAccount"
      />
    </template>

    <DashboardDialog v-if="!hasDepositAccount" class="info__dialog" />
  </section>
</template>

<style lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 72.75rem;

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
