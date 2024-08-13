<script setup>
import TheAccountBox from '@/components/view/accountBox/TheAccountBox.vue'
import CircleInfoBold from '@/assets/svg/icons/common/circle-info-bold.vue'
</script>

<template>
  <TheAccountBox
    titleText="امتیاز حساب"
    :moreIcon="CircleInfoBold"
    buttonTitle="محاسبه امتیاز"
  >
    <div class="account-box__score score">
      <div class="score__control">
        <span class="score__money">۰</span>
        <span class="score__label">ریال</span>
      </div>
      <div class="score__control">
        <span class="score__number">۰</span>
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
