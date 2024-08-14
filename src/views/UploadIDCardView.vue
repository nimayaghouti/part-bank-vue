<script setup>
import { ref } from 'vue'
import IDCard from '@/components/view/IDCard.vue'

const frontImageUrl = ref('')
const backImageUrl = ref('')

const updateImageUrl = (type, imageUrl) => {
  if (type === 'front') {
    frontImageUrl.value = imageUrl
  } else if (type === 'back') {
    backImageUrl.value = imageUrl
  }
}
</script>

<template>
  <form class="create-account__form account-form">
    <div class="account-form__cards-wrapper">
      <IDCard
        class="account-form__id-card"
        description="تصویر روی کارت ملی"
        @update:image="(imageUrl) => updateImageUrl('front', imageUrl)"
      />
      <IDCard
        class="account-form__id-card"
        description="تصویر پشت کارت ملی"
        @update:image="(imageUrl) => updateImageUrl('back', imageUrl)"
      />
    </div>
    <div class="create-account__buttons-wrapper">
      <BaseButton
        class="create-account__button"
        text="قبلی"
        mode="button_secondary"
        buttonType="button"
      />
      <BaseButton
        class="create-account__button"
        text="ثبت و ادامه"
        mode="button_primary"
        buttonType="submit"
      />
    </div>
  </form>
</template>

<style lang="scss">
.account-form {
  &__cards-wrapper {
    display: flex;
    gap: 2.5rem;
  }
}
</style>
