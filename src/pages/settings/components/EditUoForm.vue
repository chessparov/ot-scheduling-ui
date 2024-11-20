<script setup lang="ts">

import {useForm, VaCheckbox} from "vuestic-ui";
import {Uo} from "../../../pages/settings/types";
import {PropType, ref} from "vue";

const props = defineProps({
    uo: {
      type: Object as PropType<Uo> | undefined,
      required: true,
    },
    ifEdit: {
      type: String,
      required: true,
    },
    saveButtonLabel: {
      type: String,
      default: 'Salva',
    },
  }
)
const form = useForm('add-uo-form')
const emit = defineEmits(['close', 'save'])

let uoToModify = (props.ifEdit ? props.uo.title : props.ifEdit);
let uoTitle = ref(props.ifEdit ? props.uo.title : '');
let fixUo = ref(false);

const onSave = () => {
  emit('save', uoTitle.value, fixUo.value)
}

</script>

<template>
  <VaForm v-slot="{ isValid }" ref="form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
            v-model="uoTitle"
            :label="uoToModify ? 'Nuova denominazione' : 'Nuova unità operativa'"
            class="w-full"
            name="name"
        />
      </div>
      <VaCheckbox
          v-model="fixUo"
          label="Imposta reparto come politico"
      />
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
