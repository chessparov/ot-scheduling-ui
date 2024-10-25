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
          v-model="oldPassowrd"
          :rules="oldPasswordRules"
          label="Password precedente"
          placeholder="Password precedente"
          required-mark
          type="password"
        />
        <div class="hidden md:block" />
        <VaInput
          v-model="newPassword"
          :rules="newPasswordRules"
          label="Nuova password"
          placeholder="Nuova password"
          required-mark
          type="password"
        />
        <VaInput
          v-model="repeatNewPassword"
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
            <VaIcon :name="newPassword?.length! >= 8 ? 'mso-check' : 'mso-close'" color="secondary" size="20px" />
          </div>
          <p>Lunghezza minima 8 caratteri</p>
        </div>
      </div>
      <div class="flex flex-col-reverse md:justify-end md:flex-row md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" color="secondary" @click="emits('cancel')"> Annulla</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="submit" @click="submit"> Conferma</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, useToast } from 'vuestic-ui'

const buttonStyles = {
  '--va-button-font-size': '14px',
  '--va-button-line-height': '20px',
}
const oldPassowrd = ref<string>()
const newPassword = ref<string>()
const repeatNewPassword = ref<string>()

const { validate } = useForm('form')
const { init } = useToast()

const emits = defineEmits(['cancel'])
const props = defineProps(['field'])

const submit = () => {
  if (validate()) {
    init({ message: "Password modificata con successo", color: 'success' })
    emits('cancel')
  }
}

const oldPasswordRules = [(v: string) => !!v || 'Campo obbligatorio']

const newPasswordRules = [
  (v: string) => !!v || 'Campo obbligatorio',
  (v: string) => v?.length >= 8 || 'La password deve essere lunga almeno 8 caratteri',
  (v: string) => v !== oldPassowrd.value || 'Password già utilizzata in precedenza',
]

const repeatNewPasswordRules = [
  (v: string) => !!v || 'Campo obbligatorio',
  (v: string) => v === newPassword.value || 'Le password non corrispondono',
]
</script>

<style lang="scss">
// TODO temporary before https://github.com/epicmaxco/vuestic-ui/issues/4020 fix
.va-modal__inner {
  min-width: 326px;
}
</style>
