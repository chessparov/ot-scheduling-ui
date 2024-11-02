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
    disabled: Boolean,
  },
  data() {
    return {
      value: this.sliderValue,
      inputValue: '',
    }
  },
  methods: {
    cleanInput(input: String) {
      input = input.toString();
      input.replace(/[^0-9]/g, '');
      input = Number(input);
      if (!isNaN(input)) {
        this.value = input;
      }
      else {
        this.value = '';
      }
    }
  },
  updated() {
    this.$emit('update', this.value);
  },
  watch: {
    value(newValue: Number) {
      this.cleanInput(newValue);
    }
  }
})
</script>

<template>
  <div class="flex-col md:flex-row justify-space-between slider-wrapper gap-4">
    <VaSlider
        :label="sliderLabel"
        :disabled="disabled"
        v-model="value"
        :min="sliderMin"
        :max="sliderMax"
        :readonly="false"
        class="min-w-[50%]"
    />
    <VaInput
        v-model="value"
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