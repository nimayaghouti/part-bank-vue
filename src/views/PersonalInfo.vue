<script setup>
import BaseFormControl from '@/components/common/BaseFormControl.vue'
import { ref } from 'vue'

const emits = defineEmits(['sendData'])

const valuesFromInnerComponents = ref({
  firstName: '',
  lastName: '',
  postalCode: '',
  address: ''
})

const setValuesFromInnerComponents = (innerValue, field) => {
  valuesFromInnerComponents.value[field] = innerValue
  emits('sendData', valuesFromInnerComponents.value)
}
</script>

<template>
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
      @sendValue="(innerValue) => setValuesFromInnerComponents(innerValue, 'firstName')"
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
      @sendValue="(innerValue) => setValuesFromInnerComponents(innerValue, 'lastName')"
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
      @sendValue="(innerValue) => setValuesFromInnerComponents(innerValue, 'postalCode')"
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
      @sendValue="(innerValue) => setValuesFromInnerComponents(innerValue, 'address')"
    />
  </div>
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
