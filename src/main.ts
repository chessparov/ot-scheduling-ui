import "./scss/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { createVuestic } from "vuestic-ui";
import VueApexCharts from "vue3-apexcharts";

import vuesticGlobalConfig from "./services/vuestic-ui/global-config";
import stores from "./stores";
import router from "./router";

const app = createApp(App);

app.use(stores);
app.use(router);
app.use(VueApexCharts);
app.use(createVuestic({ config: vuesticGlobalConfig }));

app.mount("#app");
