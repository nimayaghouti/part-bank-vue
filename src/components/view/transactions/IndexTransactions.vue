<script setup>
import TransactionsHeader from './TransactionsHeader.vue'
import TransactionsPagination from './TransactionsPagination.vue'
import TransactionsTable from './TransactionsTable.vue'

// temporaty table data (transactions)
const tempData = [
  {
    id: 1,
    type: 'withdraw',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 2,
    type: 'deposit',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 3,
    type: 'withdraw',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 4,
    type: 'deposit',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 5,
    type: 'withdraw',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 6,
    type: 'deposit',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 7,
    type: 'withdraw',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 8,
    type: 'deposit',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 9,
    type: 'withdraw',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 10,
    type: 'deposit',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  },
  {
    id: 11,
    type: 'withdraw',
    date: 'Sat Jul 27 2024 16:19:02 GMT+0330 (Iran Standard Time)',
    amount: '21200000'
  }
]

const slicedDataArray = ref([])
const setSlicedData = (newSlice) => {
  slicedDataArray.value = newSlice
}
</script>

<template>
  <section class="transactions">
    <TransactionsHeader class="transaction__trans-header" />
    <TransactionsTable class="transactions__table" :sliced-data-array="slicedDataArray" />
    <TransactionsPagination
      class="transactions__pagination"
      :data-array="tempData"
      :items-per-page="5"
      @slicer="setSlicedData"
    />
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
