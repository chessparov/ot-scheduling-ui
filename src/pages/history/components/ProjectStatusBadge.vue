<script setup lang="ts">
import { PropType } from 'vue'
import { Project } from '../types'

defineProps({
  status: {
    type: String as PropType<Project['status']>,
    required: true,
  },
})

const badgeColorMap: Record<Project['status'], string> = {
  'in progress': 'primary',
  archived: 'secondary',
  completed: 'success',
}
function translateStatus(status: string) {
  const dictStatus = {
    'completed': 'produzione',
    'in progress': 'test',
    'archived': 'archiviato'
  }
  return dictStatus[status]
}
</script>

<template>
  <VaBadge square :color="badgeColorMap[$props.status]" :text="translateStatus($props.status).toUpperCase()" />
</template>
