<script setup>
import BaseButton from '@/components/common/BaseButton.vue'

defineProps({
  titleText: {
    type: String,
    required: true
  },
  moreIcon: {
    type: Object,
    required: true
  },
  moreText: {
    type: String
  },
  buttonTitle: {
    type: String,
    required: true
  },
  buttonIcon: {
    type: Object,
    default: () => null
  }
})
</script>

<template>
  <div class="account-box">
    <div class="account-box__top-part">
      <div class="account-box__title">{{ titleText }}</div>
      <div class="account-box__more">
        {{ moreText }}
        <component class="button__icon" v-if="moreIcon" :is="moreIcon" />
      </div>
    </div>

    <slot></slot>

    <BaseButton
      class="account-box__button"
      :text="buttonTitle"
      :icon="buttonIcon"
      mode="button_secondary"
    />
  </div>
</template>

<style lang="scss">
.account-box {
  width: 21rem;
  height: 16.25rem;
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__top-part {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &__more {
    @include flex();
    cursor: pointer;
    color: var(--common-gray);
  }

  &__installment {
    margin-top: auto;
    margin-bottom: 1.25rem;
  }
}
</style>
