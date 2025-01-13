import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), svgr(), visualizer({
    open: true, // Автоматически открывает график в браузере после сборки
  }),],
  build: {
    target: 'esnext', // или 'modules' для более широкой совместимости
    minify: 'esbuild', // или 'terser' для более агрессивного сжатия

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
