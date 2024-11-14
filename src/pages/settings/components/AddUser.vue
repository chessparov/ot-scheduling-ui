<script lang="ts">
import {defineComponent, reactive} from 'vue'
import {useForm, useToast} from "vuestic-ui";
import axios from "axios";

export default defineComponent({
  name: "AddUser",
  methods: {
    addUser () {
      const { init: notify } = useToast();

      axios
          .post('http://localhost:8000/api/scheduler/add-user',
              this.form,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
          )
          .then(response => {
            notify({
              message: `L'account di ${this.form.email} è stato creato con successo!`,
              color: 'success',
            });
            this.useForm.reset();
          })
          .catch(error => {
            if (error.response.status === 401) {
              notify({
                message: 'Permesso negato: ' + `${error.response.data.message}`,
                color: 'danger',
              })
            }
            else {
              notify({
                message: 'Errore server interno: ' + `${error.response.data.message}`,
                color: 'danger',
              })
            }
          })
    }
  },
  data() {
    return {
      form: reactive({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirm: '',
        editor: false
      }),
      useForm: useForm('formRef'),
    }
  },
})
</script>

<template >
  <VaForm ref="formRef">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col md:flex-row gap-4">
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
      <div class="flex flex-col md:flex-row gap-4">
        <VaInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Inserisci password"
        />
        <VaInput
            v-model="form.confirm"
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
      <VaButton type="submit" @click="addUser()">
        Aggiungi
      </VaButton>
    </div>
  </VaForm>
</template>

<style scoped lang="scss">

</style>