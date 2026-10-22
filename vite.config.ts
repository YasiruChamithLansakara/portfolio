import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Base path matches the GitHub Pages repo path (username.github.io/portfolio/).
// Update this if the repository is created under a different name.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
})
