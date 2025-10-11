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
              v-model="localConfig.footer.websiteText" 
              type="text" 
              class="config-input"
              placeholder="网站显示文本"
            >
          </div>
          
          <div class="config-row">
            <label class="config-label">网站链接</label>
            <input 
              v-model="localConfig.footer.websiteUrl" 
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
            <label class="config-label">Bing 轮播背景</label>
            <div class="config-checkbox">
              <input 
                v-model="localConfig.background.bingWallpaper" 
                type="checkbox" 
                id="bingWallpaper"
              >
              <label for="bingWallpaper">启用 Bing 每日图片轮播背景</label>
            </div>
            <div class="config-hint">
              启用：使用 Bing 每日图片作为背景（优先级高于自定义背景）<br>
              禁用：使用自定义背景图片
            </div>
          </div>
          
          <div class="config-row">
            <label class="config-label">自定义背景图片</label>
            <input 
              v-model="localConfig.background.image" 
              type="text" 
              class="config-input"
              placeholder="输入本地图片路径或网络图片链接，留空表示无背景"
            >
            <div class="config-hint">
              示例：<br>
              • 本地图片：bg.jpg 或 images/background.png<br>
              • 网络图片：https://example.com/image.jpg<br>
              • 留空：无背景<br>
              • 注意：Bing 轮播背景开启时，此设置将被覆盖
            </div>
          </div>
        </div>
        
        <!-- Favicon 配置 -->
        <div class="config-section">
          <h4 class="config-subtitle">标签页图标</h4>
          
          <div class="config-row">
            <label class="config-label">图标路径</label>
            <input 
              v-model="localConfig.favicon.icon" 
              type="text" 
              class="config-input"
              placeholder="输入本地图标路径或网络图标链接，留空表示使用默认图标"
            >
            <div class="config-hint">
              示例：<br>
              • 本地图标：favicon.ico 或 images/icon.png<br>
              • 网络图标：https://example.com/favicon.ico<br>
              • 留空：使用默认图标
            </div>
          </div>
        </div>
        
        <!-- 版权信息配置 -->
        <div class="config-section">
          <h4 class="config-subtitle">版权信息</h4>
          
          <div class="config-row">
            <label class="config-label">开始日期</label>
            <input 
              v-model="localConfig.copyright.startDate" 
              type="date" 
              class="config-input"
              placeholder="2025-01-01"
            >
            <div class="config-hint">
              格式：YYYY-MM-DD<br>
              示例：2025-01-01 或 2025-12-31
            </div>
          </div>
          
          <div class="config-row">
            <label class="config-label">自动年份范围</label>
            <div class="config-checkbox">
              <input 
                v-model="localConfig.copyright.autoRange" 
                type="checkbox" 
                id="autoRange"
              >
              <label for="autoRange">启用自动计算年份范围</label>
            </div>
            <div class="config-hint">
              启用：根据当前日期自动计算显示格式<br>
              禁用：始终显示开始年份
            </div>
          </div>
        </div>
        
      </div>
      
      <div class="config-footer">
        <button class="config-btn config-btn-secondary" @click="resetConfig">重置</button>
        <button class="config-btn config-btn-primary" @click="saveConfig">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { appConfig, applyBackgroundConfig, applyPageTitle, applyFaviconConfig, type AppConfig } from '@/config/configLoader'

// 面板显示状态
const isVisible = ref(false)

// 本地配置副本
const localConfig = reactive<AppConfig>({
  pageTitle: '',
  pageQuote: '',
  footer: {
    websiteText: '',
    websiteUrl: '',
    authorText: '',
    authorUrl: ''
  },
  background: {
    bingWallpaper: false,
    image: ''
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
      footer: '#000000'
    }
  }
})

// 打开面板
const openPanel = () => {
  // 复制当前配置到本地配置
  Object.assign(localConfig, JSON.parse(JSON.stringify(appConfig)))
  isVisible.value = true
}

// 关闭面板
const closePanel = () => {
  isVisible.value = false
}

// 重置配置
const resetConfig = () => {
  if (confirm('确定要重置所有配置吗？')) {
    Object.assign(localConfig, {
      pageTitle: "Website Panel",
      pageQuote: "人生寂寞，知己难求。",
      footer: {
        websiteText: "WEBSITE.GW124.TOP",
        websiteUrl: "https://website.gw124.top",
        authorText: "Wen",
        authorUrl: "https://github.com/GWen124"
      },
      background: {
        bingWallpaper: false,
        image: ""
      },
      favicon: {
        icon: ""
      },
      copyright: {
        startDate: "2025-01-01",
        autoRange: true
      }
    })
  }
}

// 保存配置
const saveConfig = () => {
  // 更新全局配置
  Object.assign(appConfig, JSON.parse(JSON.stringify(localConfig)))
  
  // 应用配置
  applyPageTitle(appConfig.pageTitle)
  applyBackgroundConfig(appConfig.background)
  applyFaviconConfig(appConfig.favicon)
  
  // 生成 YAML 配置
  const yamlConfig = generateYamlConfig(appConfig)
  
  // 下载配置文件
  downloadConfigFile(yamlConfig)
  
  closePanel()
}

// 生成 YAML 配置
const generateYamlConfig = (config: AppConfig): string => {
  return `# Website Panel 配置文件
# 修改此文件来自定义网站设置

# 网页标题
pageTitle: "${config.pageTitle}"

# 标签页图标配置
favicon:
  # 图标路径或URL，留空表示使用默认图标
  # 本地图标示例: favicon.ico 或 images/icon.png
  # 网络图标示例: https://example.com/favicon.ico
  icon: "${config.favicon.icon}"

# 页面主标题文字
pageQuote: "${config.pageQuote}"

# Footer 信息配置
footer:
  websiteText: "${config.footer.websiteText}"
  websiteUrl: "${config.footer.websiteUrl}"
  authorText: "Wen"
  authorUrl: "https://github.com/GWen124"

# 版权信息配置
copyright:
  # 版权开始日期，格式：YYYY-MM-DD
  # 示例：2025-01-01 或 2025-12-31
  startDate: "${config.copyright.startDate}"
  # 是否自动计算年份范围
  # true: 根据当前日期自动计算显示格式
  # false: 始终显示开始年份
  autoRange: ${config.copyright.autoRange}

# 背景图片配置
background:
  # Bing 轮播背景开关
  # true: 启用 Bing 每日图片轮播背景（优先级高于自定义背景）
  # false: 使用自定义背景图片
  bingWallpaper: ${config.background.bingWallpaper}
  # 图片或视频路径/URL，留空表示无背景
  # 本地图片示例: bg.jpg 或 images/background.png
  # 网络图片示例: https://example.com/image.jpg
  # 本地视频示例: video.mp4 或 videos/background.mp4
  # 网络视频示例: https://example.com/video.mp4
  # 支持的视频格式: mp4, webm, ogg, avi, mov, wmv, flv, mkv
  image: "${config.background.image}"`
}

// 下载配置文件
const downloadConfigFile = (content: string) => {
  const blob = new Blob([content], { type: 'text/yaml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'config.yml'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}


// 暴露方法给父组件
defineExpose({
  openPanel
})
</script>

<style scoped>
.config-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.config-panel {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e5e5;
}

.config-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333333;
}

.config-content {
  padding: 24px;
}

.config-section {
  margin-bottom: 24px;
}

.config-section:last-child {
  margin-bottom: 0;
}

.config-subtitle {
  margin: 0 0 16px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 8px;
}

.config-row {
  margin-bottom: 16px;
}

.config-row:last-child {
  margin-bottom: 0;
}

.config-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #555555;
}

.config-input,
.config-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  background: #ffffff;
}

.config-input:focus,
.config-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.config-checkbox {
  margin-right: 8px;
}

.config-hint {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666666;
  line-height: 1.4;
}

.config-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e5e5e5;
  background: #f8f9fa;
  border-radius: 0 0 12px 12px;
}

.config-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.config-btn-primary {
  background: #007bff;
  color: #ffffff;
}

.config-btn-primary:hover {
  background: #0056b3;
}

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
