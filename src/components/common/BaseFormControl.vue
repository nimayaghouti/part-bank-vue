<script setup>
import { ref } from 'vue'

const props = defineProps({
  // label
  labelText: {
    type: String
  },
  labelFor: {
    type: String
  },
  labelColor: {
    type: String,
    default: 'var(--text-color)'
  },

  // textfield (input / textarea)
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
  isAutofocus: {
    type: Boolean
  },
  isRequired: {
    type: Boolean
  },
  hasBorder: {
    type: Boolean
  },

  // textfield-wrapper
  validationMessage: {
    type: String
  },
  maxWidth: {
    type: String,
    default: '22.125rem'
  },
  height: {
    type: String,
    default: '3rem'
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

const emits = defineEmits(['sendValue'])

const htmlTag = props.type === 'textarea' ? 'textarea' : 'input'

const message = ref({ isShowing: true, type: '' })
const patternToRegex = new RegExp(props.pattern)

const handleValidationMessage = (event) => {
  if (patternToRegex.test(event.target.value)) {
    message.value.isShowing = false
  } else {
    message.value.isShowing = true
    message.value.type = 'error'
  }
}

const textfieldValue = ref('')

const handleOnInput = (event) => {
  if (props.validationMessage) handleValidationMessage(event)

  textfieldValue.value = event.target.value
  emits('sendValue', textfieldValue.value)
}
</script>

<template>
  <div class="control">
    <label class="control__label" :for="labelFor" :style="{ color: labelColor }">
      {{ labelText }}
    </label>
    <div
      :class="['control__textfield-wrapper', hasBorder && 'control__textfield-wrapper_has-border']"
      :style="{ maxWidth: maxWidth, height: height }"
    >
      <component
        :is="htmlTag"
        :class="`control__${htmlTag}`"
        :type="type"
        :id="labelFor"
        :placeholder="placeholder"
        :pattern="pattern"
        :maxlength="maxlength"
        :autofocus="isAutofocus"
        :required="isRequired"
        @input="handleOnInput"
        :value="textfieldValue"
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
      v-if="validationMessage"
      :style="{ opacity: message.isShowing ? 1 : 0 }"
      :class="['control__validation-message', `control__validation-message_${message.type}`]"
    >
      {{ validationMessage }}
    </div>
  </div>
</template>

<style lang="scss">
.control {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  /////////////////

  &__label {
    color: var(--common-text-color);
    padding: 0 0.5rem;
  }

  /////////////////

  &__textfield-wrapper {
    display: flex;
    width: 100%;
    overflow: hidden;
    border-radius: 0.4rem;
    background-color: var(--common-surface-lightBlue);

    &_has-border {
      border: 1px solid var(--black-50);
    }

    &:focus-within {
      outline: 2px solid var(--primary-200);
    }
  }

  &__input,
  &__textarea {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    background-color: transparent;
    text-align: right;
    color: var(--common-text-color);
    font-size: 14px;
    font-weight: 600;
    resize: none;

    &::placeholder {
      font-weight: 400;
      color: var(--black-100);
      font-size: 14px;
    }
  }

  &__input {
    padding: 0 0.5rem;
  }

  &__textarea {
    padding: 1rem 0.5rem;
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
