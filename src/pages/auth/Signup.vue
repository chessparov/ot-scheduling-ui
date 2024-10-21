<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Crea un nuovo account</h1>
    <p class="text-base mb-4 leading-5">
      Possiedi già un account?
      <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">Login</RouterLink>
    </p>
    <VaInput
        v-model="formData.user"
        :rules="[(v) => !!v || 'Campo obbligatorio']"
        class="mb-4"
        label="Nome"
        type="username"
    />
    <VaInput
      v-model="formData.email"
      :rules="[(v) => !!v || 'Campo obbligatorio', (v) => /.+@.+\..+/.test(v) || 'Indirizzo e-mail invalido']"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        ref="password1"
        v-model="formData.password"
        :rules="passwordRules"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        messages="La password deve contenere almeno 8 caratteri"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
      <VaInput
        ref="password2"
        v-model="formData.repeatPassword"
        :rules="[
          (v) => !!v || 'Campo obbligatorio',
          (v) => v === formData.password || 'Le password non coincidono',
        ]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Conferma password"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit">Crea account</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  user: '',
  password: '',
  repeatPassword: '',
})

const submit = () => {
  if (validate()) {
    init({
      message: "Registrazione avvenuta con successo",
      color: 'success',
    })
    push({
      name: 'dashboard',
      params: { user: formData.user }
    })
  }
}

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || 'Campo obbligatorio',
  (v) => (v && v.length >= 8) || 'La password deve contenere almeno 8 caratteri',
  // (v) => (v && /[A-Za-z]/.test(v)) || 'Password must contain at least one letter',
  // (v) => (v && /\d/.test(v)) || 'Password must contain at least one number',
  // (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || 'Password must contain at least one special character',
]
</script>
