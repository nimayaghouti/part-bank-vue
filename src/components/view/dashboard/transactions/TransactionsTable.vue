<script setup>
import MoneyDepositIcon from '@/assets/svg/icons/dashboard/MoneyDepositIcon.vue'
import MoneyWithdrawIcon from '@/assets/svg/icons/dashboard/MoneyWithdrawIcon.vue'

const props = defineProps({
  slicedDataArray: {
    type: Array,
    required: true
  }
})

// TODO (lazy importing the icon):
// const TransactionIcon = (iconName) => {
//   const test = import(`@/assets/svg/icons/dashboard/money-${iconName}.vue`)
//   console.log('icon', test)
//   console.log('name', iconName)
//   return test
// }

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
          <MoneyDepositIcon v-if="data.type === 'deposit'" /> <MoneyWithdrawIcon v-else />
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
