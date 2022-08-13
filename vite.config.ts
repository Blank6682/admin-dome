import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue/macros'],
      dirs: ['./src/utils'],
      vueTemplate: true,
      resolvers: [ElementPlusResolver()],
    }),
    Unocss({
      presets: [presetAttributify(), presetIcons(), presetUno()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
