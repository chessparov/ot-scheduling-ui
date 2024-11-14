<script lang="ts">

import {useUserStore} from "@/stores/user-store";

export default {
  props: {
    modifiedSchedule: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      saveBtnStatus: false,
      userStore: useUserStore(),
    }
  }
}
</script>

<template>
  <VaCard>
    <div class="flex flex-col md:flex-row gap-2" style="justify-content: space-between">
      <div class="flex flex-col md:flex-row gap-2" v-if="userStore.admin">
        <VaButton
            :disabled="!modifiedSchedule"
            icon="check"
            class="calendar-button"
        >
          Salva Modifiche
        </VaButton>
        <VaButton
            icon="delete"
            color="danger"
            class="calendar-button"
        >
          Elimina
        </VaButton>
      </div>
      <div class="flex flex-col md:flex-row gap-2">
        <VaButton
            icon="download"
            class="calendar-button"
        >
          Download
        </VaButton>

      </div>
    </div>
  </VaCard>
</template>

<style scoped lang="scss">

.calendar-button {
  min-width: 10rem;
}

</style>