import { defineStore } from 'pinia'

export const useAppStore = defineStore('storeApp', {
  state: () => {
    return {
      dummyState: ''
    }
  },
  actions: {
    setDummyState() {}
  }
})
