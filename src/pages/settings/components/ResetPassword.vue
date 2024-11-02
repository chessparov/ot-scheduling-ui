<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'

import { User, UserRole } from '../types'
import { validators } from '@/services/utils'

const props = defineProps({
  user: {
    type: Object as PropType<User | null>,
    default: null,
  },
  saveButtonLabel: {
    type: String,
    default: 'Salva',
  },
})

const defaultNewUser: User = {
  id: -1,
  avatar: '',
  name: '',
  privileges: 'viewer',
  surname: '',
  email: '',
  creation_date: '',
  password: ''
}

const newUser = ref<User>({ ...defaultNewUser })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newUser.value).some((key) => {
    if (key === 'avatar' || key === 'projects') {
      return false
    }

    return newUser.value[key as keyof User] !== (props.user ?? defaultNewUser)?.[key as keyof User]
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
        avatar: props.user.avatar || '',
      }
    },
    { immediate: true },
)

const avatar = ref<File>()

const makeAvatarBlobUrl = (avatar: File) => {
  return URL.createObjectURL(avatar)
}

watch(avatar, (newAvatar) => {
  newUser.value.avatar = newAvatar ? makeAvatarBlobUrl(newAvatar) : ''
})

const form = useForm('add-user-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newUser.value)
  }
}

const roleSelectOptions: { text: Capitalize<UserRole>; value: UserRole }[] = [
  { text: 'Admin', value: 'admin' },
  { text: 'Visualizzatore', value: 'viewer' },
]

</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">

    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
            v-model="newUser.password"
            type="password"
            label="Password"
            class="w-full sm:w-1/2"
            :rules="[validators.required]"
            name="name"
        />
        <VaInput
            v-model="newUser.password"
            type="password"
            label="Ripeti Password"
            class="w-full sm:w-1/2"
            :rules="[validators.required]"
            name="surname"
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