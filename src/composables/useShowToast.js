import { reactive, toRefs } from 'vue'
// import CircleError from '@/assets/svg/icons/common/circle-error.vue'

const toastProps = reactive({
  isShowing: false,
  mode: '',
  message: '',
  appearFromY: '',
  appearFromX: '',
  // icon: null
})

const useShowToast = () => {
  const defaultValues = {
    mode: 'error',
    message: 'خطایی رخ داد!',
    appearFromY: 'bottom',
    appearFromX: 'right',
    // icon: CircleError
  }

  const showToast = (propsObject = defaultValues) => {
    toastProps.mode = propsObject?.mode || defaultValues.mode
    toastProps.message = propsObject?.message || defaultValues.message
    toastProps.appearFromY = propsObject?.appearFromY || defaultValues.appearFromY
    toastProps.appearFromX = propsObject?.appearFromX || defaultValues.appearFromX
    // toastProps.icon = propsObject?.icon || defaultValues.icon

    toastProps.isShowing = true
    setTimeout(() => {
      toastProps.isShowing = false
    }, 3000)
  }

  return {
    ...toRefs(toastProps),
    showToast
  }
}

export default useShowToast
