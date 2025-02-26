<script setup lang="ts">
import { PropType, computed } from 'vue'
import {defineVaDataTableColumns, useToast} from 'vuestic-ui'
import { Project } from '../types'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
import { Pagination, Sorting } from '@/data/pages/projects'
import { useVModel } from '@vueuse/core'
import Stores from "@/stores";
import {dateParser} from "../../../services/utils";


const columns = defineVaDataTableColumns([
  { label: 'Nome', key: 'title', sortable: true },
  { label: 'Autore', key: 'author', sortable: true },
  { label: 'Stato', key: 'status', sortable: true },
  { label: 'Data Creazione', key: 'creation_date', sortable: true },
  { label: ' ', key: 'actions' },
])

const props = defineProps({
  userStore: Stores,
  projects: {
    type: Array as PropType<Project[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  sortBy: {
    type: String,
    required: true,
  },
  sortingOrder: {
    type: [String, null],
    required: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
  input: {
    type: String,
    required: true,
  }
})

const emit = defineEmits<{
  (event: 'edit', project: Project): void
  (event: 'delete', project: Project): void
  (event: 'view', projectId: number): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

</script>

<template>
  <div>
    <VaDataTable
      v-model:sort-by="sortByVModel"
      v-model:sorting-order="sortingOrderVModel"
      class="va-table--clickable"
      :items="projects"
      :columns="columns"
      :loading="loading"
      :filter="props.input"
    >
      <template #cell(title)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]" @click="$emit('view', rowData.id)">
          {{ rowData.title }}
        </div>
      </template>
      <template #cell(author)="{ rowData }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]" @click="$emit('view', rowData.id)">
          {{ rowData.author }}
        </div>
      </template>

      <template #cell(status)="{ rowData: project }">
        <ProjectStatusBadge :status="project.status" />
      </template>

      <template #cell(creation_date)="{ rowData }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          {{ dateParser(rowData.creation_date) }}
        </div>
      </template>

      <template #cell(actions)="{ rowData: project }">
        <div class="flex gap-2 justify-end">
          <VaButton
              preset="primary"
              size="small"
              color="primary"
              icon="mso-visibility"
              aria-label="View project"
              @click="$emit('view', project.id as number)"
          />
          <VaButton
              v-if="userStore.admin"
              preset="primary"
              size="small"
              color="secondary"
              icon="mso-edit"
              aria-label="Edit project"
              @click="$emit('edit', project as Project)"
          />
          <VaButton
            v-if="userStore.admin"
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete project"
            @click="$emit('delete', project as Project)"
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

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
