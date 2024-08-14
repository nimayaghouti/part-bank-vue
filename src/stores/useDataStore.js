import { defineStore } from 'pinia'
import DataStorage, { CustomLocalStorage } from '@/utils/storage'

export const useDataStore = defineStore('storeData', {
  state: () => {
    return { userData: null, depositData: null, hasDepositAccount: false }
  },
  actions: {
    setUserData(data) {
      const userStorage = new DataStorage(data, 'userData', new CustomLocalStorage())
      userStorage.setItem()
      this.userData = userStorage.getItem()
    },

    setDepositData(data) {
      const depositStorage = new DataStorage(data, 'depositData', new CustomLocalStorage())
      depositStorage.setItem()
      this.depositData = depositStorage.getItem()
    },

    setHasDepositAccount(hasDepositAccount) {
      this.hasDepositAccount = hasDepositAccount
    }
  },
  persist: {
    enabled: true,
    storage: CustomLocalStorage
    // strategies: [
    //   {
    //     paths: ['accesstoken']
    //   }
    // ]
  }
})
