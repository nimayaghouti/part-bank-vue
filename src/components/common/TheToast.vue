<script setup>
import CircleError from '@/assets/svg/icons/common/circle-error.vue'

const props = defineProps({
  isShowing: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String
    // default: 'error'
  },
  message: {
    type: String
    // required: true
  },
  icon: {
    type: Object
  },
  appearFromX: {
    type: String
    // default: 'right'
  },
  appearFromY: {
    type: String
    // default: 'bottom'
  }
})

const isTop = props.appearFromY === 'top'
const isBottom = props.appearFromY === 'bottom'
const isLeft = props.appearFromX === 'left'
const isRight = props.appearFromX === 'right'
</script>

<template>
  <div :class="['toast', `toast_${mode}`]" :style="{ opacity: isShowing ? '1' : '0' }">
    <component v-if="icon" :is="icon" />
    <CircleError v-else="mode === 'error'" />
    <span
      :style="{
        top: isTop ? '3rem' : 'auto',
        bottom: isBottom ? '3rem' : 'auto',
        left: isLeft ? '3rem' : 'auto',
        right: isRight ? '3rem' : 'auto'
      }"
      >{{ message }}</span
    >
  </div>
</template>

<style lang="scss">
.toast {
  position: fixed;
  z-index: 99;
  bottom: 3rem;
  right: 3rem;

  ///////////////

  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: $snackbar-width;
  height: 3.75rem;
  padding: 1rem;
  border-radius: 1rem;
  transition:
    opacity,
    right,
    left,
    0.7s ease-in-out;

  &_error {
    color: #fff;
    background-color: var(--fail-500);
  }

  &_notif {
    color: #fff;
    background-color: var(--primary-500);
  }
}
</style>
