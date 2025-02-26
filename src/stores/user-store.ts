import { defineStore } from "pinia";
import axios from "axios";
import api from "../../axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "",
      surname: "",
      email: "",
      memberSince: "",
      admin: false,
      loggedIn: false,
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
    async fetchData() {
        if (this.loggedIn) {
            await api
                .get(axios.defaults.baseURL + '/api/scheduler/login', )
                .then((res) => {
                    this.name = res.data.first_name;
                    this.surname = res.data.last_name;
                    this.email = res.data.email;
                    this.admin = res.data.is_admin;

                    let dateJoined = res.data.date_joined;
                    dateJoined = dateJoined.toString().split('T')[0].split('-');
                    this.memberSince = dateJoined[2] + '/' + dateJoined[1] + '/' + dateJoined[0];

                })
                .catch((err) => {
                })
        }
    }
  },
});
