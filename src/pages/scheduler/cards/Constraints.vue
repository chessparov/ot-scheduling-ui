<script lang="ts">
export default {
  data() {
    return {
      collapsed: false,
      constraint: "",
      uos: [
        "Chirurgia generale",
        "Urologia 1",
        "Endocrinochirurgia",
        "Chirurgia toracica",
      ],
    };
  },
};
</script>

<template>
  <VaCard class="w-full sm:w-[100%]">
    <VaCollapse
      header="Modifica Vincoli"
      class="min-w-96"
      v-model="collapsed"
      icon="subdirectory_arrow_right"
    >
      <div class="launcher-wrapper flex flex-col gap-2">
        <VaSelect
          v-model="constraint"
          label="Seleziona vincoli"
          placeholder="Scegli un vincolo da modificare..."
          :options="uos"
        >
        </VaSelect>
        <VaButton
          :to="{ name: 'constraints', params: { constraint: constraint } }"
        >
          Conferma
        </VaButton>
      </div>
    </VaCollapse>
  </VaCard>
</template>

<style scoped lang="scss"></style>
