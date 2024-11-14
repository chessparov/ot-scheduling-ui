<script setup lang="ts">
import {computed, ref} from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useProjects } from './composables/useProjects'
import ProjectCards from './widgets/ProjectCards.vue'
import ProjectTable from './widgets/ProjectsTable.vue'
import EditProjectForm from './widgets/EditProjectForm.vue'
import { Project } from './types'
import {useModal, useToast} from 'vuestic-ui'
import router from "@/router";
import {useUserStore} from "@/stores/user-store";

const doShowAsCards = useLocalStorage('projects-view', true)

const { projects, update, add, isLoading, remove, pagination, sorting } = useProjects()

const projectToEdit = ref<Project | null>(null)
const doShowProjectFormModal = ref(false)

const editProject = (project: Project) => {
  projectToEdit.value = project
  doShowProjectFormModal.value = true
}

const { init: notify } = useToast()

const onProjectSaved = async (project: Project) => {
  doShowProjectFormModal.value = false
  if ('id' in project) {
    await update(project as Project)
    notify({
      message: 'Schedula modificata',
      color: 'success',
    })
  } else {
    await add(project as Project)
    notify({
      message: 'Schedula creata',
      color: 'success',
    })
  }
}

const { confirm } = useModal()

const onProjectDeleted = async (project: Project) => {
  const response = await confirm({
    title: 'Elimina schedula',
    message: `Sei sicuro di voler eliminare la schedula "${project.project_name}"?`,
    okText: 'Elimina',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  await remove(project)
  notify({
    message: 'Schedula eliminata',
    color: 'success',
  })
}

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
</script>

<template>
  <h1 class="h1">Storico schedule</h1>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
              v-model="doShowAsCards"
              border-color="background-element"
              :options="[
              { label: 'Riquadri', value: true },
              { label: 'Elenco', value: false },
            ]"
          />
          <VaInput placeholder="Search">
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
      />
      <ProjectTable
          v-else
          v-model:sort-by="sorting.sortBy"
          v-model:sorting-order="sorting.sortingOrder"
          v-model:pagination="pagination"
          :user-store="userStore"
          :projects="projects"
          :loading="isLoading"
          @edit="editProject"
          @delete="onProjectDeleted"
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
