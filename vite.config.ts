import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Base path matches the GitHub Pages repo path (username.github.io/portfolio/).
// Update this, and the absolute URLs in index.html and public/, if the repository is renamed.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
})
