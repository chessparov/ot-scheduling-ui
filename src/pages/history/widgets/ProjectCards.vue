<script setup lang="ts">
import { PropType } from 'vue'
import { Project } from '../types'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
import Stores from "../../../stores";
import {useToast, VaCard, VaCardContent, VaInnerLoading} from "vuestic-ui";
import {dateParser} from "../../../services/utils";

defineProps({
  userStore: Stores,
  projects: {
    type: Array as PropType<Project[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

defineEmits<{
  (event: 'edit', project: Project): void
  (event: 'delete', project: Project): void
  (event: 'view', projectId: number): void
}>()


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
        <div class="flex justify-between" v-if="userStore.admin">
          <VaButton preset="secondary" icon="mso-visibility" color="primary" @click="$emit('view', project.id)" />
          <VaButton preset="secondary" icon="mso-edit" color="secondary" @click="$emit('edit', project)" />
          <VaButton preset="secondary" icon="mso-delete" color="danger" @click="$emit('delete', project)" />
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">No projects</div>
</template>
