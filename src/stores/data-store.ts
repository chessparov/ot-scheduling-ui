import {defineStore} from "pinia";
import axios from "axios";
import {User} from "../pages/settings/types";
import {Project} from "../pages/history/types";


export const useDataStore = defineStore('data', {
    state: () => {
        return {
            users: [] as User[],
            projects: [] as Project[],
        }
    },
    actions: {
        async fetchUsers() {
            await axios
                .get('http://localhost:8000/api/scheduler/users')
                .then((res) => {
                    this.users = res.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async fetchProjects() {
            await axios
                .get('http://localhost:8000/api/scheduler/login')
                .then((res) => {
                    this.projects = res.data.projects;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
})