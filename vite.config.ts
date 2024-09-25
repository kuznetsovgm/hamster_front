import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@app': path.resolve(__dirname, './src/modules/app'),
    }
  },
  envPrefix: 'REACT_APP',
  build: {
    outDir: "build",
    sourcemap: true,
    rollupOptions: {
      input: 'index.html'
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
