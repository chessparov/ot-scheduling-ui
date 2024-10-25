import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: 'Mimmo',
      surname: 'Albano',
      email: 'mc@gmail.com',
      memberSince: '24/10/2024',
    }
  },

  actions: {
    changeUserName(userName: string) {
      this.userName = userName
    },
    changeUserSurname(userSurname: string) {
      this.surname = userSurname
    }
  },
})
