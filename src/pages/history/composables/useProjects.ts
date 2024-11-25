import {Ref, ref, unref, watch} from 'vue'
import {
  getProjects,
  addProject,
  updateProject,
  removeProject,
  Sorting,
  Pagination,
  type Filters,
} from '../../../data/pages/projects'
import { Project } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'creation_date', sortingOrder: 'desc' })
const makeFiltersRef = () => ref<Partial<Filters>>({ search: '' })

export const useProjects = (options?: {
  sorting?: Ref<Sorting>;
  pagination?: Ref<Pagination>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const projects = ref<Project[]>([])

  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options ?? {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getProjects({
      ...unref(filters),
      ...unref(sorting),
      ...unref(pagination),
    })
    projects.value = data as Project[]

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  watch(
      filters,
      () => {
        // Reset pagination to first page when filters changed
        pagination.value.page = 1
        fetch()
      },
      { deep: true },
  )

  fetch()

  return {
    isLoading,

    filters,
    sorting,
    pagination,

    projects,

    fetch,

    async add(project: Omit<Project, 'id' | 'creation_date'>) {
      isLoading.value = true
      await addProject({
        ...project,
        author: project.author,
      })
      await fetch()
      isLoading.value = false
    },

    async update(project: Project) {
      isLoading.value = true
      await updateProject({
        ...project,
        author: project.author,
      })
      await fetch()
      isLoading.value = false
    },

    async remove(project: Project) {
      isLoading.value = true
      await removeProject({
        ...project,
        author: project.author,
      })
      await fetch()
      isLoading.value = false
    },
    async refresh() {
      isLoading.value = true
      await fetch()
      isLoading.value = false
    },

    pagination,
    sorting,
  }
}
