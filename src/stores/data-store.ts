import {defineStore} from "pinia";
import axios from "axios";
import {Uo, User} from "../pages/settings/types";
import {Project} from "../pages/history/types";
import api from "../../axios";


export const useDataStore = defineStore('data', {
    state: () => {
        return {
            users: [] as User[],
            projects: [] as Project[],
            uos: [] as Uo[],
        }
    },
    actions: {
        async fetchUsers() {
            await api
                .get(axios.defaults.baseURL + '/api/scheduler/users')
                .then((res) => {
                    this.users = res.data;
                })
                .catch((error) => {
                })
        },
        async fetchProjects() {
            await api
                .get(axios.defaults.baseURL + '/api/scheduler/projects')
                .then((res) => {
                    this.projects = res.data;
                })
                .catch((error) => {
                })
        },
        async fetchUos() {
            await api
                .get(axios.defaults.baseURL + '/api/scheduler/uos')
                .then((res) => {
                    this.uos = res.data;
                })
                .catch((error) => {
                })
        }
    }
})