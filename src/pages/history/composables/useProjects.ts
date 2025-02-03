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

  watch(
      // Necessary for avoiding getting no objects in the case you switch perPage, but there are no sufficient objects
      // no more in this page. For e.g there are 75 rows in the table, I'm on page 3 and then I switch to 50 items per
      // page. Now I'm still at page 3, but there aren't obviously sufficient items, so I get a blank table.
      () => pagination.value.perPage,
      (newPagination, oldPagination) => {
        pagination.value.page = 1
        fetch()
      },
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
  }
}
