<script setup>
import { onUpdated } from 'vue'

const props = defineProps({
  slicedDataArray: {
    type: Array,
    required: true
  }
})

onUpdated(() => {
  console.log('table', props.slicedDataArray)
})

// modify table data into persian format //////////////

const formatType = (type) => {
  return type === 'deposit' ? 'واریز' : 'برداشت'
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString('fa-IR', 'numeric')
}

const formatAmount = (amount) => {
  return parseInt(amount).toLocaleString('fa-IR')
}

const setIcon = (type) => {
  return `@/assets/svg/icons/dashboard/money-${type}.svg`
}
// const TransactionIcon = (src) => import(`@/assets/icons/${src}.vue`)

</script>

<template>
  <table class="table">
    <thead class="table__head">
      <tr class="table__row">
        <td>نوع تراکنش</td>
        <td>تاریخ و ساعت تراکنش</td>
        <td>مبلغ تراکنش</td>
      </tr>
    </thead>

    <tbody class="table__body">
      <tr class="table__row" v-for="data in slicedDataArray" :key="data.id">
        <td class="table__column-type">
          <img :src="setIcon(data.type)" />
          <span>{{ formatType(data.type) }}</span>
        </td>
        <td class="table__column-data">
          {{ formatDate(data.date) }}
        </td>
        <td class="table__column-amount">
          {{ formatAmount(data.amount) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  background-color: white;

  &__head,
  &__row {
    width: 100%;
    border-radius: 0.5rem;
  }

  &__head {
    display: flex;
    color: white;
    background-color: var(--primary-500);
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    height: 4rem;

    &:nth-child(even) {
      background-color: var(--common-surface-lightBlue);
    }
  }

  &__column-type {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__column-amount {
    direction: ltr;
  }
}
</style>
