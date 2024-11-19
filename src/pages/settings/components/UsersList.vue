<script setup lang="ts">
import {PropType, computed, toRef, onUpdated} from 'vue'
import {defineVaDataTableColumns, useModal} from 'vuestic-ui'
import { Pagination, Sorting } from '@/data/pages/projects'
import { useVModel } from '@vueuse/core'
import {User, UserRole} from "@/pages/settings/types";
import UserPrivilegesBadge from "@/pages/settings/components/UserPrivilegesBadge.vue";
import {dateParser} from "../../../services/utils";

const columns = defineVaDataTableColumns([
  { label: 'Nome', key: 'name', sortable: true },
  { label: 'Cognome', key: 'surname', sortable: true },
  { label: 'Email', key: 'email', sortable: true },
  { label: 'Privilegi', key: 'privileges', sortable: true },
  { label: 'Data Creazione', key: 'date_joined', sortable: true },
  { label: ' ', key: 'actions' },
])

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<Pagination>, required: true },
  sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  sortingOrder: { type: String as PropType<Sorting['sortingOrder']>, required: true },
})

const emit = defineEmits<{
  (event: 'edit-user', user: User): void
  (event: 'delete-user', user: User): void
  (event: 'reset-password', user: User): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const users = toRef(props, 'users')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const roleColors: Record<UserRole, string> = {
  admin: 'danger',
  viewer: 'background-element',
}

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

const { confirm } = useModal()

const onUserDelete = async (user: User) => {
  const agreed = await confirm({
    title: 'Elimina utente',
    message: `Eliminare in modo definitivo l'utente \"${user.first_name} ${user.last_name}\"?`,
    okText: 'Elimina',
    cancelText: 'Annulla',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-user', user)
  }
}

</script>

<template>
  <div>
    <VaDataTable
        class="va-table--clickable"
        :items="users"
        :columns="columns"
        :loading="loading"
    >
      <template #cell(name)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.first_name }}
        </div>
      </template>
      <template #cell(surname)="{ rowData }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          {{ rowData.last_name }}
        </div>
      </template>
      <template #cell(email)="{ rowData }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          {{ rowData.email }}
        </div>
      </template>
      <template #cell(date_joined)="{ rowData }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          {{ dateParser(rowData.date_joined) }}
        </div>
      </template>

      <template #cell(privileges)="{ rowData: user }">
        <UserPrivilegesBadge :privileges="user.is_admin ? 'admin' : 'viewer'" />
      </template>

      <template #cell(actions)="{ rowData: user }">
        <div class="flex gap-2 justify-end">
          <VaButton
              preset="primary"
              size="small"
              color="primary"
              icon="mso-edit"
              aria-label="Edit project"
              @click="$emit('edit-user', user as User)"
          />
          <VaButton
              preset="primary"
              size="small"
              color="warning"
              icon="vpn_key"
              aria-label="Reset Password"
              @click="$emit('reset-password', user as User)"
          />
          <VaButton
              preset="primary"
              size="small"
              icon="mso-delete"
              color="danger"
              aria-label="Delete project"
              @click="onUserDelete(user as User)"
          />
        </div>
      </template>
    </VaDataTable>
    <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
      <div>
        <b>{{ $props.pagination.total }} risultati.</b>
        Risultati per pagina
        <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
      </div>

      <div v-if="totalPages > 1" class="flex">
        <VaButton
            preset="secondary"
            icon="va-arrow-left"
            aria-label="Previous page"
            :disabled="$props.pagination.page === 1"
            @click="$props.pagination.page--"
        />
        <VaButton
            class="mr-2"
            preset="secondary"
            icon="va-arrow-right"
            aria-label="Next page"
            :disabled="$props.pagination.page === totalPages"
            @click="$props.pagination.page++"
        />
        <VaPagination
            v-model="$props.pagination.page"
            buttons-preset="secondary"
            :pages="totalPages"
            :visible-pages="5"
            :boundary-links="false"
            :direction-links="false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>