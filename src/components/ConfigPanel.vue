<template>
  <div v-if="isVisible" class="config-panel-overlay" @click="closePanel">
    <div class="config-panel" @click.stop>
      <div class="config-header">
        <h3>网站配置</h3>
        <button class="close-btn" @click="closePanel">×</button>
      </div>
      
      <div class="config-content">
        <!-- 网页标题 -->
        <div class="config-section">
          <label class="config-label">网页标题</label>
          <input 
            v-model="localConfig.pageTitle" 
            type="text" 
            class="config-input"
            placeholder="输入网页标题"
          >
        </div>
        
        <!-- 页面主标题 -->
        <div class="config-section">
          <label class="config-label">页面主标题</label>
          <input 
            v-model="localConfig.pageQuote" 
            type="text" 
            class="config-input"
            placeholder="输入页面主标题"
          >
        </div>
        
        <!-- Footer 配置 -->
        <div class="config-section">
          <h4 class="config-subtitle">Footer 信息</h4>
          
          <div class="config-row">
            <label class="config-label">网站文本</label>
            <input 
              v-model="localConfig.footer?.websiteText" 
              type="text" 
              class="config-input"
              placeholder="网站显示文本"
            >
          </div>
          
          <div class="config-row">
            <label class="config-label">网站链接</label>
            <input 
              v-model="localConfig.footer?.websiteUrl" 
              type="url" 
              class="config-input"
              placeholder="https://example.com"
            >
          </div>
          
        </div>
        
        <!-- 背景配置 -->
        <div class="config-section">
          <h4 class="config-subtitle">背景设置</h4>
          
          <div class="config-row">
            <label class="config-label">背景图片/视频</label>
            <input 
              v-model="localConfig.background?.image" 
              type="url" 
              class="config-input"
              placeholder="背景图片或视频URL"
            >
          </div>
          
          <div class="config-row">
            <label class="config-label">Bing 壁纸轮播</label>
            <input 
              v-model="localConfig.background?.bingWallpaper" 
              type="checkbox" 
              class="config-checkbox"
            >
          </div>
          
        </div>
        
        <!-- Favicon 配置 -->
        <div class="config-section">
          <h4 class="config-subtitle">网站图标</h4>
          
          <div class="config-row">
            <label class="config-label">图标URL</label>
            <input 
              v-model="localConfig.favicon?.icon" 
              type="url" 
              class="config-input"
              placeholder="图标URL"
            >
          </div>
          
        </div>
        
        <!-- 版权信息 -->
        <div class="config-section">
          <h4 class="config-subtitle">版权信息</h4>
          
          <div class="config-row">
            <label class="config-label">开始日期</label>
            <input 
              v-model="localConfig.copyright?.startDate" 
              type="date" 
              class="config-input"
            >
          </div>
          
          <div class="config-row">
            <label class="config-label">自动范围</label>
            <input 
              v-model="localConfig.copyright?.autoRange" 
              type="checkbox" 
              class="config-checkbox"
            >
          </div>
          
        </div>
        
      </div>
      
      <div class="config-footer">
        <button class="config-btn config-btn-primary" @click="saveConfig">保存配置</button>
        <button class="config-btn" @click="closePanel">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { AppConfig } from '@/config/configLoader'
import { appConfig, applyBackgroundConfig, applyPageTitle, applyFaviconConfig, applyColorsConfig, applyFontsConfig, formatCopyrightYear } from '@/config/generated'

// Props
const props = defineProps<{
  isVisible: boolean
}>()

// Emits
const emit = defineEmits<{
  close: []
}>()

// 本地配置
const localConfig = reactive<AppConfig>({
  pageTitle: '',
  pageQuote: '',
  footer: {
    websiteText: '',
    websiteUrl: ''
  },
  background: {
    image: '',
    bingWallpaper: false,
    bingMode: 'localFirst'
  },
  favicon: {
    icon: ''
  },
  copyright: {
    startDate: '',
    autoRange: true
  },
  colors: {
    autoColor: true,
    manual: {
      header: '#000000',
      cardTitle: '#000000',
      footer: '#666666'
    }
  },
  fonts: {
    header: {
      fontA: '',
      fontB: '',
      size: '',
      weight: ''
    },
    content: {
      category: {
        fontA: '',
        fontB: '',
        size: '',
        weight: ''
      },
      site: {
        fontA: '',
        fontB: '',
        size: '',
        weight: ''
      }
    },
    footer: {
      fontA: '',
      fontB: '',
      size: '',
      weight: ''
    }
  }
})

// 初始化配置
watch(() => props.isVisible, (visible) => {
  if (visible) {
    // 从全局配置复制到本地配置
    Object.assign(localConfig, appConfig)
  }
})

// 关闭面板
const closePanel = () => {
  emit('close')
}

// 保存配置
const saveConfig = async () => {
  try {
    // 应用配置
    if (localConfig.pageTitle) {
      applyPageTitle(localConfig.pageTitle)
    }
    
    if (localConfig.favicon) {
      applyFaviconConfig(localConfig.favicon)
    }
    
    if (localConfig.colors) {
      applyColorsConfig(localConfig.colors)
    }
    
    if (localConfig.fonts) {
      await applyFontsConfig(localConfig.fonts)
    }
    
    if (localConfig.background) {
      await applyBackgroundConfig(localConfig.background)
    }
    
    // 更新全局配置
    Object.assign(appConfig, localConfig)
    
    // 关闭面板
    closePanel()
    
    console.log('配置保存成功')
  } catch (error) {
    console.error('保存配置失败:', error)
  }
}
</script>

<style scoped>
.config-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.config-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.config-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.config-content {
  padding: 20px;
}

.config-section {
  margin-bottom: 24px;
}

.config-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.config-row {
  margin-bottom: 16px;
}

.config-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

.config-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.config-input:focus {
  outline: none;
  border-color: #007bff;
}

.config-checkbox {
  margin-right: 8px;
}

.config-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.config-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.config-btn:hover {
  background: #f5f5f5;
}

.config-btn-primary {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.config-btn-primary:hover {
  background: #0056b3;
  border-color: #0056b3;
}
</style>

.config-btn-secondary {
  background: #6c757d;
  color: #ffffff;
}

.config-btn-secondary:hover {
  background: #545b62;
}

/* 深色模式 */
:global(.dark-mode) .config-panel {
  background: #2a2a2a;
  color: #ffffff;
}

:global(.dark-mode) .config-header {
  border-bottom-color: #404040;
}

:global(.dark-mode) .config-header h3 {
  color: #ffffff;
}

:global(.dark-mode) .close-btn {
  color: #cccccc;
}

:global(.dark-mode) .close-btn:hover {
  background: #404040;
  color: #ffffff;
}

:global(.dark-mode) .config-subtitle {
  color: #ffffff;
  border-bottom-color: #404040;
}

:global(.dark-mode) .config-label {
  color: #cccccc;
}

:global(.dark-mode) .config-input,
:global(.dark-mode) .config-select {
  background: #404040;
  border-color: #606060;
  color: #ffffff;
}

:global(.dark-mode) .config-input:focus,
:global(.dark-mode) .config-select:focus {
  border-color: #007bff;
}

:global(.dark-mode) .config-hint {
  background: #404040;
  color: #cccccc;
}

:global(.dark-mode) .config-footer {
  background: #333333;
  border-top-color: #404040;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .config-panel {
    width: 95%;
    margin: 20px;
  }
  
  .config-content {
    padding: 20px;
  }
  
  .config-header {
    padding: 16px 20px;
  }
  
  .config-footer {
    padding: 16px 20px;
  }
}
</style>
