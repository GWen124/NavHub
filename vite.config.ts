import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-config',
      writeBundle() {
        // 复制 config.yml 到 dist 目录
        try {
          copyFileSync(resolve(__dirname, 'config.yml'), resolve(__dirname, 'dist/config.yml'))
          console.log('✅ config.yml copied to dist/')
        } catch (error) {
          console.warn('⚠️ Failed to copy config.yml:', error)
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})