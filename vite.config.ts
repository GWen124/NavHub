import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'generate-config',
      buildStart() {
        // 构建前生成配置
        try {
          execSync('node scripts/generate-config.js', { stdio: 'inherit' })
          console.log('✅ 配置已生成')
        } catch (error) {
          console.warn('⚠️ 配置生成失败:', error)
        }
      }
    },
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
  },
  publicDir: 'public',
  // 排除不需要复制到 dist 的文件
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.otf'],
  // 使用 copyPublicDir 配置
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
    },
    // 复制 public 目录时排除特定文件
    copyPublicDir: true
  }
})