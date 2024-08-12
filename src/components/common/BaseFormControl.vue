<script setup>
import { ref } from 'vue'

const props = defineProps({
  // tag: {
  //   type: String
  // },
  labelText: {
    type: String
  },
  labelFor: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  },
  pattern: {
    type: String
  },
  maxlength: {
    type: String
  },
  validationMessage: {
    type: String
  },
  maxWidth: {
    type: String,
    default: '22.125rem'
  },
  height: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    default() {
      return {
        component: null,
        onClick: null,
        backgroundColor: 'none'
      }
    }
  }
})

const showMessage = ref({ state: true, type: '' })
const patternToRegex = new RegExp(props.pattern)

const handleOnInput = (event) => {
  if (patternToRegex.test(event.target.value)) {
    showMessage.value.state = false
  } else {
    showMessage.value.state = true
    showMessage.value.type = 'error'
  }
}
</script>

<template>
  <div class="control">
    <label class="control__label" :for="labelFor">{{ labelText }}</label>
    <div class="control__input-wrapper" :style="{ maxWidth: maxWidth, height: height }">
      <input
        class="control__input"
        :type="type"
        :id="labelFor"
        :placeholder="placeholder"
        :pattern="pattern"
        @input="handleOnInput"
        :maxlength="maxlength"
        autofocus
        required
      />
      <component
        v-if="icon.component"
        :is="icon.component"
        class="control__icon"
        @click="icon.onClick"
        :style="{ backgroundColor: icon.backgroundColor }"
      />
    </div>
    <div
      :style="{ opacity: showMessage.state ? 1 : 0 }"
      :class="`control__validation-message control__validation-message_${showMessage.type}`"
    >
      {{ validationMessage }}
    </div>
  </div>
</template>

<style lang="scss">
.control {
  @include flex($direction: column, $align: stretch);
  gap: 0.25rem;

  /////////////////

  &__label {
    color: var(--common-text-color);
    padding: 0 0.5rem;
  }

  /////////////////

  &__input-wrapper {
    display: flex;
    overflow: hidden;
    border-radius: 0.4rem;
    background-color: var(--common-surface-lightBlue);

    &:focus-within {
      outline: 2px solid var(--primary-200);
    }
  }

  &__input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0 0.5rem;
    background-color: transparent;
    text-align: right;
    color: var(--common-text-color);
    font-size: 14px;
    font-weight: 600;

    &::placeholder {
      font-weight: 400;
      color: var(--black-100);
      font-size: 14px;
    }
  }

  &__icon {
    height: 100%;
    width: 2.75rem;
    padding: 0 0.5rem;
    cursor: pointer;
  }

  /////////////////

  &__validation-message {
    padding: 0 0.5rem;
    color: var(--common-gray);
    font-size: 0.75rem;
    transition:
      color,
      opacity,
      0.7s ease;

    &_error {
      color: var(--fail-500);
    }
  }
}
</style>
