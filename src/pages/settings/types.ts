export type UserRole = 'admin' | 'viewer'

export type User = {
    id: number
    name: string
    surname: string
    email: string
    privileges: UserRole
    avatar: string
    creation_date: Date
}

