<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AddUser"
})
</script>

<template>
  <VaForm>
    <VaInput
        label="Nome"
        placeholder="Inserisci nome"
   />
    <VaInput
        label="Cognome"
        placeholder="Inserisci cognome"
   />
    <VaInput
        label="Email"
        placeholder="Inserisci email"
   />
    <VaInput
        label="Password"
        type="password"
        placeholder="Inserisci password"
    />
    <VaInput
        label="Conferma Password"
        type="password"
        placeholder="Conferma Password"
    />
    <VaCheckbox label="Aggiungi privilegi da editor"/>
    <VaButton>
      Submit
    </VaButton>
  </VaForm>
</template>

<style scoped lang="scss">

</style>