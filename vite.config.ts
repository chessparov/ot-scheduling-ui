import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vercel from "vite-plugin-vercel";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { vuestic } from "@vuestic/compiler/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    vercel(),
    vuestic({
      devtools: true,
      cssLayers: true,
    }),
    vue(),
  ],
});
