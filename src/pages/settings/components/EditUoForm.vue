<script setup lang="ts">

import {useForm} from "vuestic-ui";

const props = defineProps({
    uo: String | null,
    saveButtonLabel: {
      type: String,
      default: 'Salva',
    },
  }
)

const form = useForm('add-user-form')
const emit = defineEmits(['close', 'save'])
let uoToModify = props.uo;

const onSave = () => {
  emit('save', uoToModify)
}

</script>

<template>
  <VaForm v-slot="{ isValid }" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
            v-model="uoToModify"
            :label="uoToModify ? 'Nuova denominazione' : 'Nuova unità operativa'"
            class="w-full"
            name="name"
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
