<script setup>
import IDCard from '@/components/view/uploadIdCard/IDCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import { ref } from 'vue'
import router from '@/router'

import { useCreateAccountStore } from '@/stores/createAccountStore'

import useButtonLoading from '@/composables/useButtonLoading'
import useShowToast from '@/composables/useShowToast'

const createAccountStore = useCreateAccountStore()

const { isButtonLoading } = useButtonLoading()
const { showToast } = useShowToast()

const frontImageUrl = ref('')
const backImageUrl = ref('')

const updateImageUrl = (type, imageUrl) => {
  if (type === 'front') {
    frontImageUrl.value = imageUrl
  } else if (type === 'back') {
    backImageUrl.value = imageUrl
  }
}

// console.log('id-card: userPersonalInfo',createAccountStore.userPersonalInfo)

const handleSubmit = (event) => {
  event.preventDefault()

  const isOneEmpty = frontImageUrl.value === '' || backImageUrl.value === ''
  if (isOneEmpty) {
    showToast({
      mode: 'error',
      message: 'لطفا هردو تصویر را آپلود نمایید'
    })
    return
  }

  try {
    createAccountStore.setUserIdCards({
      frontImageUrl: frontImageUrl.value,
      backImageUrl: backImageUrl.value
    })
    router.push({ path: '/confirm-info' })
  } catch (error) {
    showToast({
      mode: 'error',
      message: 'خطا در ثبت تصاویر کارت ملی'
    })
  }
}

const handlePrevious = () => {
  const isOneFilled = frontImageUrl.value !== '' || backImageUrl.value !== ''

  if (isOneFilled) {
    const isSure = confirm('تصاویر کارت ملی دخیره نشده اند، از برگشت به صفحه قبل اطمینان دارید؟')

    if (!isSure) return
    router.push({ path: '/personal-info' })
  } else {
    router.push({ path: '/personal-info' })
  }
}
</script>

<template>
  <form class="create-account__form account-form">
    <div class="account-form__cards-wrapper">
      <IDCard
        class="account-form__id-card"
        description="تصویر روی کارت ملی"
        imageSide="front"
        @update:image="(imageUrl) => updateImageUrl('front', imageUrl)"
      />
      <IDCard
        class="account-form__id-card"
        description="تصویر پشت کارت ملی"
        imageSide="back"
        @update:image="(imageUrl) => updateImageUrl('back', imageUrl)"
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
.account-form {
  &__cards-wrapper {
    display: flex;
    gap: 2.5rem;
  }
}
</style>
