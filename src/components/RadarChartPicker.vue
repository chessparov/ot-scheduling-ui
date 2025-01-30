<template>
  <div class="flex flex-col">
    <canvas
        ref="chart"
        @mousedown="startDragging"
        @mousemove="dragMarker"
        @mouseup="stopDragging"
    ></canvas>
    <VaSlider
        v-model="alpha"
        :min="0"
        :step="1"
        :max="5"
    >
      <template #append>
        <VaCounter
            v-if="showCounter"
            class="slider"
            v-model="alpha"
            :min="0"
            :step="1"
            :max="5"
        />
      </template>
      <template #prepend>
        <div class="slider-label">
          &alpha;
        </div>
      </template>
    </VaSlider>
    <VaSlider
        v-model="beta"
        :min="0"
        :step="1"
        :max="5"
    >
      <template #append>
        <VaCounter
            v-if="showCounter"
            class="slider"
            v-model="beta"
            :min="0"
            :step="1"
            :max="5"
        />
      </template>
      <template #prepend>
        <div class="slider-label">
          &beta;
        </div>
      </template>
    </VaSlider>
    <VaSlider
        v-model="epsilon"
        :min="0"
        :step="1"
        :max="5"
    >
      <template #append>
        <VaCounter
            v-if="showCounter"
            class="slider"
            v-model="epsilon"
            :min="0"
            :step="1"
            :max="5"
        />
      </template>
      <template #prepend>
        <div class="slider-label">
          &epsilon;
        </div>
      </template>
    </VaSlider>
    <VaSlider
        v-model="theta"
        :min="0"
        :step="1"
        :max="5"
    >
      <template #append>
        <VaCounter
            v-if="showCounter"
            class="slider"
            v-model="theta"
            :min="0"
            :step="1"
            :max="5"
        />
      </template>
      <template #prepend>
        <div class="slider-label">
          &theta;
        </div>
      </template>
    </VaSlider>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import {VaCounter, VaSlider, useColors} from "vuestic-ui";

import {useGlobalStore, useOptParamsStore} from "@/stores/global-store";
import {useWindowSize} from "@vueuse/core";
Chart.register(...registerables);


export default {
  name: "RadarChart",
  components: {VaSlider, VaCounter},
  chart: null,
  data() {
    const { width } = useWindowSize()
    return {
      dragging: false,
      activeVertex: null,
      alpha: useGlobalStore().optParams[0],
      beta: useGlobalStore().optParams[1],
      epsilon: useGlobalStore().optParams[2],
      theta: useGlobalStore().optParams[3],
      currentPresetName: useColors().currentPresetName,
      showCounter: width > 400,
      width,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch: {
    width () {
      this.showCounter = this.width > 400;
    },
    alpha() {
      if (this.chart !== null) {
        this.chart.data.datasets[0].data[0] = this.alpha;
        this.chart.update();
        this.updateParams();
      }
    },
    beta() {
      if (this.chart) {
        this.chart.data.datasets[0].data[1] = this.beta;
        this.chart.update();
        this.updateParams();
      }
    },
    epsilon() {
      if (this.chart) {
        this.chart.data.datasets[0].data[2] = this.epsilon;
        this.chart.update();
        this.updateParams();
      }
    },
    theta() {
      if (this.chart) {
        this.chart.data.datasets[0].data[3] = this.theta;
        this.chart.update();
        this.updateParams();
      }
    }
  },
  methods: {
    updateParams() {
      useOptParamsStore().optParams = [this.alpha, this.beta, this.epsilon, this.theta];
    },
    initChart() {
      const ctx = this.$refs.chart.getContext("2d");

      this.chart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Numero interventi", "Ritardo medio", "Oncologici in orario", "Percentuale oncologici"],
          datasets: [
            {
              label: "Valore parametro",
              data: [this.alpha, this.beta, this.epsilon, this.theta],
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(0, 123, 255, 1)",
              pointRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              min: 0,
              max: 5,
              grid: {
                circular: true, // Makes the gridlines circular
                color: this.currentPresetName === 'light' ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.35)",
              },
              ticks: {
                stepSize: 1,
                display: true, // Show values on the radial scale
                backdropColor: "transparent", // Remove tick background
                color: this.currentPresetName === 'light' ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.84)",
              },
              angleLines: {
                display: true, // Show angle lines (spokes)
                color: "rgba(221,221,221,0.51)",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          layout: {
            autoPadding: true,
          }
        },
      });
    },
    getMousePosition(event) {
      const rect = this.$refs.chart.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    getPolarCoordinates(x, y) {
      const chartArea = this.chart.chartArea; // Get the chart area dimensions
      const cx = (chartArea.left + chartArea.right) / 2; // Center X
      const cy = (chartArea.top + chartArea.bottom) / 2; // Center Y

      // Apply an offset adjustment for the x-axis. Manual offset necessary because the label are considered inside the
      // chart area, but still they have variable length
      const xOffset = 20; // Adjust this based on the observed offset
      const dx = x - (cx + xOffset);
      const dy = y - cy;

      const r = Math.sqrt(dx * dx + dy * dy); // Radial distance
      const theta = Math.atan2(dy, dx); // Angle in radians
      return { r, theta };
    },
    findNearestVertex(theta) {
      const angles = [
        - Math.PI / 2, // 90 degrees (top)
        0, // 0 degrees (right)
        Math.PI / 2, // 270 degrees (bottom)
        Math.PI, // 180 degrees (left)
      ];

      let minDifference = Infinity;
      let closestCorner = null;
      let difference = null;

      angles.forEach((angle, index) => {
        // Necessary because of how theta is calculated. Near the third vertex on one side of the x-axis
        // theta is closer to - pi while on the other is closer to + pi
        if (index === 3) {
          difference = Math.min(Math.abs(angle - theta), Math.abs(angle + theta));
        }
        else {
          difference = Math.abs(angle - theta);
        }
        if (difference < minDifference) {
          minDifference = difference;
          closestCorner = index;
        }
      });
      return closestCorner;
    },
    startDragging(event) {
      const { x, y } = this.getMousePosition(event);
      const { theta } = this.getPolarCoordinates(x, y);

      this.activeVertex = this.findNearestVertex(theta);
      this.dragging = true;
    },
    dragMarker(event) {
      if (!this.dragging || this.activeVertex === null) return;

      const { x, y } = this.getMousePosition(event);
      const { r } = this.getPolarCoordinates(x, y);

      const newValue = Math.min(5, Math.max(0, Math.round((r / 130) * 5)));

      switch (this.activeVertex) {
        case 0:
          this.alpha = newValue;
          break;
        case 1:
          this.beta = newValue;
          break;
        case 2:
          this.epsilon = newValue;
          break;
        case 3:
          this.theta = newValue;
          break;
        default:
          break;
      }
    },
    stopDragging() {
      this.dragging = false;
      this.activeVertex = null;
    },
  },
};
</script>

<style>
canvas {
  @media (min-width: 640px) {
    margin: auto;
    min-width: 500px;
    min-height: 500px;
    max-width: 500px;
    max-height: 500px;
    width: 500px;
    height: 500px;
  }
}

.slider-label {
  width: 3rem;
  text-align: center;
}
.slider {

}
</style>