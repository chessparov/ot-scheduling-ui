<template>
  <VaForm ref="passwordForm" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Password dimenticata?</h1>
    <p class="text-base mb-4 leading-5">
      Inserisci il tuo indirizzo e-mail e riceverai subito una nuova password.
    </p>
    <VaInput
      v-model="email"
      :rules="[(v) => !!v || 'Campo obbligatorio']"
      class="mb-4"
      label="Inserisci e-mail"
      type="email"
    />
    <VaButton class="w-full mb-2" @click="submit">Invia password</VaButton>
    <VaButton :to="{ name: 'login' }" class="w-full" preset="secondary" @click="submit">Torna al login</VaButton>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from 'vuestic-ui'
import { useRouter } from 'vue-router'

const email = ref('')
const form = useForm('passwordForm')
const router = useRouter()

const submit = () => {
  if (form.validate()) {
    router.push({ name: 'recover-password-email' })
  }
}
</script>
