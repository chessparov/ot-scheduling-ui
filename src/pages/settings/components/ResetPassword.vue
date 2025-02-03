<script setup lang="ts">
import {PropType, computed, ref, watch, reactive} from 'vue'
import {useForm, VaForm} from 'vuestic-ui'

import { User, UserRole } from '../types'
import { validators } from '@/services/utils'

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  },
  saveButtonLabel: {
    type: String,
    default: 'Salva',
  },
})

const defaultNewUser: User = {
  id: -1,
  first_name: '',
  is_admin: false,
  last_name: '',
  email: '',
  date_joined: new Date(),
  last_login: new Date()
}

const newUser = ref<User>({ ...defaultNewUser })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newUser.value).some((key) => {
    if (key !== 'id')  {
      return newUser.value[key as keyof Omit<User, 'id'>] !== props.user?.[key as keyof Omit<User, 'id'>]
    }
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
    () => props.user,
    () => {
      if (!props.user) {
        return
      }

      newUser.value = {
        ...props.user,
      }
    },
    { immediate: true },
)
export type resetPasswordForm = {
  password: string
  repeatPassword: string
  user: User

}

const form = useForm('reset-password')
const formData: resetPasswordForm = reactive({
    password: '',
    repeatPassword: '',
    user: props.user
})

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', formData)
  }
}

const roleSelectOptions = [
  { text: 'Admin', value: true },
  { text: 'Visualizzatore', value: false },
]

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || "Campo obbligatorio",
  (v) =>
      (v && v.length >= 8) || "La password deve contenere almeno 8 caratteri",
  // (v) => (v && /[A-Za-z]/.test(v)) || 'Password must contain at least one letter',
  // (v) => (v && /\d/.test(v)) || 'Password must contain at least one number',
  // (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || 'Password must contain at least one special character',
];

</script>

<template>
  <VaForm v-slot="{ isValid }" ref="reset-password" class="flex-col justify-start items-start gap-4 inline-flex w-full">

    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
            v-model="formData.password"
            type="password"
            label="Nuova Password"
            class="w-full sm:w-1/2"
            :rules="[validators.required, passwordRules]"
        />
        <VaInput
            v-model="formData.repeatPassword"
            type="password"
            label="Ripeti Password"
            class="w-full sm:w-1/2"
            :rules="[validators.required, (v) => v === formData.password || 'Le password non coincidono']"
        />
      </div>
      <div class="flex w-full">
        <VaDivider />
      </div>
      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full sm:flex-row sm:items-center">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Annulla</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Salva</VaButton>
      </div>
    </div>
  </VaForm>
</template>