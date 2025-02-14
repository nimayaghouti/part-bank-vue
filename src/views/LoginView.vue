<script setup>
import { ref } from 'vue'
import router from '@/router'

import { useAuth } from '@/services/loginService'
import { useUserStore } from '@/stores/userStore'

import useButtonLoading from '@/composables/useButtonLoading'

import BaseFormControl from '@/components/common/BaseFormControl.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import LogoWithTextIcon from '@/assets/svg/logos/LogoWithTextIcon.vue'
import EyeClosedIcon from '@/assets/svg/icons/login/EyeClosedIcon.vue'
import EyeOpenIcon from '@/assets/svg/icons/login/EyeOpenIcon.vue'

const userStore = useUserStore()
const { isButtonLoading } = useButtonLoading()

const isPasswordVisible = ref(false)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const isDisabled = ref(true)
const setIsDisabled = (isAllValid) => {
  isDisabled.value = !isAllValid
}

const inputsValues = ref({
  phoneNumber: '',
  password: ''
})

const inputsValidities = ref({
  phoneNumber: false,
  password: false
})

const setInputsValues = (innerValue, field) => {
  inputsValues.value[field] = innerValue.textfieldValue
  inputsValidities.value[field] = innerValue.isValid

  const isAllValid = inputsValidities.value.password && inputsValidities.value.phoneNumber
  setIsDisabled(isAllValid)
}

const handleSubmit = async (event) => {
  event.preventDefault()

  try {
    if (userStore.isLoggedin) return

    const data = await useAuth(inputsValues.value['phoneNumber'], inputsValues.value['password'])

    userStore.setUserData(data)
    userStore.setIsLoggedin(true)

    router.push({ path: '/dashboard', replace: true })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="login">
    <div class="login__form-wrapper">
      <LogoWithTextIcon class="login__logo" />

      <form class="login__form form">
        <BaseFormControl
          class="form__control"
          labelText="شماره همراه"
          labelFor="input-phone"
          type="tel"
          placeholder="شماره همراه"
          pattern="[0-9]{11}"
          maxlength="11"
          validationMessage="شماره همراه خود را وارد کنید"
          @sendValue="(innerValue) => setInputsValues(innerValue, 'phoneNumber')"
        />
        <!-- TODO: pattern must be [۰-۹]{11} -->

        <BaseFormControl
          class="form__control"
          labelText="رمز عبور"
          labelFor="input-password"
          :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="رمز عبور"
          pattern="[A-Za-z0-9]{4,}"
          validationMessage="رمز عبور خود را وارد کنید"
          @sendValue="(innerValue) => setInputsValues(innerValue, 'password')"
          :icon="{
            component: isPasswordVisible ? EyeOpenIcon : EyeClosedIcon,
            onClick: togglePasswordVisibility
          }"
        />

        <BaseButton
          class="form__submit"
          text="ورود"
          mode="primary"
          buttonType="submit"
          :isDisabled="isDisabled"
          :isLoading="isButtonLoading"
          @click="handleSubmit"
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
    margin-bottom: 0.5rem;
  }

  &__submit {
    margin-top: 1.5rem;
  }
}
</style>
