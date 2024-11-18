import {sleep} from '../../services/utils'
import {User} from './../../pages/users/types'
import usersDb from './users-db.json'
import projectsDb from './projects-db.json'
import {Project} from '../../pages/projects/types'
import {useDataStore} from "../../stores/data-store";
import axios from "axios";
import {resetPasswordForm} from "../../pages/settings/components/ResetPassword.vue";
import {useToast} from "vuestic-ui";

// const users = usersDb as User[]
export let users = useDataStore().users as User[]

export let usersUpdated = false;
export const updateUsers = () => {
  usersUpdated = !usersUpdated;
}

const { init: notify } = useToast()

const getUserProjects = (userId: number | string) => {
  return projectsDb
    .filter((project) => project.team.includes(Number(userId)))
    .map((project) => ({
      ...project,
      project_owner: users.find((user) => user.id === project.project_owner)!,
      team: project.team.map((userId) => users.find((user) => user.id === userId)!),
      status: project.status as Project['status'],
    }))
}

// Simulate API calls

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Filters = {
  search: string
}

const getSortItem = (obj: any, sortBy: string) => {
  return obj[sortBy]
}

export const getUsers = async (filters: Partial<Filters & Pagination & Sorting>) => {
  const {  search, sortBy, sortingOrder } = filters
  let filteredUsers = users
  if (search) {
    filteredUsers = filteredUsers.filter((user) => user.first_name.toLowerCase().includes(search.toLowerCase()))
  }

  filteredUsers = filteredUsers.map((user) => ({ ...user, projects: getUserProjects(user.id) }))

  if (sortBy && sortingOrder) {
    filteredUsers = filteredUsers.sort((a, b) => {
      const first = getSortItem(a, sortBy)
      const second = getSortItem(b, sortBy)
      if (first > second) {
        return sortingOrder === 'asc' ? 1 : -1
      }
      if (first < second) {
        return sortingOrder === 'asc' ? -1 : 1
      }
      return 0
    })
  }

  const { page = 1, perPage = 10 } = filters || {}
  return {
    data: filteredUsers.slice((page - 1) * perPage, page * perPage),
    pagination: {
      page,
      perPage,
      total: filteredUsers.length,
    },
  }
}

export const addUser = async (user: User) => {
  users.push(user)

}

export const updateUser = async (user: User) => {
  await axios
      .post('http://localhost:8000/api/scheduler/update-user',
          user,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      )
      .then((res) => {
        notify({
          message: `${user.first_name} ${user.last_name} modificato con successo`,
          color: 'success',
        })
        useDataStore().fetchUsers();
      })
  const index = users.findIndex((u) => u.id === user.id)
  users[index] = user
}

export const resetPassword = async (formData: resetPasswordForm) => {
  await axios
      .post('http://localhost:8000/api/scheduler/reset-password',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      )
      .then((res) => {
        notify({
          message: `Password dell'utente "${formData.user.first_name} ${formData.user.last_name}" ripristinata con successo`,
          color: 'success',
        })
        useDataStore().fetchUsers();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          notify({message: 'L\' utente non esiste', color: 'danger'});
        }
        else if (err.response.status === 403) {
          notify({message: 'Le password non coincidono', color: 'danger'});
        }
        else {
          notify({message: `Errore lato server: ${err.message}`, color: 'danger'});
        }
      })
  const index = users.findIndex((u) => u.id === formData.user.id)
  users[index] = formData.user
}

export const removeUser = async (user: User) => {
  await axios
      .delete('http://localhost:8000/api/scheduler/delete-user/' + user.email,
          user,
      )
      .then((res) => {
        notify({
          message: `${user.first_name} ${user.last_name} è stato eliminato`,
          color: 'success',
        })
        useDataStore().fetchUsers();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          notify({message: 'L\' utente non esiste', color: 'danger'});
        }
        else {
          notify({message: `Errore lato server: ${err.message}`, color: 'danger'});
        }
      })
  users.splice(
    users.findIndex((u) => u.id === user.id),
    1,
  )
}
