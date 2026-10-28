import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Относительные пути к ресурсам: сайт работает и в корне домена,
  // и в подкаталоге GitHub Pages (https://<user>.github.io/TechMet/).
  base: './',
  plugins: [react()],
})
