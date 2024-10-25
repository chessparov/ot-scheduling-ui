<script lang="ts">

export default {
  // Set to prevent warning of params passed that are not defined as props.
  // Another option to fix the issue would be to add constraint as a prop here in the definition
  inheritAttrs: false,
  data() {
    return {
    }
  }
}
</script>

<template>
<h1 class="va-h3">Vincoli</h1>
  <VaCard>
    <h1 class="va-h5" style="margin-top: 2rem">{{ $route.params.constraint }}</h1>
    <div class="flex flex-col gap-4">
      <VaDataTable>

      </VaDataTable>
    </div>
  </VaCard>
</template>

<style scoped lang="scss">

</style>