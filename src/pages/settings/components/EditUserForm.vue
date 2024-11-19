<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'

import { User, UserRole } from '../types'
import { validators } from '../../../services/utils'

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
  last_login: new Date(),
  projects: []
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

const form = useForm('add-user-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newUser.value)
  }
}

const roleSelectOptions = [
  { text: 'Admin', value: true },
  { text: 'Visualizzatore', value: false },
]

</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">

    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newUser.first_name"
          label="Nome"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="name"
        />
        <VaInput
          v-model="newUser.last_name"
          label="Cognome"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="surname"
        />
      </div>
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newUser.email"
          label="Email"
          class="w-full sm:w-1/2"
          :rules="[validators.required, validators.email]"
          name="email"
        />
        <VaSelect
            v-model="newUser.is_admin"
            label="Privilegi"
            class="w-full sm:w-1/2"
            :options="roleSelectOptions"
            :rules="[validators.required]"
            name="privileges"
            value-by="value"
        />
      </div>

      <div class="flex w-full">
          <VaDivider />
      </div>
      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full sm:flex-row sm:items-center">
        <VaButton preset="secondary" color="secondary" @click="$emit('close');">Annulla</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Salva</VaButton>
      </div>
    </div>
  </VaForm>
</template>
