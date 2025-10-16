import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Only apply base path in production builds for GitHub Pages
  base: command === 'build' ? '/mln-131-su-menh-lich-su-cua-giai-cap-cong-nhan/' : '/'
}))
