import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: 'Mimmo',
      email: 'mc@gmail.com',
    }
  },

  actions: {
    changeUserName(userName: string) {
      this.userName = userName
    },
  },
})
