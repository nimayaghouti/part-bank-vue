<script setup>
import router from '@/router'
</script>

<template>
  <div class="dialog">
    <img src="@/assets/svg/flats/empty-state-illustration.svg" />
    <span class="dialog__note"> برای دسترسی به داشبورد، لطفا ابتدا افتتاح حساب کنید </span>
    <BaseButton
      class="dialog__button"
      text="افتتاح حساب"
      maxWidth="12.5rem"
      type="button"
      @click="router.push({ path: '/personal-info' })"
    />
  </div>
</template>

<style lang="scss">
.dialog {
  width: 100%;
  height: 100%;
  @include flex($direction: column);
  background-color: rgb(247 248 250 / 84%);
  border: none;
  z-index: 1;

  &__note {
    font-weight: 600;
    margin: 1.5rem 0 2rem;
  }

  &__button {
    flex-grow: 0;
    &:active {
      background-color: #fff;
      color: var(--black-500);
      border: 1px solid var(--primary-500);
    }
  }
}
</style>
