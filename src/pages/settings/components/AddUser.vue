<script setup lang="ts">
import {defineComponent, PropType, reactive} from 'vue'
import {useForm, useToast} from "vuestic-ui";
import axios from "axios";
import {useDataStore} from "@/stores/data-store";
import {updateUsers, users} from "@/data/pages/users";
import {useUsers} from "@/pages/settings/composables/useUsers";
import {User} from "@/pages/settings/types";
import {Pagination, Sorting} from "@/data/pages/projects";

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  },
  pagination: { type: Object as PropType<Pagination>, required: true },
})

const emit = defineEmits(['render', 'save'])
const form = useForm('formRef');
const formData = reactive({
  name: '',
  surname: '',
  email: '',
  password: '',
  confirm: '',
  editor: false
})

const { init: notify } = useToast()

const addUser = async () => {
  let newUser: User
  await axios
      .post('http://localhost:8000/api/scheduler/add-user',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      )
      .then(response => {
        notify({
          message: `L'account di ${formData.email} è stato creato con successo!`,
          color: 'success',
        });
        updateUsers();
        newUser = response.data as User
        form.reset()
        useDataStore().fetchUsers();
        emit('save', newUser)
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
</script>

<template >
  <VaForm ref="formRef">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col md:flex-row gap-4">
        <VaInput
            v-model="formData.name"
            label="Nome"
            placeholder="Inserisci nome"
       />
        <VaInput
            v-model="formData.surname"
            label="Cognome"
            placeholder="Inserisci cognome"
       />
        <VaInput
            v-model="formData.email"
            label="Email"
            placeholder="Inserisci email"
       />
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <VaInput
            v-model="formData.password"
            label="Password"
            type="password"
            autocomplete="new-password"
            placeholder="Inserisci password"
        />
        <VaInput
            v-model="formData.confirm"
            label="Conferma Password"
            type="password"
            placeholder="Conferma Password"
        />
        <VaCheckbox
            v-model="formData.editor"
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