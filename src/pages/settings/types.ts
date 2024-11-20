import {Project} from "../history/types";

export type UserRole = 'admin' | 'viewer'

export type User = {
    id: number
    first_name: string
    last_name: string
    email: string
    is_admin: boolean
    date_joined: Date
    last_login: Date
    projects: Project[]
}

export type Uo = {
    id: number,
    title: string,
    creation_date: Date,
    fixed_schedule: boolean,
}

