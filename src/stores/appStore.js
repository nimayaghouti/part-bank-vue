import { defineStore } from 'pinia'

export const useAppStore = defineStore('storeApp', {
  state: () => {
    return {
      isToastShowing: false,
      message: 'خطایی رخ داد',
      mode: 'error',
      appearFromY: 'bottom',
      appearFromX: 'right'
    }
  },
  actions: {
    showToast(toastParams) {
      this.mode = toastParams?.mode || 'error'
      this.message = toastParams?.message || 'خطایی رخ داد'
      this.appearFromY = toastParams?.appearFromY || 'bottom'
      this.appearFromX = toastParams?.appearFromX || 'right'

      this.isToastShowing = true
      setTimeout(() => {
        this.isToastShowing = false
      }, 3000)
    }
  }
})
