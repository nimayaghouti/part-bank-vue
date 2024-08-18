<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getTransaction } from '@/services/getTransactionsService'
import { onMounted } from 'vue'

import TransactionsHeader from './TransactionsHeader.vue'
import TransactionsPagination from './TransactionsPagination.vue'
import TransactionsTable from './TransactionsTable.vue'

const userStore = useUserStore()
const userData = userStore.userData
// const hasDepositAccount = userStore.hasDepositAccount

const props = defineProps({
  hasDepositAccount: {
    type: Boolean,
    required: true
  }
})

const transactionsArray = ref([])
const isDataLoaded = ref(false)

onMounted(async () => {
  try {
    if (props.hasDepositAccount) {
      transactionsArray.value = await getTransaction(userData.token)
      isDataLoaded.value = true
      console.log(transactionsArray.value)
    }
    console.log('isDataLoaded', isDataLoaded.value)
    console.log('hasDepositAccount', props.hasDepositAccount)
    console.log('show transactions', isDataLoaded.value && props.hasDepositAccount)
  } catch (error) {
    console.error(error)
  }
})

const slicedtransactionsArray = ref([])
const setSlicedtransactionsArray = (newSlice) => {
  slicedtransactionsArray.value = newSlice
}
</script>

<template>
  <section class="transactions">
    <TransactionsHeader class="transaction__trans-header" />
    <template v-if="isDataLoaded && hasDepositAccount">
      <TransactionsTable class="transactions__table" :sliced-data-array="slicedtransactionsArray" />
      <TransactionsPagination
        class="transactions__pagination"
        :data-array="transactionsArray"
        :items-per-page="5"
        @slicer="setSlicedtransactionsArray"
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
