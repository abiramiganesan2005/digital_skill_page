
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/digital_skill_page/',   // <-- EXACT repo name with leading & trailing slash
  plugins: [react()],
})
