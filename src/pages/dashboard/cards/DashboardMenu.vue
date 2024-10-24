<script lang="ts">

export default {
  name: "DashboardMenu",
  data() {
    return {
      currentTab: "dashboard",
      tabs: ['DASHBOARD', 'STATISTICHE'],
    }
  }
}
</script>

<template>
  <VaCard>
    <VaTabs
        v-model="currentTab"
        stateful
        grow
        vertical
        style="margin-bottom: 2rem; margin-top: 0.5rem"
    >
      <template #tabs>
        <VaTab
            v-for="tab in tabs"
            :key="tab"
            :name="tab"
        >
          {{ tab }}
        </VaTab>
      </template>
    </VaTabs>
  </VaCard>
</template>

<style scoped lang="scss">

</style>