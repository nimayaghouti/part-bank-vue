import { defineStore } from 'pinia'

export const useAppStore = defineStore('storeApp', {
  state: () => {
    return {
      isToastShowing: false,
      toastMessage: '',
      toastMode: 'error',
      appearFromX: 'right',
      appearFromY: 'top'
    }
  },
  actions: {
    showToast(mode, message) {
      this.isToastShowing = true
      this.toastMode = mode
      this.toastMessage = message
      setTimeout(() => {
        this.isToastShowing = false
      }, 3000)
    }
  }
})
