<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value)
    }
  },
  buttonType: {
    type: String,
    default: 'button',
    validator(value) {
      return ['button', 'submit', 'reset'].includes(value)
    }
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
    default: '22.125rem'
  }
})
</script>

<template>
  <button
    :type="buttonType"
    :class="['button', `button_${mode}`]"
    :style="{ maxWidth: maxWidth }"
    :disabled="isDisabled || isLoading"
  >
    <span v-if="isLoading" class="button__spinner"></span>
    <template v-else>
      <span class="button__icon">
        <slot name="prepend"></slot>
      </span>
      <span>{{ text }}</span>
      <span class="button__icon">
        <slot name="append"></slot>
      </span>
    </template>
  </button>
</template>

<style lang="scss">
.button {
  @include flex();
  @include text-style($weight: 700);
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  height: 3rem;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: 0.5s;

  &_primary {
    background-color: var(--primary-500);
    color: #fff;

    &:hover {
      filter: brightness(1.2);
    }

    &:active {
      background-color: var(--primary-700);
    }
  }

  &_secondary {
    background-color: var(--primary-50);
    color: var(--black-500);

    &:hover {
      filter: brightness(0.9);
    }

    &:active {
      background-color: var(--primary-100);
    }
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  &__spinner {
    width: 25px;
    height: 25px;
    border: 4px solid #fff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: rotate 1s linear infinite;
  }

  &__icon {
    @include flex();
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
