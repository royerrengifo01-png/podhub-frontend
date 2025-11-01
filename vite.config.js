import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // 👇 Esta parte fuerza el puerto 5173
  server: {
    port: 5173,      // Usa siempre este puerto
    strictPort: true // Si el puerto está ocupado, lanza error (no cambia al 5174)
  },
})
