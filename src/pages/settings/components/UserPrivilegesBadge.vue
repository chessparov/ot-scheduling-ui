<script setup lang="ts">

import { PropType } from 'vue'
import { User } from '../types'

defineProps({
  privileges: {
    type: String as PropType<User['privileges']>,
    required: true,
  },
})

const badgeColorMap: Record<User['privileges'], string> = {
  viewer: 'primary',
  admin: 'warning',
}
function translateStatus(status: string) {
  const dictStatus = {
    'viewer': 'Visualizzatore',
    'admin': 'Admin',
  }
  return dictStatus[status]
}
</script>

<template>
  <VaBadge square :color="badgeColorMap[$props.privileges]" :text="translateStatus($props.privileges).toUpperCase()" />
</template>
