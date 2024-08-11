<script setup>
import logoWithText from '@/assets/svg/logos/logo-with-text.vue'
</script>

<template>
  <main class="container container_login">
    <div class="login">
      <div class="login__form-wrapper">
        <logoWithText class="login__logo" />

        <form class="login__form form">
          <div class="form__control"></div>
          <div class="form__control"></div>
          <BaseButton
            class="form__submit"
            text="ورود"
            mode="button_primary"
            buttonType="submit"
            isDisabled
          />
        </form>

        <div class="login__support">
          <span>پشتیبانی:</span>
          <span class="login__tel">۰۲۱-۱۲۳۴۵۶۷۸</span>
        </div>
      </div>

      <div class="login__image-wrapper">
        <img src="@/assets/image/login-image.png" alt="login image" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.login {
  display: flex;
  gap: 1.25rem;
  border-radius: 1.25rem;
  padding: 1.25rem;
  background-color: #fff;
  width: 90%;
  max-width: 1200px;
  height: 90vh;
  max-height: 840px;

  &__form-wrapper {
    width: 50%;
    @include flex($direction: column);
    padding: 1rem 0;
  }

  &__form {
    margin-top: 3.5rem;
  }

  &__logo {
    width: 45%;
    margin: 3rem;
  }

  &__support {
    font-size: 0.75rem;
    margin-top: auto;
    display: flex;
    gap: 0.25rem;
  }

  &__tel {
    direction: ltr;
    display: block;
  }

  &__image-wrapper {
    width: 50%;
    border-radius: 0.75rem;
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.form {
  @include flex($direction: column, $align: stretch);
  width: 60%;

  &__control {
    @include flex($direction: column, $align: stretch);
    gap: 0.25rem;
    position: relative;
    margin-bottom: 0.5rem;
  }

  &__submit {
    margin-top: 1.5rem;
  }
}
</style>
