import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自定义插件：复制 config.yml 到 dist 目录
    {
      name: 'copy-config',
      writeBundle() {
        const configPath = resolve(__dirname, 'config.yml')
        const distPath = resolve(__dirname, 'dist', 'config.yml')
        
        if (existsSync(configPath)) {
          copyFileSync(configPath, distPath)
          console.log('✅ config.yml copied to dist/')
        } else {
          console.warn('⚠️ config.yml not found')
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