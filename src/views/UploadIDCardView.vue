<script setup>
import IDCard from '@/components/view/IDCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import { ref } from 'vue'
import router from '@/router'
import { useAppStore } from '@/stores/appStore'
import { useCreateAccountStore } from '@/stores/createAccountStore'

const frontImageUrl = ref('')
const backImageUrl = ref('')

const updateImageUrl = (type, imageUrl) => {
  if (type === 'front') {
    frontImageUrl.value = imageUrl
  } else if (type === 'back') {
    backImageUrl.value = imageUrl
  }
}

const appStore = useAppStore()
const createAccountStore = useCreateAccountStore()
const isLoading = ref(false)

// console.log('id-card: userPersonalInfo',createAccountStore.userPersonalInfo)

const handleSubmit = (event) => {
  event.preventDefault()
  if (frontImageUrl.value === '' || backImageUrl.value === '') {
    appStore.showToast({
      mode: 'error',
      message: 'لطفا هردو تصویر را آپلود نمایید'
    })
    return
  }

  try {
    isLoading.value = true
    createAccountStore.setUserIdCards({
      frontImageUrl: frontImageUrl.value,
      backImageUrl: backImageUrl.value
    })
    router.push({ path: '/confirm-info' })
  } catch (error) {
    appStore.showToast({
      mode: 'error',
      message: 'خطا در ثبت تصاویر کارت ملی'
    })
  } finally {
    isLoading.value = false
    // console.log('userIdCards', createAccountStore.userIdCards)
  }
}

const handlePrevious = () => {
  const areAllinputsEmpty = frontImageUrl.value !== '' || backImageUrl.value !== ''

  if (areAllinputsEmpty) {
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
        :isLoading="isLoading"
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
