<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'

import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { deleteDeposite } from '@/composables/useDeleteDeposite'

import {
  formattedCardNumber,
  formattedPersianNumber,
  convertNumberToPersian
} from '@/utils/stringFormatter'

import moreIcon from '@/assets/svg/icons/common/moreIcon.vue'
import exitIcon from '@/assets/svg/icons/common/exitIcon.vue'
import convertCard from '@/assets/svg/icons/dashboard/convert-card.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const userData = userStore.userData

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

const accountBalance = ref(formattedPersianNumber(0))
const cardNumber = ref()

onMounted(() => {
  if (props.hasDepositAccount) {
    console.log(props.depositData)
    accountBalance.value = ref(formattedPersianNumber(props.depositData.balance))
    cardNumber.value = ref(
      convertNumberToPersian(formattedCardNumber(props.depositData.cardNumber))
    )
  }
})

const handelDeleteAccount = async () => {
  try {
    const isSure = confirm('آیا از حذف حساب بانکی خود اطمینان دارید؟')
    if (!isSure) return

    const response = await deleteDeposite(userData.token)
    console.log('delete account:', response)
    router.go()
  } catch (error) {
    appStore.showToast({
      mode: 'error',
      message: 'خطا در حدف حساب بانکی'
    })
  }
}
</script>
<template>
  <div class="account-card">
    <div class="account-card__header">
      <div class="account-card__actions-btn actions-btn">
        <moreIcon class="actions-btn__icon" />
        <div class="actions-btn__menu actions-menu">
          <div class="actions-menu__item actions-menu__item_change">
            <convertCard class="actions-menu__icon" />
            تغییر حساب متصل
          </div>
          <div class="actions-btn__separator"></div>
          <div class="actions-menu__item actions-menu__item_delete" @click="handelDeleteAccount">
            <exitIcon class="actions-menu__icon" />
            حذف حساب بانکی
          </div>
        </div>
      </div>
      <div class="account-card__balance-info">
        <p class="account-card__balance-title">موجودی کل</p>
        <p class="account-card__balance-amount">{{ accountBalance }}</p>
      </div>
    </div>
    <div class="account-card__number-group">{{ cardNumber }}</div>
  </div>
</template>

<style lang="scss">
.account-card {
  @include flex(column, normal, space-between);
  @include border-radius(0.75rem);
  width: 28.5rem;
  height: 16.25rem;
  background: linear-gradient(112deg, #4152a0 0%, #d0c9c1 100%);
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      url('@/assets/svg/textures/noise.svg'),
      url('@/assets/svg/textures/pattern.svg'),
      no-repeat center;
    background-size: contain;
    z-index: 0;
  }

  &__header {
    display: flex;
    margin: 2.25rem;
    margin-bottom: 0;
    justify-content: space-between;
    z-index: 1;
  }

  &__balance-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 0;
  }

  &__balance-title {
    @include text-style(#fff, 1rem, 600);
  }

  &__balance-amount {
    @include text-style(#fff, 2.5rem, 600);
  }

  &__number-group {
    @include flex(row-reverse, center, center);
    margin: 0 3.25rem 2rem;
    gap: 1rem;
    font-size: 2.25rem;
    font-weight: 400;
  }
}

.actions-btn {
  @include flex();
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  position: relative;

  &__menu {
    @include flex(column, flex-start, center);
    @include border-radius(0.75rem);
    @include box-shadow;
    @include text-style(#c3c5c9, 0.875rem, 400);
    position: absolute;
    padding: 0.75rem;
    gap: 0.75rem;
    background: #fff;
    width: 11.8rem;
    line-height: 1.25rem;
    right: 0.125rem;
    top: 3.4rem;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: visibility, opacity, top, 0.5s;
  }

  &__icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    right: -0.68rem;
  }

  &__separator {
    width: 100%;
    height: 0.065rem;
    background-color: #e2edff;
  }

  &:hover {
    cursor: pointer;
    .actions-menu {
      top: 2.2rem;
      visibility: visible;
      opacity: 1;
    }
  }
}

.actions-menu {
  &__item {
    display: flex;
    gap: 0.5rem;

    &_delete {
      color: #eb482b;
    }
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
