<!-- CreateAccountLayout.vue -->
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheHeader from '@/components/common/TheHeader.vue'

const route = useRoute()
const pageTitle = ref('')
const prevButtonText = ref('')
const nextButtonText = ref('')

watch(
  () => route.meta,
  (meta) => {
    pageTitle.value = meta.title
    prevButtonText.value = meta.prevButtonText
    nextButtonText.value = meta.nextButtonText
  },
  { immediate: true }
)
</script>

<template>
  <TheHeader />
  <main class="container container_watch-header">
    <div class="create-account">
      <h2 class="create-account__title">{{ pageTitle }}</h2>
      <div class="create-account__seperator"></div>
      <form class="create-account__form account-form">
        <router-view />
        <div class="create-account__buttons-wrapper">
          <BaseButton
            class="create-account__button"
            :text="prevButtonText"
            mode="button_secondary"
            buttonType="button"
          />
          <BaseButton
            class="create-account__button"
            :text="nextButtonText"
            mode="button_primary"
            buttonType="submit"
          />
        </div>
      </form>
    </div>
  </main>
</template>

<style lang="scss">
.create-account {
  @include flex($direction: column);
  width: 90%;
  max-width: 87.5rem;
  padding: 2.5rem;
  gap: 2.5rem;
  border-radius: 0.75rem;
  background: #fff;

  &__title {
    @include text-style($size: 1.25rem, $weight: 700);
  }

  &__seperator {
    width: 100%;
    height: 0.0625rem;
    background-color: #e2edff;
  }

  &__form {
    width: 100%;
    @include flex($direction: column);
    gap: 2.5rem;
  }
  &__buttons-wrapper {
    align-self: flex-end;
    display: flex;
    width: 27.125rem;
    height: 3rem;
    gap: 1rem;
  }

  &__button {
    max-width: 13rem;
  }
}
</style>
