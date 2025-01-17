<template>
  <VaForm ref="passwordForm">
    <h1 class="font-semibold text-4xl mb-4">Password dimenticata?</h1>
    <p class="text-base mb-4 leading-5">
      Richiedi una nuova password inviando una mail a
      <a
          href="mailto:francesca.daga@ao-pisa.toscana.it?subject=Recupero%20password%20schedulatore&body=Ho%20dimenticato%20la%20password"
          class="font-semibold text-primary"
      >
        francesca.daga@ao-pisa.toscana.it
      </a>
    </p>
    <VaButton
      :to="{ name: 'login' }"
      class="w-full my-2"
      >Torna al login</VaButton
    >
  </VaForm>
</template>

<script lang="ts" setup>

</script>
