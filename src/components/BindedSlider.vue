<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BindedSlider",
  props: {
    sliderLabel: String,
    sliderMin: Number,
    sliderMax: Number,
    sliderValue: Number,
    inputMessage: String | undefined,
    inputInnerLabel: String,
  },
  data() {
    return {
      value: this.sliderValue,
    }
  }
})
</script>

<template>
  <div class="slider-wrapper">
    <VaSlider
        :label="sliderLabel"
        v-model="value"
        :min="sliderMin"
        :max="sliderMax"
        :readonly="false"
        class="w-full sm:w-[70%]"
    />
    <VaInput
        v-model="value"
        class="w-full sm:w-[20%]"
        :messages="inputMessage"
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