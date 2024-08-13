<script setup>
import BaseFormControl from '@/components/common/BaseFormControl.vue'
import { ref } from 'vue'

const emits = defineEmits(['sendData'])

const test = ref('')

const doEmit = () => {
  // console.log('test', test.value)
  emits('sendData', test.value)
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
      maxWidth="none"
      height="7.5rem"
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
