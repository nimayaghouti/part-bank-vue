<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/useDataStore'
import { hasDepositAccount } from '@/composables/useGetDeposit'
import { onMounted } from 'vue'

import { formattedPersianNumber, convertNumberToPersian } from '@/utils/stringFormatter'

import TheAccountBox from '@/components/view/accountBox/TheAccountBox.vue'
import AngleLeft from '@/assets/svg/icons/common/angle-left.vue'
import ArrowLeft from '@/assets/svg/icons/common/arrow-left.vue'

const dataStore = useDataStore()
const userData = dataStore.userData

const instalmentAmount = ref(formattedPersianNumber(0))
const instalmentDueDate = ref(convertNumberToPersian(0))

onMounted(async () => {
  const depositeData = await hasDepositAccount(userData.token)
  if (depositeData.id) {
    instalmentAmount.value = ref(formattedPersianNumber(depositeData.upcomingInstalment.amount))
    instalmentDueDate.value = ref(convertNumberToPersian(depositeData.upcomingInstalment.dueDate))
  }
})
</script>

<template>
  <TheAccountBox
    titleText="قسط پیش رو"
    :moreIcon="AngleLeft"
    moreText="جزئیات"
    buttonTitle="پرداخت"
    :buttonIcon="ArrowLeft"
  >
    <div class="account-box__installment installment">
      <div class="installment__wrapper">
        <span class="installment__label">مبلغ قسط:</span>
        <span class="installment__number installment__number_amount"
          >{{ instalmentAmount }} ریال</span
        >
      </div>
      <div class="installment__wrapper">
        <span class="installment__label">تاریخ سررسید:</span>
        <span class="installment__number installment__number_date">{{ instalmentDueDate }}</span>
      </div>
    </div>
  </TheAccountBox>
</template>

<style lang="scss">
.installment {
  &__label {
    color: var(--common-gray);
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0.25rem 0;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__number {
    font-weight: 600;
  }
}
</style>
