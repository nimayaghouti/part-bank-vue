<script setup>
import BaseFormControl from '@/components/common/BaseFormControl.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import { ref } from 'vue'
import router from '@/router'

import { useCreateAccountStore } from '@/stores/createAccountStore'

import useButtonLoading from '@/composables/useButtonLoading'
import useShowToast from '@/composables/useShowToast'

const createAccountStore = useCreateAccountStore()

const { isButtonLoading } = useButtonLoading()
const { showToast } = useShowToast()

const isDisabled = ref(true)
const setIsDisabled = (areAllValuesValid) => {
  isDisabled.value = !areAllValuesValid
}

const valuesFromInputs = ref({
  firstName: '',
  lastName: '',
  postalCode: '',
  address: ''
})

const valuesAreValid = ref({
  firstName: false,
  lastName: false,
  postalCode: false,
  address: false
})

const setValuesFromInputs = (innerValue, field) => {
  valuesFromInputs.value[field] = innerValue.textfieldValue
  valuesAreValid.value[field] = innerValue.isValid

  const areAllValuesValid =
    valuesAreValid.value.firstName &&
    valuesAreValid.value.lastName &&
    valuesAreValid.value.postalCode &&
    valuesAreValid.value.address
  setIsDisabled(areAllValuesValid)
}

const handleSubmit = (event) => {
  event.preventDefault()
  console.log(valuesFromInputs.value)
  if (isDisabled.value) {
    showToast({
      mode: 'error',
      message: 'لطفا مقادیر صحیح را وارد نمایید'
    })
    return
  }

  try {
    console.log(valuesFromInputs.value)
    createAccountStore.setUserPersonalInfo(valuesFromInputs.value)
    router.push({ path: '/id-card' })
  } catch (error) {
    showToast({
      mode: 'error',
      message: 'خطا در ثبت اطلاعات فردی'
    })
  } finally {
  }
}

const handlePrevious = () => {
  const areAllinputsEmpty =
    valuesFromInputs.value.firstName !== '' ||
    valuesFromInputs.value.lastName !== '' ||
    valuesFromInputs.value.postalCode !== '' ||
    valuesFromInputs.value.address !== ''

  if (areAllinputsEmpty) {
    const isSure = confirm('اطلاعات فردی دخیره نشده اند، از برگشت به صفحه قبل اطمینان دارید؟')

    if (!isSure) return
    router.push({ path: '/dashboard' })
  } else {
    router.push({ path: '/dashboard' })
  }
}
</script>

<template>
  <form class="create-account__form account-form">
    <div class="form-row">
      <BaseFormControl
        class="form-row__form-control"
        labelText="نام"
        labelFor="first-name-input"
        labelColor="var(--common-gray)"
        type="text"
        placeholder="نام فارسی"
        isRequired
        isAutofocus
        hasBorder
        @sendValue="(innerValue) => setValuesFromInputs(innerValue, 'firstName')"
        pattern="^[\u0600-\u06FF\s]+$"
        validation-message="نام فارسی خود را وارد نمایید"
      />
      <BaseFormControl
        class="form-row__form-control"
        labelText="نام خانوادگی"
        labelFor="last-name-input"
        labelColor="var(--common-gray)"
        type="text"
        placeholder="نام خانوادگی به صورت کامل"
        isRequired
        hasBorder
        @sendValue="(innerValue) => setValuesFromInputs(innerValue, 'lastName')"
        pattern="^[\u0600-\u06FF\s]+$"
        validation-message="نام خانوادگی فارسی خود را وارد نمایید"
      />
      <BaseFormControl
        class="form-row__form-control"
        labelText="کدپستی"
        labelFor="postal-code-input"
        labelColor="var(--common-gray)"
        type="text"
        placeholder="کدپستی ۱۰ رقمی"
        isRequired
        hasBorder
        @sendValue="(innerValue) => setValuesFromInputs(innerValue, 'postalCode')"
        pattern="[0-9]{10}"
        maxlength="10"
        validation-message="کد پستی 10 رقمی خود را وارد نمایید"
      />
    </div>
    <!-- pattern="[۰۱۲۳۴۵۶۷۸۹0-9]{10}" -->

    <div class="form-row">
      <BaseFormControl
        class="form-row__form-control"
        labelText="محل سکونت"
        labelFor="address-textarea"
        labelColor="var(--common-gray)"
        type="textarea"
        placeholder="محل سکونت"
        isRequired
        hasBorder
        height="7.5rem"
        @sendValue="(innerValue) => setValuesFromInputs(innerValue, 'address')"
        pattern="^[\u0600-\u06FF\s]+$"
        validation-message="محل سکونت خود را به صورت فارسی وارد نمایید"
      />
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
        text="ثبت و ادامه"
        mode="primary"
        buttonType="submit"
        @click="handleSubmit"
        :isLoading="isButtonLoading"
      />
    </div>
  </form>
</template>

<style lang="scss">
.form-row {
  width: 100%;
  display: flex;
  gap: 2rem;

  &__form-control {
    flex-grow: 1;
  }

  label {
    @include text-style($color: var(--common-gray), $size: 0.875rem, $weight: 600);
    height: 1.75rem;
  }
}
</style>
