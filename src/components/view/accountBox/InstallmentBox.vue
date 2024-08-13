<script setup>
import TheAccountBox from '@/components/view/accountBox/TheAccountBox.vue'
import AngleLeft from '@/assets/svg/icons/common/angle-left.vue'
import ArrowLeft from '@/assets/svg/icons/common/arrow-left.vue'
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
        <span class="installment__number installment__number_amount">۰</span>
      </div>
      <div class="installment__wrapper">
        <span class="installment__label">تاریخ سررسید:</span>
        <span class="installment__number installment__number_date">-</span>
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
