import { defineStore } from 'pinia'
import DataStorage, { CustomLocalStorage } from '@/utils/storage'

export const useDataStorageStore = defineStore('storeDataStorage', {
  state: () => {
    return { userStorage: null, depositStorage: null }
  },
  actions: {
    setUserStorage(data) {
      this.userStorage = new DataStorage(data, 'userData', new CustomLocalStorage())
      this.userStorage.setItem();
    },

    setDepositStorage(data) {
      console.log(data)
      this.depositStorage = new DataStorage(data, 'depositData', new CustomLocalStorage())
      this.depositStorage.setItem();
    }
  },
  // persist: {
  //   enabled: true,
  //   storage: DataStorage,
  //   strategies: [
  //     {
  //       paths: ['accesstoken']
  //     }
  //   ]
  // }
})
