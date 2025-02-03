<template>
  <VaModal
    max-width="530px"
    :mobile-fullscreen="false"
    hide-default-actions
    model-value
    close-button
    @update:modelValue="emits('cancel')"
  >
    <h1 class="va-h5 mb-4">Reimposta password</h1>
    <VaForm ref="form" class="space-y-6" @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VaInput
          v-model="formData.oldPassword"
          :rules="oldPasswordRules"
          label="Password precedente"
          placeholder="Password precedente"
          required-mark
          type="password"
        />
        <div class="hidden md:block" />
        <VaInput
          v-model="formData.newPassword"
          :rules="newPasswordRules"
          label="Nuova password"
          placeholder="Nuova password"
          required-mark
          type="password"
        />
        <VaInput
          v-model="formData.repeatNewPassword"
          :rules="repeatNewPasswordRules"
          label="Ripeti la nuova password"
          placeholder="Ripeti la nuova password"
          required-mark
          type="password"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-2 items-center">
          <div>
            <VaIcon :name="formData.newPassword?.length! >= 8 ? 'mso-check' : 'mso-close'" color="secondary" size="20px" />
          </div>
          <p>Lunghezza minima 8 caratteri</p>
        </div>
      </div>
      <div class="flex flex-col-reverse md:justify-end md:flex-row md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" type="button" color="secondary" @click="emits('cancel')">Annulla</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="button" @click="submit">Conferma</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue'
import { useForm, useToast } from 'vuestic-ui'
import axios from "axios";
import {useUserStore} from "@/stores/user-store";
import api from "../../../../axios";

const buttonStyles = {
  '--va-button-font-size': '14px',
  '--va-button-line-height': '20px',
}
const { validate } = useForm('form')

const formData = reactive({
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: '',
});

const { init } = useToast()

const emits = defineEmits(['cancel'])
const props = defineProps(['field'])
const userStore = useUserStore()

const submit = () => {
  if (validate()) {
    api
        .put(axios.defaults.baseURL + '/api/scheduler/mod-password/' + userStore.email.toString(),
            {
              oldPassword: formData.oldPassword,
              newPassword: formData.newPassword,
              repeatNewPassword: formData.repeatNewPassword,
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            })
        .then(response => {
          init({ message: "Password modificata con successo", color: 'success' })
          emits('cancel')
        })
        .catch(error => {
          if (error.response.status === 403) {
            init({ message: "Le password non corrispondono", color: 'danger' })
          }
          else if (error.response.status === 401) {
            init({ message: "Password invalida", color: 'danger' })
          }
        })

  }
}

const oldPasswordRules = [(v: string) => !!v || 'Campo obbligatorio']

const newPasswordRules = [
  (v: string) => !!v || 'Campo obbligatorio',
  (v: string) => v?.length >= 8 || 'La password deve essere lunga almeno 8 caratteri',
  (v: string) => v !== formData.oldPassword || 'Password già utilizzata in precedenza',
]

const repeatNewPasswordRules = [
  (v: string) => !!v || 'Campo obbligatorio',
  (v: string) => v === formData.newPassword || 'Le password non corrispondono',
]
</script>

<style lang="scss">
// TODO temporary before https://github.com/epicmaxco/vuestic-ui/issues/4020 fix
.va-modal__inner {
  min-width: 326px;
}
</style>
