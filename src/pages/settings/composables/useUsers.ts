import { Ref, ref, unref, watch } from 'vue'
import { getUsers, updateUser, addUser, removeUser, type Filters, Pagination, Sorting } from '../../../data/pages/users'
import { User } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'name', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ search: '' })

export const useUsers = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const users = ref<User[]>([])

  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetchUsers = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getUsers({
      ...unref(filters),
      ...unref(sorting),
      ...unref(pagination),
    })
    users.value = data

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetchUsers, { deep: true })

  watch(
    filters,
    () => {
      // Reset pagination to first page when filters changed
      pagination.value.page = 1
      fetchUsers()
    },
    { deep: true },
  )

  fetchUsers()

  return {
    isLoading,

    filters,
    sorting,
    pagination,

    users,

    fetchUsers,

    async add(user: User) {
      isLoading.value = true
      await addUser(user)
      await fetchUsers()
      isLoading.value = false
    },

    async update(user: User) {
      isLoading.value = true
      await updateUser(user)
      await fetchUsers()
      isLoading.value = false
    },

    async remove(user: User) {
      isLoading.value = true
      await removeUser(user)
      await fetchUsers()
      isLoading.value = false
    },
  }
}
