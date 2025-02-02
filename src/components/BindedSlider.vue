<script setup="ts">
import {computed, onUpdated, ref} from 'vue'
import {createRegexMask, useInputMask} from "vuestic-ui";

const props = defineProps({
  sliderLabel: String,
    sliderMin: Number,
    sliderMax: Number,
    sliderValue: {
      type: Number,
      required: true,
    },
    inputInnerLabel: String,
    disabled: Boolean,
    inputMessage: {
      type: String,
      required: false,
    },
})

const emits = defineEmits(['update'])
const passedValue = ref(props.sliderValue)

onUpdated(
    () => {
      emits('update', passedValue.value)
    }
)

const maskedValue = computed({
  get() { return passedValue.value },
  set(v) {
    if (props.sliderLabel === 'Montecarlo') {
      passedValue.value = Math.min(parseInt(v.replace(/[^0-9]/g, ""), 10) || 1, 10000);
    }
    else {
      passedValue.value = Math.min(parseInt(v.replace(/[^0-9]/g, ""), 10) || 0, 300);
    }
  }
})

</script>

<template>
  <div class="flex-col md:flex-row justify-space-between slider-wrapper gap-4">
    <VaSlider
        :label="sliderLabel"
        :disabled="disabled"
        v-model="passedValue"
        :min="sliderMin"
        :max="sliderMax"
        :readonly="false"
        class="min-w-[50%]"
    />
    <VaInput
        v-model="maskedValue"
        :disabled="disabled"
        :messages="inputMessage"
        strict-bind-input-value
        style="width: 40%"
    >
      <template #appendInner>
        {{ inputInnerLabel }}
      </template>
    </VaInput>
  </div>
</template>

<style scoped lang="scss">
.slider-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 1%;
}
</style>