<script lang="ts">

export default {
  name: "DashboardMenu",
  props: {
    macroTab: {
      type: String,
      default: "DASHBOARD",
    }
  },
  data() {
    return {
      currentTab: "DASHBOARD",
      tabs: ['DASHBOARD', 'STATISTICHE'],
    }
  }
}
</script>

<template>
  <VaCard>
    <VaTabs
        v-model="currentTab"
        vertical
        @update:model-value="$emit('changed-tab', currentTab)"
        style="margin-bottom: 5rem; margin-top: 1rem;"
    >
      <template #tabs>
        <VaTab
            v-for="tab in tabs"
            :key="tab"
            :name="tab"
            style="padding: 100% 0 100% 0"
        >
          <span>{{ tab }}</span>
        </VaTab>
      </template>
    </VaTabs>
  </VaCard>
</template>

<style scoped lang="scss">

</style>