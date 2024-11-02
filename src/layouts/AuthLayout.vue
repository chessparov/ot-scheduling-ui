<template>
  <VaLayout
    v-if="breakpoint.lgUp"
    class="h-screen bg-[var(--va-background-secondary)]"
  >
    <template #left>
      <RouterLink
        class="bg-primary h-full flex items-center justify-center"
        style="width: 35vw"
        to="/"
        aria-label="Visit homepage"
      >
        <div class="aoup-wrapper">
          <h1 id="ot-scheduler" class="va-h3" style="text-align: center">OT SCHEDULER</h1>
          <br />
          <h1 class="va-h6" style="font-size: 1.25rem; text-align: center; color: rgba(255, 255, 255, 0.86)">
            U.O. Innovazione Sviluppo e Analisi dei Processi
          </h1>
        </div>
      </RouterLink>
    </template>
    <template #content>
      <main
        class="h-full flex items-center justify-center mx-auto max-w-[420px]"
      >
        <RouterView />
      </main>
    </template>
  </VaLayout>

  <VaLayout v-else class="h-screen bg-[var(--va-background-secondary)]">
    <template #content>
      <div class="p-4">
        <main
          class="h-full flex flex-row items-center justify-start mx-auto max-w-[420px]"
        >
          <div class="flex flex-col items-start">
            <RouterLink class="py-4" to="/" aria-label="Visit homepage">
              <h1 id="ot-scheduler" class="va-h2">OT SCHEDULER</h1>
            </RouterLink>
            <RouterView />
          </div>
        </main>
      </div>
    </template>
  </VaLayout>
</template>

<script lang="ts" setup>
import { useBreakpoint } from "vuestic-ui";

const breakpoint = useBreakpoint();
</script>

<style lang="css" scoped>
.aoup-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

#ot-scheduler {
  color: rgba(255, 255, 255, 0.93);
}
</style>
