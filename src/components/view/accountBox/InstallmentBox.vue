<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

import { formattedPersianNumber, convertNumberToPersian } from '@/utils/stringFormatter'

import TheAccountBox from '@/components/view/accountBox/TheAccountBox.vue'
import AngleLeftIcon from '@/assets/svg/icons/common/AngleLeftIcon.vue'
import ArrowLeftIcon from '@/assets/svg/icons/common/ArrowLeftIcon.vue'

// const userStore = useUserStore()
// const depositData = userStore.depositData
// const hasDepositAccount = userStore.hasDepositAccount

const props = defineProps({
  depositData: {
    type: Object,
    required: true
  },
  hasDepositAccount: {
    type: Boolean,
    required: true
  }
})

const instalmentAmount = ref(formattedPersianNumber(0))
const instalmentDueDate = ref(convertNumberToPersian(0))

onMounted(() => {
  if (props.hasDepositAccount) {
    instalmentAmount.value = ref(
      formattedPersianNumber(props.depositData.upcomingInstalment.amount)
    )
    instalmentDueDate.value = ref(
      convertNumberToPersian(props.depositData.upcomingInstalment.dueDate)
    )
  }
})
</script>

<template>
  <TheAccountBox
    titleText="قسط پیش رو"
    :moreIcon="AngleLeftIcon"
    moreText="جزئیات"
    buttonTitle="پرداخت"
    :buttonIcon="ArrowLeftIcon"
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
