

export type Project = {
  id: number
  title: string
  author: string
  status: 'completed' | 'archived' | 'in progress'
  creation_date: string
  modified: boolean
  schedule_data: JSON
  schedule_stats: JSON
  mc_results: JSON
  note: JSON
}

export type EmptyProject = Omit<Project, 'id' | 'author' | 'creation_date' | 'status'> & {
  author: Project['author'] | undefined
  status: Project['status'] | undefined
}
