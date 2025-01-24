<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EmptyProject, Project } from '../types'
import { SelectOption } from 'vuestic-ui'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'

const props = defineProps<{
  project: Project | null
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', project: Project): void
  (event: 'close'): void
}>()

const defaultNewProject: EmptyProject = {
  title: '',
  author: undefined,
  status: undefined,
  schedule_data: JSON,
}

const newProject = ref({ ...defaultNewProject })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newProject.value).some((key) => {
    return (
      newProject.value[key as keyof EmptyProject] !== (props.project ?? defaultNewProject)?.[key as keyof EmptyProject]
    )
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.project,
  () => {
    if (!props.project) {
      return
    }

    newProject.value = {
      ...props.project,
      author: props.project.author,
    }
  },
  { immediate: true },
)

const required = (v: string | SelectOption) => !!v || 'This field is required'

</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput v-model="newProject.title" label="Nome" :rules="[required]" />
    <VaSelect
      v-model="newProject.status"
      label="Stato"
      :rules="[required]"
      track-by="value"
      value-by="value"
      :options="[
        { text: 'Test', value: 'in progress' },
        { text: 'Archiviato', value: 'archived' },
        { text: 'In Produzione', value: 'completed' },
      ]"
    >
      <template #content="{ value }">
        <ProjectStatusBadge v-if="value" :status="value.value" />
      </template>
    </VaSelect>
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancel</VaButton>
      <VaButton @click="validate() && $emit('save', newProject as Project)">{{ saveButtonLabel }}</VaButton>
    </div>
  </VaForm>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>
