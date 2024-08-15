import { defineStore } from 'pinia'

export const useCreateAccountStore = defineStore('storeCreateAccount', {
  state: () => {
    return {
      userPersonalInfo: null,
      userIdCards: null
    }
  },
  actions: {
    setUserPersonalInfo(userPersonalInfo) {
      this.userPersonalInfo = userPersonalInfo
      console.log('pinia: userPersonalInfo', this.userPersonalInfo)
    },

    setUserIdCards(userIdCards) {
      this.userIdCards = userIdCards
      console.log('pinia: id cards', this.userIdCards)
    }
  }
})
