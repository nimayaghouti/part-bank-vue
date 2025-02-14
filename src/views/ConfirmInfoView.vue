<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import BaseButton from '@/components/common/BaseButton.vue'

import { useUserStore } from '@/stores/userStore'
import { useCreateAccountStore } from '@/stores/createAccountStore'
import { postCreateDeposit } from '@/services/createDepositService'
import useShowToast from '@/composables/useShowToast'
import useButtonLoading from '@/composables/useButtonLoading'

const userStore = useUserStore()
const createAccountStore = useCreateAccountStore()
const userData = userStore.userData

const { isButtonLoading } = useButtonLoading()
const { showToast } = useShowToast()

const userPersonalInfo = ref(null)
const nullMessage = 'ذخیره نشده'

onMounted(() => {
  userPersonalInfo.value = createAccountStore.userPersonalInfo
  console.log('confirm-info', userPersonalInfo.value)
})

const handleSubmit = async (event) => {
  event.preventDefault()

  if (!userPersonalInfo.value) {
    showToast({
      mode: 'error',
      message: 'داده ای برای ایجاد حساب بانکی، ثبت نشده است'
    })
    return
  }

  try {
    const isSure = confirm('در شرف ایجاد حساب هستید، آیا از صحت اطلاعت وارد شده اطمینان دارید؟')
    if (!isSure) return

    const response = await postCreateDeposit(userData.token, userPersonalInfo.value)
    console.log('confirm-info:', response)
    router.push({ path: '/dashboard' })
  } catch (error) {
    showToast({
      mode: 'error',
      message: 'خطا در ایجاد حساب بانکی'
    })
  }
}

const handlePrevious = () => {
  const isSure = confirm('حساب بانکی ایجاد نشده است، از برگشت به صفحه قبل اطمینان دارید؟')
  if (!isSure) return
  router.push({ path: '/id-card' })
}
</script>

<template>
  <form class="create-account__form account-form">
    <div class="account-form__row">
      <div class="account-form__item confirm-item">
        <div class="confirm-item__label">نام:</div>
        <div class="confirm-item__detail">
          {{ userPersonalInfo?.firstName || nullMessage }}
        </div>
      </div>
      <div class="account-form__item confirm-item">
        <div class="confirm-item__label">نام خانوادگی:</div>
        <div class="confirm-item__detail">
          {{ userPersonalInfo?.lastName || nullMessage }}
        </div>
      </div>
      <div class="account-form__item confirm-item">
        <div class="confirm-item__label">کدپستی:</div>
        <div class="confirm-item__detail">
          {{ userPersonalInfo?.postalCode || nullMessage }}
        </div>
      </div>
    </div>
    <div class="account-form__row">
      <div class="account-form__item confirm-item">
        <div class="confirm-item__label">محل سکونت:</div>
        <div class="confirm-item__detail">
          {{ userPersonalInfo?.address || nullMessage }}
        </div>
      </div>
    </div>
    <div class="create-account__buttons-wrapper">
      <BaseButton
        class="create-account__button"
        text="قبلی"
        mode="secondary"
        buttonType="button"
        @click="handlePrevious"
      />
      <BaseButton
        class="create-account__button"
        text="افتتاح حساب"
        mode="primary"
        buttonType="submit"
        @click="handleSubmit"
        :isLoading="isButtonLoading"
      />
    </div>
  </form>
</template>

<style lang="scss">
.account-form {
  &__row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
    gap: 7.5rem;
    flex-wrap: wrap;
  }
}

.confirm-item {
  display: flex;
  width: 9.375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  &:last-child {
    width: unset;
  }

  &__label {
    color: var(--common-gray);
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.6;
  }

  &__detail {
    color: var(--black-500);
    font-size: 1rem;
    font-weight: 600;
  }
}
</style>
