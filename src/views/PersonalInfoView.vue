<script setup>
import BaseFormControl from '@/components/common/BaseFormControl.vue'

import { ref } from 'vue'
import router from '@/router'
import { useAppStore } from '@/stores/appStore'
import { useCreateAccountStore } from '@/stores/createAccountStore'

const valuesFromInputs = ref({
  firstName: '',
  lastName: '',
  postalCode: '',
  address: ''
})

const setValuesFromInputs = (innerValue, field) => {
  valuesFromInputs.value[field] = innerValue
}

const appStore = useAppStore()
const createAccountStore = useCreateAccountStore()
const isLoading = ref(false)

const handleSubmit = (event) => {
  event.preventDefault()
  console.log(valuesFromInputs.value)
  try {
    console.log(valuesFromInputs.value)
    isLoading.value = true
    createAccountStore.setUserPersonalInfo(valuesFromInputs.value)
    router.push({ path: '/id-card' })
  } catch (error) {
    appStore.showToast('error', 'خطا در ثبت اطلاعات فردی')
  } finally {
    isLoading.value = false
    // console.log('userPersonalInfo', createAccountStore.userPersonalInfo)
  }
}

const handlePrevious = () => {
  const isSure = confirm('اطلاعات فردی دخیره نشده اند، از برگشت به صفحه قبل اطمینان دارید؟')
  if (!isSure) return
  router.push({ path: '/dashboard' })
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
      />
    </div>

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
      />
    </div>
    <div class="create-account__buttons-wrapper">
      <BaseButton
        class="create-account__button"
        text="قبلی"
        mode="button_secondary"
        buttonType="button"
        @click="handlePrevious"
      />
      <BaseButton
        class="create-account__button"
        text="ثبت و ادامه"
        mode="button_primary"
        buttonType="submit"
        @click="handleSubmit"
        :isLoading="isLoading"
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
