<script setup lang="ts">
import {computed, onMounted, onUpdated, ref, setDevtoolsHook} from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useProjects } from './composables/useProjects'
import ProjectCards from './widgets/ProjectCards.vue'
import ProjectTable from './widgets/ProjectsTable.vue'
import EditProjectForm from './widgets/EditProjectForm.vue'
import { Project } from './types'
import {useModal, useToast} from 'vuestic-ui'
import {useUserStore} from "@/stores/user-store";
import axios from "axios";
import {useScheduleStore} from "@/stores/global-store";
import {useDataStore} from "@/stores/data-store";
import {useRouter} from "vue-router";

const doShowAsCards = useLocalStorage('projects-view', true)

const { projects, update, add, isLoading, refresh, remove, pagination, sorting, filters } = useProjects()

const projectToEdit = ref<Project | null>(null)
const doShowProjectFormModal = ref(false)

const editProject = (project: Project) => {
  projectToEdit.value = project
  doShowProjectFormModal.value = true
}

const { init: notify } = useToast()
const router = useRouter();

const onProjectSaved = async (project: Project) => {
  doShowProjectFormModal.value = false
  await update(project as Project)
}

const { confirm } = useModal()

const onProjectDeleted = async (project: Project) => {
  const response = await confirm({
    title: 'Elimina schedula',
    message: `Sei sicuro di voler eliminare la schedula "${project.title}"?`,
    okText: 'Elimina',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  await remove(project)
}

const input = ref('')
const editFormRef = ref()
const userStore = useUserStore()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Sono state apportate modifiche non salvate, procedere comunque?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}

const viewSchedule = async(scheduleId: number) => {
  await axios
      .get('http://localhost:8000/api/scheduler/get-schedule/' + scheduleId.toString())
      .then((res) => {
        let scheduleStore = useScheduleStore();
        scheduleStore.schedule_data =res.data.schedule_data;
        scheduleStore.scheduleName =res.data.title;
        scheduleStore.scheduleId =res.data.id;
        scheduleStore.scheduleStats =res.data.schedule_stats;
        router.push({name: 'dashboard'});
      })
      .catch((err) => {
        if (err.response.status === 404) {
          notify({message: 'La schedula non è stata trovata'})
        }
        else {
          notify({message: 'Errore lato server'})
        }
      })
}

onMounted(
    () => {
      useDataStore().fetchProjects();
      refresh();
    }
)

</script>

<template>
  <h1 class="h1">Storico schedule</h1>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-6 mb-6 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
              v-model="doShowAsCards"
              border-color="background-element"
              :options="[
              { label: 'Riquadri', value: true },
              { label: 'Elenco', value: false },
            ]"
          />
          <VaInput v-if="!doShowAsCards" v-model="filters.search" placeholder="Cerca...">
            <template #prependInner>
              <VaIcon name="manage_search" color="secondary" size="small" />
            </template>
          </VaInput>
<!--          <VaSelectOptionList -->
        </div>
        <VaButton v-if="userStore.admin" icon="add" @click="router.push({ name: 'schedule'})">Schedula</VaButton>
      </div>

      <ProjectCards
          v-if="doShowAsCards"
          :user-store="userStore"
          :projects="projects"
          :loading="isLoading"
          @edit="editProject"
          @delete="onProjectDeleted"
          @view="projectId => {viewSchedule(projectId)}"
      />
      <ProjectTable
          v-else
          v-model:sort-by="sorting.sortBy"
          v-model:sorting-order="sorting.sortingOrder"
          :pagination="pagination"
          :user-store="userStore"
          :projects="projects"
          :loading="isLoading"
          :input="input"
          @edit="editProject"
          @delete="onProjectDeleted"
          @view="(projectId: number) => {viewSchedule(projectId)}"
      />
    </VaCardContent>

    <VaModal
        v-slot="{ cancel, ok }"
        v-model="doShowProjectFormModal"
        size="small"
        mobile-fullscreen
        close-button
        stateful
        hide-default-actions
        :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="projectToEdit === null" class="va-h5 mb-4">Aggiungi schedula</h1>
      <h1 v-else class="va-h5 mb-4">Modifica schedula</h1>
      <EditProjectForm
          ref="editFormRef"
          :project="projectToEdit"
          :save-button-label="projectToEdit === null ? 'Aggiungi' : 'Salva'"
          @close="cancel"
          @save="
          (project) => {
            onProjectSaved(project)
            ok()
          }
        "
      />
    </VaModal>
  </VaCard>
</template>

<style lang="css" scoped>

</style>
