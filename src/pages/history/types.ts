import { User } from '../settings/types'
import {users} from "../../data/pages/users";

export type Project = {
  id: number
  title: string
  author: (typeof users)[number]
  status: 'completed' | 'archived' | 'in progress'
  creation_date: string
  schedule_data: JSON
}

export type EmptyProject = Omit<Project, 'id' | 'author' | 'creation_date' | 'status'> & {
  author: Project['author'] | undefined
  status: Project['status'] | undefined
}
