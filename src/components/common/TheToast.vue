<script setup>
import useShowToast from '@/composables/useShowToast'
import CircleErrorIcon from '@/assets/svg/icons/common/CircleErrorIcon.vue'

// const props = defineProps({
//   isShowing: {
//     type: Boolean,
//     default: false
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   icon: {
//     type: Object,
//     default() {
//       return CircleError
//     }
//   },
//   mode: {
//     type: String,
//     default: 'error',
//     validator(value) {
//       return ['error', 'info'].includes(value)
//     }
//   },
//   appearFromY: {
//     type: String,
//     default: 'bottom',
//     validator(value) {
//       return ['top', 'bottom'].includes(value)
//     }
//   },
//   appearFromX: {
//     type: String,
//     default: 'right',
//     validator(value) {
//       return ['left', 'right'].includes(value)
//     }
//   }
// })

const { isShowing, mode, message, appearFromY, appearFromX, icon } = useShowToast()
</script>

<template>
  <div
    :class="['toast', `toast_${mode}`]"
    :style="{
      opacity: isShowing ? '1' : '0',
      [appearFromY]: '3rem',
      [appearFromX]: '3rem'
    }"
  >
    <component v-if="icon" :is="icon" />
    <CircleErrorIcon v-else-if="mode === 'error'" />
    <span>{{ message }}</span>
  </div>
</template>

<style lang="scss">
.toast {
  position: fixed;
  z-index: 99;

  ///////////////

  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: $toast-width;
  height: 3.75rem;
  padding: 1rem;
  border-radius: 1rem;
  transition: opacity 0.7s ease-in-out;

  &_success {
    color: #fff;
    background-color: var(--success-500);
  }

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
