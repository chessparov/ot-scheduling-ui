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
            v-model="alpha"
            :min="0"
            :step="1"
            :max="5"
        />
      </template>
      <template #prepend>
        <div style="width: 12rem">
          Numero interventi
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
            v-model="beta"
            :min="0"
            :step="1"
            :max="5"
        />
      </template>
      <template #prepend>
        <div style="width: 12rem">
          Ritardo medio
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
            v-model="epsilon"
            :min="0"
            :step="1"
            :max="5"
        />
      </template>
      <template #prepend>
        <div style="width: 12rem">
          Percentuale oncologici in orario
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
            v-model="theta"
            :min="0"
            :step="1"
            :max="5"
        />
      </template>
      <template #prepend>
        <div style="width: 12rem">
          Percentuale oncologici
        </div>
      </template>
    </VaSlider>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import {VaCounter, VaSlider} from "vuestic-ui";
Chart.register(...registerables);


export default {
  name: "RadarChart",
  components: {VaSlider, VaCounter},
  chart: null,
  data() {
    return {
      dragging: false,
      marker: { x: 1, y: 1 }, // Normalized coordinates (0 to 1)
      alpha: 0,
      beta: 0,
      epsilon: 0,
      theta: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch: {
    alpha() {
      if (this.chart !== null) {
        this.chart.data.datasets[0].data[0] = this.alpha
        this.chart.update()
      }
    },
    beta() {
      if (this.chart) {
        this.chart.data.datasets[0].data[1] = this.beta
        this.chart.update()
      }
    },
    epsilon() {
      if (this.chart) {
        this.chart.data.datasets[0].data[2] = this.epsilon
        this.chart.update()
      }
    },
    theta() {
      if (this.chart) {
        this.chart.data.datasets[0].data[3] = this.theta
        this.chart.update()
      }
    }
  },
  methods: {
    initChart() {
      const ctx = this.$refs.chart.getContext("2d");

      this.chart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Numero interventi", "Ritardo medio", "Oncoligi in orario", "Percentuale oncologici"],
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
          maintainAspectRatio: true, // Ensures a consistent aspect ratio
          aspectRatio: 1, // Forces the canvas to be a square
          responsive: true,
          scales: {
            r: {
              min: 0,
              max: 5,
              grid: {
                circular: true, // Makes the gridlines circular
              },
              ticks: {
                stepSize: 1,
                display: true, // Show values on the radial scale
                backdropColor: "transparent", // Remove tick background
              },
              angleLines: {
                display: true, // Show angle lines (spokes)
                color: "#ddd",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          layout: {
            padding: 4,
          }
        },
      });
    },
    getMousePosition(event) {
      const rect = this.$refs.chart.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const normalizedX = x / rect.width;
      const normalizedY = y / rect.height;
      return { x: normalizedX, y: normalizedY };
    },
    startDragging(event) {
      this.dragging = true;
    },
    dragMarker(event) {
      if (!this.dragging) return;

      const { x, y } = this.getMousePosition(event);

      // Update marker position (clamp between 0 and 1)
      // this.marker.x = Math.min(1, Math.max(0, x));
      // this.marker.y = Math.min(1, Math.max(0, y));
      this.marker.x = Math.min(5, Math.max(0, Math.round(5 * x)));
      this.marker.y = Math.min(5, Math.max(0, Math.round(5 * y)));

      // Update radar chart dataset
      this.chart.data.datasets[0].data = [
        this.marker.y,
        this.marker.x,
        5 - this.marker.y,
        5 - this.marker.x,
      ];

      this.alpha = this.marker.y;
      this.beta = this.marker.x;
      this.epsilon = 5 - this.marker.y;
      this.theta = 5 - this.marker.x;

      this.chart.update()
    },
    stopDragging() {
      this.dragging = false;
    },
  },
};
</script>

<style>
canvas {
  margin: auto;
  max-width: 500px;
  max-height: 500px;
}
</style>