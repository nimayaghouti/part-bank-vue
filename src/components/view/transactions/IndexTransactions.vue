<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/useDataStore'
import { getTransaction } from '@/composables/useGetTransactions'
import { onMounted } from 'vue'

import TransactionsHeader from './TransactionsHeader.vue'
import TransactionsPagination from './TransactionsPagination.vue'
import TransactionsTable from './TransactionsTable.vue'

const dataStore = useDataStore()
const userData = dataStore.userData
const hasDepositAccount = dataStore.hasDepositAccount

const transactionsList = ref([])

onMounted(async () => {
  if (hasDepositAccount) {
    transactionsList.value = await getTransaction(userData.token)
    console.log(transactionsList.value)
  }
})

const slicedDataArray = ref([])
const setSlicedData = (newSlice) => {
  slicedDataArray.value = newSlice
}
</script>

<template>
  <section class="transactions">
    <TransactionsHeader class="transaction__trans-header" />
    <template v-if="true">
      <TransactionsTable class="transactions__table" :sliced-data-array="slicedDataArray" />
      <TransactionsPagination
        class="transactions__pagination"
        :data-array="transactionsList"
        :items-per-page="5"
        @slicer="setSlicedData"
      />
    </template>
  </section>
</template>

<style lang="scss">
.transactions {
  width: 100%;
  height: 33rem;
  background-color: #fff;
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  @include box-shadow();
  @include border-radius($radius: 0.75rem);

  &__table {
    margin-top: 1.5rem;
  }

  &__pagination {
    margin-top: auto;
  }
}
</style>
