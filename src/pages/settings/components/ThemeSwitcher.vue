<template>
  <VaButtonToggle v-model="theme" color="background-element" border-color="background-element" :options="options" />
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import { useColors } from 'vuestic-ui'

const { applyPreset, currentPresetName } = useColors()

const theme = computed({
  get() {
    return currentPresetName.value
  },
  set(value) {
    applyPreset(value)
  },
})

const options = [
  { label: 'Chiaro', icon: 'light_mode', value: 'light' },
  { label: 'Scuro', icon: 'dark_mode', value: 'dark' },
]
</script>
