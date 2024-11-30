<script setup="ts">
import {onUpdated, ref} from 'vue'
import {createRegexMask, useInputMask} from "vuestic-ui";

// export default defineComponent({
//   name: "BindedSlider",
//   emits: ['update'],
//   props: {
//     sliderLabel: String,
//     sliderMin: Number,
//     sliderMax: Number,
//     sliderValue: {
//       type: Number,
//       required: true,
//     },
//     inputInnerLabel: String,
//     disabled: Boolean,
//     inputMessage: {
//       type: String,
//       required: false,
//     },
//   },
//   data() {
//     return {
//       passedValue: this.$props.sliderValue,
//       inputValue: ref(this.$props.sliderValue.toString()),
//       inputMask: ref(),
//     }
//   },
//   methods: {
//     cleanInput(input: string) {
//       input.replace(/[^0-9]/g, '1');
//       const cleanedInput = Number(input);
//       if (!isNaN(cleanedInput)) {
//         this.passedValue = cleanedInput;
//       }
//       else {
//         this.passedValue = 1;
//       }
//     },
//   },
//   mounted() {
//     useInputMask(createRegexMask(/[^0-9]/g), this.inputMask)
//   },
  // updated() {
  //   this.$emit('update', this.passedValue);
  // },
  // watch: {
  //   inputValue(newValue: string, oldValue: string) {
  //     if (newValue != oldValue) {
  //       this.cleanInput(newValue);
  //     }
  //   },
  //   passedValue(newValue: number, oldValue: number) {
  //     if (newValue != oldValue) {
  //       this.inputValue = newValue.toString();
  //     }
  //   }
  // }
// })

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
const inputMask = ref()

useInputMask(createRegexMask(/^[0-9]*$/), inputMask)

onUpdated(
    () => {
      if (typeof passedValue.value === "string") {
        if (props.sliderLabel === 'Montecarlo') {
          passedValue.value = 1;
        }
        else {
          passedValue.value = 0;
        }
      }
      emits('update', passedValue.value)
    }
)

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
        ref="inputMask"
        v-model.number="passedValue"
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