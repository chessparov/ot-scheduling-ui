import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "",
      surname: "",
      email: "",
      memberSince: "",
      password: "",
      admin: false
    };
  },

  actions: {
    changeUserName(userName: string) {
      this.name = userName;
    },
    changeUserSurname(userSurname: string) {
      this.surname = userSurname;
    },
    changeUserEmail(userEmail: string) {
      this.email = userEmail;
    },
    checkPassword(inputPassword: string) {
      return this.password === inputPassword;
    },
    async fetchData() {
    }
  },
});
