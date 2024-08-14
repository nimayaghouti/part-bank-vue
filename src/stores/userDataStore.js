import { defineStore } from 'pinia'
import StorageData, { CustomLocalStorage } from '@/utils/storage'

export const useUserDataStore = defineStore('userDataStore', {
  state: () => {
    return { userData: null }
  },
  actions: {
    setUserData(data) {
      this.userData = new StorageData(data, 'userData', new CustomLocalStorage())
    }
  },
  // persist: {
  //   enabled: true,
  //   storage: localStorage
  //   // strategies: [
  //   //   {
  //   //     paths: ['accessToken']
  //   //   }
  //   // ]
  // }
})
