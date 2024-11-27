import {defineStore} from "pinia";
import axios from "axios";
import {Uo, User} from "../pages/settings/types";
import {Project} from "../pages/history/types";


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
            await axios
                .get('http://localhost:8000/api/scheduler/users')
                .then((res) => {
                    this.users = res.data;
                })
                .catch((error) => {
                })
        },
        async fetchProjects() {
            await axios
                .get('http://localhost:8000/api/scheduler/projects')
                .then((res) => {
                    this.projects = res.data;
                })
                .catch((error) => {
                })
        },
        async fetchUos() {
            await axios
                .get('http://localhost:8000/api/scheduler/uos')
                .then((res) => {
                    this.uos = res.data;
                })
                .catch((error) => {
                })
        }
    }
})