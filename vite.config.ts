import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/aura-skin-website/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
