<template>
  <VaButtonToggle v-model="theme" color="backgroundElement" border-color="background-element" :options="options" />
</template>
<script lang="ts" setup>
import {computed, watch} from 'vue'

import { useColors } from 'vuestic-ui'
import api from "../../../../axios";
import axios from "axios";

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

const updateTheme = async () => {
  await api
      .put(axios.defaults.baseURL + '/api/scheduler/update-theme',
          {
            currentTheme: theme.value,
          })
}

watch(theme, (oldTheme, newTheme) => {
  if (newTheme != oldTheme) {
    updateTheme();
  }
})
</script>
