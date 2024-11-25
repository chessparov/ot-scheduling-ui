import {useDataStore} from "../../stores/data-store";
import {Project} from "../../pages/history/types";
import {users} from "./users";
import axios from "axios";
import {useToast} from "vuestic-ui";
import {useUserStore} from "../../stores/user-store";

// Simulate API calls
export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof (Project[])[number] | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Filters = {
  search: string
}

// export const fetchedProjects = ref(useDataStore().projects);
export const fetchedProjects = (): Project[] => {

  let projects: Project[] = useDataStore().projects;
  if (useUserStore().admin) {
    return projects as Project[]
  }
  else {
    projects = projects.filter((project) => project.status === "completed")
    return projects as Project[]
  }
}

const {init: notify} = useToast();

const getSortItem = (obj: any, sortBy: keyof (Project[])[number]) => {
  if (sortBy === 'author') {
    return obj.author
  }

  if (sortBy === 'creation_date') {
    return new Date(obj[sortBy])
  }

  return obj[sortBy]
}

export const getProjects = async (filters: Partial<Filters & Pagination & Sorting>) => {
  const {  search, sortBy, sortingOrder } = filters

  let projects: Project[] = fetchedProjects();

  if (search) {
    projects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))
  }
  projects = projects.map((project) => ({
    ...project,
    author: users.find((user) => user.email === project.author)?.email! as string,
  }))

  if (sortBy && sortingOrder) {
    projects.sort((a, b) => {
      a = getSortItem(a, sortBy!)
      b = getSortItem(b, sortBy!)
      if (a < b) {
        return sortingOrder === 'asc' ? -1 : 1
      }
      if (a > b) {
        return sortingOrder === 'asc' ? 1 : -1
      }
      return 0
    })
  }
  const { page = 1, perPage = 10 } = filters || {}

  const normalizedProjects: Project[] = projects.slice((page - 1) * perPage, page * perPage)

  return {
    data: normalizedProjects,
    pagination: {
      page: page,
      perPage: perPage,
      total: projects.length,
    },
  }
}

export const addProject = async (project: (Project[])[number]) => {


  fetchedProjects().push(project)

  return project
}

export const updateProject = async (project: (Project[])[number]) => {
  await axios
      .put('http://localhost:8000/api/scheduler/update-project/' + project.id,
          {title: project.title,
                status: project.status,},
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      )
      .then((res) => {
        notify({
          message: `Elemento "${project.title}" modificata con successo`,
          color: 'success',
        })
        useDataStore().fetchProjects();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          notify({message: 'La schedula non esiste', color: 'danger'});
        }
        else {
          notify({message: `Errore lato server: ${err.message}`, color: 'danger'});
        }
      })
  const index = fetchedProjects().findIndex((p) => p.id === project.id)
  fetchedProjects()[index] = project

  return project
}

export const removeProject = async (project: (Project[])[number]) => {
  await axios
      .delete('http://localhost:8000/api/scheduler/delete-project/' + project.id)
      .then((res) => {
        notify({
          message: `Elemento "${project.title}" eliminato con successo`,
          color: 'success',
        })
        useDataStore().fetchProjects();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          notify({message: 'La schedula non esiste', color: 'danger'});
        }
        else {
          notify({message: `Errore lato server: ${err.message}`, color: 'danger'});
        }
      })
  const index = fetchedProjects().findIndex((p) => p.id === project.id)
  fetchedProjects().splice(index, 1)

  return project
}
