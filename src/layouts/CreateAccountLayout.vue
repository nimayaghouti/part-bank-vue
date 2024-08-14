<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'

const route = useRoute()
const pageTitle = ref('')

watch(
  () => route.meta,
  (meta) => {
    pageTitle.value = meta.title
  },
  { immediate: true }
)
</script>

<template>
  <BaseLayout>
    <template #content>
      <div class="create-account">
        <h2 class="create-account__title">{{ pageTitle }}</h2>
        <div class="create-account__seperator"></div>
        <router-view />
      </div>
    </template>
  </BaseLayout>
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
