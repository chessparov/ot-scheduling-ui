import { sleep } from '../../services/utils'
import projectsDb from './projects-db.json'
import usersDb from './users-db.json'
import {useDataStore} from "../../stores/data-store";
import {Project} from "../../pages/history/types";
import {users} from "./users";

// Simulate API calls
export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof (typeof fetchedProjects)[number] | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export const fetchedProjects: Project[] = useDataStore().projects

const getSortItem = (obj: any, sortBy: keyof (typeof fetchedProjects)[number]) => {
  if (sortBy === 'author') {
    return obj.author.first_name
  }

  if (sortBy === 'creation_date') {
    return new Date(obj[sortBy])
  }

  return obj[sortBy]
}

export const getProjects = async (options: Sorting & Pagination) => {

  const projects = fetchedProjects.map((project) => ({
    ...project,
    author: users.find((user) => user.id === project.author.id)! as (typeof users)[number],
  }))

  if (options.sortBy && options.sortingOrder) {
    projects.sort((a, b) => {
      a = getSortItem(a, options.sortBy!)
      b = getSortItem(b, options.sortBy!)
      if (a < b) {
        return options.sortingOrder === 'asc' ? -1 : 1
      }
      if (a > b) {
        return options.sortingOrder === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  const normalizedProjects: Project[] = projects.slice((options.page - 1) * options.perPage, options.page * options.perPage)

  return {
    data: normalizedProjects,
    pagination: {
      page: options.page,
      perPage: options.perPage,
      total: fetchedProjects.length,
    },
  }
}

export const addProject = async (project: Omit<(typeof fetchedProjects)[number], 'id' | 'creation_date'>) => {

  const newProject = {
    ...project,
    id: fetchedProjects.length + 1,
    creation_date: new Date().toLocaleDateString('gb', { day: 'numeric', month: 'short', year: 'numeric' }),
  }

  fetchedProjects.push(newProject)

  return {
    ...newProject,
    author: users.find((user) => user.id === project.author.id)! as (typeof users)[number],
  }
}

export const updateProject = async (project: (typeof fetchedProjects)[number]) => {

  const index = fetchedProjects.findIndex((p) => p.id === project.id)
  fetchedProjects[index] = project

  return project
}

export const removeProject = async (project: (typeof fetchedProjects)[number]) => {

  const index = fetchedProjects.findIndex((p) => p.id === project.id)
  fetchedProjects.splice(index, 1)

  return project
}
