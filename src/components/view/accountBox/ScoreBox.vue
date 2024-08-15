<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

import { formattedPersianNumber, convertNumberToPersian } from '@/utils/stringFormatter'

import TheAccountBox from '@/components/view/accountBox/TheAccountBox.vue'
import CircleInfoBold from '@/assets/svg/icons/common/circle-info-bold.vue'

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

const scoreAmount = ref(formattedPersianNumber(0))
const scorePaymentPeriod = ref(convertNumberToPersian(0))

onMounted(() => {
  if (props.hasDepositAccount) {
    scoreAmount.value = ref(formattedPersianNumber(props.depositData.score.amount))
    scorePaymentPeriod.value = ref(convertNumberToPersian(props.depositData.score.paymentPeriod))
  }
})
</script>

<template>
  <TheAccountBox titleText="امتیاز حساب" :moreIcon="CircleInfoBold" buttonTitle="محاسبه امتیاز">
    <div class="account-box__score score">
      <div class="score__control">
        <span class="score__money">{{ scoreAmount }}</span>
        <span class="score__label">ریال</span>
      </div>
      <div class="score__control">
        <span class="score__number">{{ scorePaymentPeriod }}</span>
        <span class="score__label">ماهه</span>
      </div>
    </div>
  </TheAccountBox>
</template>

<style lang="scss">
.score {
  &__label {
    color: var(--common-gray);
    font-size: 0.875rem;
    font-weight: 400;
  }

  &__control {
    @include flex;
    gap: 0.25rem;
  }

  &__money,
  &__number {
    font-weight: 700;
    color: var(--primary-500);
  }

  &__money {
    font-size: 2.5rem;
  }

  &__number {
    font-size: 1.25rem;
  }
}
</style>
