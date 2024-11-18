export type UserRole = 'admin' | 'viewer'

export type User = {
    id: number
    first_name: string
    last_name: string
    email: string
    is_admin: boolean
    date_joined: Date
    last_login: Date

}


