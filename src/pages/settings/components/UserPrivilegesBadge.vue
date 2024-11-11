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
  if (status === 'viewer') {
    return 'Visualizzatore'
  }
  else if (status === 'admin') {
    return 'Admin'
  }
}
</script>

<template>
  <VaBadge square :color="badgeColorMap[$props.privileges]" :text="translateStatus($props.privileges).toUpperCase()" />
</template>
