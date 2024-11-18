<script setup lang="ts">

import { PropType } from 'vue'
import { User } from '../types'

defineProps({
  privileges: {
    type: String,
    required: true,
  },
})

const badgeColorMap = {
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
