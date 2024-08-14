<template>
  <div class="not-found">
    <h1 class="not-found__title">صفحه مورد نظر یافت نشد</h1>
    <p class="not-found__description">به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
    <router-link to="/" class="not-found__link">بازگشت به صفحه اصلی</router-link>
  </div>
</template>

<style lang="scss">
.not-found {
  text-align: center;
  padding: 2rem;

  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__description {
    margin-bottom: 1.5rem;
  }

  &__link {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
