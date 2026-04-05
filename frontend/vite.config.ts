import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/runtime',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    host: true,
    proxy: {
      '/runtime/api': {
        target: 'http://backend:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/runtime/, '')
      },
      '/runtime/graphql': {
        target: 'http://backend:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/runtime/, '')
      },
      '/runtime/productImg': {
        target: 'http://backend:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/runtime/, '')
      }
    }
  }
})
