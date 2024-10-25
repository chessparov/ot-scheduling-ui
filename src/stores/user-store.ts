import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: 'Mimmo',
      surname: 'Albano',
      email: 'mc@gmail.com',
      memberSince: '24/10/2024',
      password: 'passwordsicura',
    }
  },

  actions: {
    changeUserName(userName: string) {
      this.userName = userName
    },
    changeUserSurname(userSurname: string) {
      this.surname = userSurname
    },
    changeUserEmail(userEmail: string) {
      this.email = userEmail;
    },
    checkPassword(inputPassword: string) {
      return this.password === inputPassword
    }
  },
})
