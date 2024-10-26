<script lang="ts">
import {defineComponent, reactive} from 'vue'
import {useForm} from "vuestic-ui";

export default defineComponent({
  name: "AddUser",
  data() {
    return {
      form: reactive({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: '',
        editor: false
      }),
      useForm: useForm('formRef')
    }
  },
})
</script>

<template ref="formRef">
  <VaForm>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col md:flex-row gap-6">
        <VaInput
            v-model="form.name"
            label="Nome"
            placeholder="Inserisci nome"
       />
        <VaInput
            v-model="form.surname"
            label="Cognome"
            placeholder="Inserisci cognome"
       />
        <VaInput
            v-model="form.email"
            label="Email"
            placeholder="Inserisci email"
       />
      </div>
      <div class="flex flex-col md:flex-row gap-6 ">
        <VaInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Inserisci password"
        />
        <VaInput
            v-model="form.repeatPassword"
            label="Conferma Password"
            type="password"
            placeholder="Conferma Password"
        />
        <VaCheckbox
            v-model="form.editor"
            label="Conferisci privilegi da amministratore"
            style="min-width: 20%; margin: auto"
        />
      </div>
      <VaButton style="max-width: 20%" type="submit">
        Aggiungi
      </VaButton>
    </div>
  </VaForm>
</template>

<style scoped lang="scss">

</style>