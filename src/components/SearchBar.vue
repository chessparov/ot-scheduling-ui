<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",
});
</script>

<template>
  <VaInput v-model="value" class="mb-6" placeholder="Cerca" id="search-bar">
    <template #prependInner>
      <VaIcon name="manage_search" color="secondary" />
    </template>
  </VaInput>
</template>

<style scoped lang="scss">
#search-bar {
  margin: 1vw;
}
</style>
