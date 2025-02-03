<script setup lang="ts">
import {computed, PropType} from 'vue'
import { Project } from '../types'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
import Stores from "../../../stores";
import {useToast, VaCard, VaCardContent, VaInnerLoading} from "vuestic-ui";
import {dateParser} from "../../../services/utils";
import {Pagination} from "@/data/pages/projects";

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

defineEmits<{
  (event: 'edit', project: Project): void
  (event: 'delete', project: Project): void
  (event: 'view', projectId: number): void
}>()

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

</script>

<template>
  <VaInnerLoading
    v-if="projects.length > 0 || loading"
    :loading="loading"
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[4rem]"
  >
    <VaCard
      v-for="project in projects"
      :key="project.title"
      :style="{ '--va-card-outlined-border': '1px solid var(--va-background-element)' }"
      outlined
    >
      <VaCardContent class="flex flex-col h-full">
        <div class="text-[var(--va-secondary)]">{{ dateParser(project.creation_date) }}</div>
        <div class="flex flex-col items-center gap-4 grow">
          <h4 class="va-h4 text-center self-stretch overflow-hidden line-clamp-2 text-ellipsis">
            {{ project.title }}
          </h4>
          <p>
            <span class="text-[var(--va-secondary)]">Autore: </span>
            <span>{{ project.author }}</span>
          </p>
          <ProjectStatusBadge :status="project.status" />
        </div>
        <VaDivider class="my-6" />
        <div class="flex justify-center gap-20">
          <VaButton preset="secondary" v-if="userStore.admin" icon="mso-edit" color="secondary" @click="$emit('edit', project)" />
          <VaButton preset="secondary" icon="mso-visibility" color="primary" @click="$emit('view', project.id)" />
          <VaButton preset="secondary" v-if="userStore.admin" icon="mso-delete" color="danger" @click="$emit('delete', project)" />
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">No projects</div>
  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-6">
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

</template>
