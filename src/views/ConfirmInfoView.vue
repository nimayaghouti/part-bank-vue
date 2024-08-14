<script setup></script>
<template>
  <form class="create-account__form account-form">
    <div class="account-form__row">
      <div class="account-form__item confirm-item">
        <div class="confirm-item__label">نام:</div>
        <div class="confirm-item__detail">بهنام</div>
      </div>
      <div class="account-form__item confirm-item">
        <div class="confirm-item__label">نام خانوادگی:</div>
        <div class="confirm-item__detail">وهانی</div>
      </div>
      <div class="account-form__item confirm-item">
        <div class="confirm-item__label">کدپستی:</div>
        <div class="confirm-item__detail">۹۱۷۵۶۸۷۴۲۳</div>
      </div>
    </div>
    <div class="account-form__row">
      <div class="account-form__item confirm-item">
        <div class="confirm-item__label">محل سکونت:</div>
        <div class="confirm-item__detail">
          بولوار ملک آباد ، خیام جنوبی ۱۳ ، گلایل ۱۰ ، پلاک۱۲۳ ، واحد۱
        </div>
      </div>
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
        text="افتتاح حساب"
        mode="button_primary"
        buttonType="submit"
      />
    </div>
  </form>
</template>

<style lang="scss">
.account-form {
  &__row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
    gap: 7.5rem;
    flex-wrap: wrap;
  }
}

.confirm-item {
  display: flex;
  width: 9.375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  &:last-child {
    width: unset;
  }

  &__label {
    color: var(--common-gray);
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.6;
  }

  &__detail {
    color: var(--black-500);
    font-size: 1rem;
    font-weight: 600;
  }
}
</style>
