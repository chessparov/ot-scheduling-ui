<template>
  <div>
    <h1 class="font-semibold text-4xl mb-4">Controlla la casella di posta</h1>
    <p class="text-base mb-4 leading-5">
      Le istruzioni per il recupero della password sono state inviate sulla casella di posta indicata.
    </p>

    <div class="flex justify-center mt-4">
      <VaButton :to="{ name: 'login' }" class="w-full">Torna al login</VaButton>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
