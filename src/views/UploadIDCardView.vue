<script setup>
import { ref, defineEmits } from 'vue'
import IDCard from '@/components/view/IDCard.vue'

const emit = defineEmits(['sendData'])

const frontImageUrl = ref('')
const backImageUrl = ref('')

const updateImageUrl = (type, imageUrl) => {
  if (type === 'front') {
    frontImageUrl.value = imageUrl
  } else if (type === 'back') {
    backImageUrl.value = imageUrl
  }

  if (frontImageUrl.value !== '' && backImageUrl.value !== '') {
    emit('sendData', { frontImageUrl, backImageUrl })
  }
}
</script>

<template>
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
</template>

<style lang="scss">
.account-form {
  &__cards-wrapper {
    display: flex;
    gap: 2.5rem;
  }
}
</style>
