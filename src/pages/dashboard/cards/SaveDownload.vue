<script lang="ts">

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
    }
  }
}
</script>

<template>
  <VaCard>
    <div class="flex flex-col md:flex-row gap-2" style="justify-content: space-between">
      <div class="flex flex-col md:flex-row gap-2 button-wrapper-left">
        <VaButton
            :disabled="!modifiedSchedule"
            icon="check"
        >
          Salva Modifiche
        </VaButton>
        <VaButton
            icon="delete"
            color="danger"
            style="justify-content: right"
        >
          Elimina
        </VaButton>
      </div>
      <div class="flex flex-col md:flex-row gap-2 button-wrapper-right">
        <VaButton
            icon="download"
        >
          Download
        </VaButton>

      </div>
    </div>
  </VaCard>
</template>

<style scoped lang="scss">

.button-wrapper-left {
  justify-content: left;
  padding: 1rem;
}
.button-wrapper-right {
  justify-content: right;
  padding: 1rem;
}



</style>