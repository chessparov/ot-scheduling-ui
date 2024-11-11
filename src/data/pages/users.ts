import {sleep} from '../../services/utils'
import {User} from './../../pages/users/types'
import usersDb from './users-db.json'
import projectsDb from './projects-db.json'
import {Project} from '../../pages/projects/types'
import axios from "axios";

export const requestUsers = async (): Promise<User[]> => {
  let response;

  try {
    response = await axios.get('http://localhost:8000/api/scheduler/users');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  return response?.data as User[] ? response?.data : null;
}



const users = usersDb as User[]

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
    filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
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
  await sleep(1000)
  new Date().toLocaleDateString('gb', { day: 'numeric', month: 'short', year: 'numeric' })
  users.unshift(user)
}

export const updateUser = async (user: User) => {
  await sleep(1000)
  const index = users.findIndex((u) => u.id === user.id)
  users[index] = user
}

export const removeUser = async (user: User) => {
  await sleep(1000)
  users.splice(
    users.findIndex((u) => u.id === user.id),
    1,
  )
}
