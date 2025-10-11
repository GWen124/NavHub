<template>
  <div class="config-panel">
    <div class="config-header">
      <h3>自动图标配置</h3>
      <p>当前模式: {{ getModeDescription }}</p>
    </div>

    <div class="config-controls">
      <div class="control-group">
        <label>自动图标模式:</label>
        <select v-model="selectedMode" @change="updateMode">
          <option :value="1">模式1: 强制所有网站自动获取</option>
          <option :value="2">模式2: 网站图标为空时自动获取</option>
          <option :value="3">模式3: 非链接或本地图标自动获取</option>
        </select>
      </div>

      <div class="control-group">
        <label>图标大小:</label>
        <select v-model="selectedSize" @change="updateSize">
          <option :value="16">16px</option>
          <option :value="32">32px</option>
          <option :value="64">64px</option>
          <option :value="128">128px</option>
          <option :value="256">256px</option>
        </select>
      </div>

      <div class="control-group">
        <label>服务优先级:</label>
        <div class="services-list">
          <div v-for="(service, index) in availableServices" :key="service" class="service-item">
            <span class="service-name">{{ getServiceName(service) }}</span>
            <span class="service-desc">{{ getServiceDescription(service) }}</span>
          </div>
        </div>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="enableCache" @change="updateCache">
          启用图标缓存
        </label>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="showInitials" @change="updateFallback">
          显示备用图标（首字母）
        </label>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="enableLogging" @change="updateDebug">
          启用调试日志
        </label>
      </div>
    </div>

    <div class="config-actions">
      <button @click="refreshAllIcons" class="action-btn" :disabled="isRefreshing">
        {{ isRefreshing ? '刷新中...' : '刷新所有图标' }}
      </button>
      <button @click="resetConfig" class="action-btn secondary">
        重置配置
      </button>
    </div>

    <div class="config-stats">
      <h4>统计信息</h4>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">总网站数:</span>
          <span class="stat-value">{{ totalSites }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">自动图标:</span>
          <span class="stat-value">{{ autoIconSites }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">自定义图标:</span>
          <span class="stat-value">{{ customIconSites }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">第三方图标:</span>
          <span class="stat-value">{{ thirdPartyIcons }}</span>
        </div>
      </div>
    </div>

    <div class="config-preview">
      <h4>预览效果</h4>
      <div class="preview-sites">
        <div v-for="site in previewSites" :key="site.name" class="preview-site">
          <div class="preview-icon">
            <AutoIcon
              v-if="shouldUseAutoIcon(site)"
              :url="site.url"
              :name="site.name"
              :fallback-icon="site.icon"
              :size="32"
            />
            <img
              v-else
              :src="site.icon"
              :alt="site.name"
              class="preview-image"
            />
          </div>
          <div class="preview-info">
            <div class="preview-name">{{ site.name }}</div>
            <div class="preview-mode">
              {{ getSiteModeDescription(site) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { config } from '@/config'
import AutoIcon from './AutoIcon.vue'
import { 
  getAutoIconConfig, 
  updateAutoIconConfig, 
  shouldUseAutoIcon as shouldUseAutoIconFromConfig,
  getModeDescription,
  loadAutoIconConfig
} from '@/config/autoIconConfigLoader'

// 响应式配置
const selectedMode = ref<1 | 2 | 3 | 4>(2)
const selectedSize = ref<number>(64)
const enableCache = ref<boolean>(true)
const showInitials = ref<boolean>(true)
const enableLogging = ref<boolean>(false)
const isRefreshing = ref<boolean>(false)

// 可用服务列表
const availableServices = ref(['google', 'duckduckgo', 'iconfont', 'favicon', 'direct'])

// 预览网站列表
const previewSites = ref([
  {
    name: "Google",
    url: "https://www.google.com",
    icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Google/Google.png"
  },
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "xicon:Github"
  },
  {
    name: "YouTube",
    url: "https://youtube.com",
    icon: ""
  },
  {
    name: "Bilibili",
    url: "https://bilibili.com",
    icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Streaming Service Platform/Bilibili.png"
  }
])

// 获取服务名称
const getServiceName = (service: string): string => {
  const serviceNames: Record<string, string> = {
    'google': 'Google Favicon',
    'duckduckgo': 'DuckDuckGo',
    'iconfont': 'iconfont (阿里巴巴)',
    'favicon': 'Favicon.io',
    'direct': '直接获取'
  }
  return serviceNames[service] || service
}

// 获取服务描述
const getServiceDescription = (service: string): string => {
  const serviceDescriptions: Record<string, string> = {
    'google': 'Google 提供的 favicon 服务，质量高，速度快，支持高清',
    'duckduckgo': 'DuckDuckGo 图标服务，隐私友好，支持高清',
    'favicon': 'Favicon.io 专业图标服务，稳定可靠，支持高清',
    'clearbit': 'Clearbit Logo API，企业级图标服务，支持高清',
    'simple': 'Simple Icons 开源图标库，覆盖广泛，矢量图标',
    'iconify': 'Iconify 图标服务，支持多种图标集，矢量图标',
    'iconfont': '阿里巴巴 iconfont 图标库，中文网站图标丰富',
    'direct': '直接从网站获取 favicon.ico'
  }
  return serviceDescriptions[service] || ''
}

// 计算统计信息
const totalSites = computed(() => {
  return config.reduce((total, category) => total + category.sites.length, 0)
})

const autoIconSites = computed(() => {
  return config.reduce((total, category) => {
    return total + category.sites.filter(site => shouldUseAutoIcon(site)).length
  }, 0)
})

const customIconSites = computed(() => {
  return config.reduce((total, category) => {
    return total + category.sites.filter(site => {
      const icon = site.icon
      return icon && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('./'))
    }).length
  }, 0)
})

const thirdPartyIcons = computed(() => {
  return config.reduce((total, category) => {
    return total + category.sites.filter(site => {
      const icon = site.icon
      return icon && (icon.startsWith('xicon:') || icon.startsWith('fa') || icon.startsWith('icon:'))
    }).length
  }, 0)
})

// 更新模式
const updateMode = () => {
  updateAutoIconConfig({ mode: selectedMode.value })
}

// 更新大小
const updateSize = () => {
  updateAutoIconConfig({ 
    icon: { 
      ...getAutoIconConfig().icon, 
      size: selectedSize.value 
    } 
  })
}

// 更新缓存
const updateCache = () => {
  updateAutoIconConfig({ 
    icon: { 
      ...getAutoIconConfig().icon, 
      cache: enableCache.value 
    } 
  })
}

// 更新备用图标
const updateFallback = () => {
  updateAutoIconConfig({ 
    fallback: { 
      ...getAutoIconConfig().fallback, 
      showInitials: showInitials.value 
    } 
  })
}

// 更新调试设置
const updateDebug = () => {
  updateAutoIconConfig({ 
    debug: { 
      ...getAutoIconConfig().debug, 
      enableLogging: enableLogging.value 
    } 
  })
}

// 刷新所有图标
const refreshAllIcons = async () => {
  isRefreshing.value = true
  try {
    // 这里可以实现刷新逻辑
    await new Promise(resolve => setTimeout(resolve, 2000))
  } finally {
    isRefreshing.value = false
  }
}

// 重置配置
const resetConfig = () => {
  selectedMode.value = 2
  selectedSize.value = 64
  enableCache.value = true
  showInitials.value = true
  enableLogging.value = false
  
  updateAutoIconConfig({
    mode: 2,
    icon: { 
      size: 64, 
      cache: true, 
      cacheExpiry: 24,
      shapePriority: ['square', 'round', 'any'],
      qualityPriority: ['hd', 'normal', 'any']
    },
    fallback: { showInitials: true, backgroundColor: '', textColor: '#ffffff' },
    debug: { enableLogging: false, showLoadingState: true }
  })
}

// 判断网站是否应该使用自动图标
const shouldUseAutoIcon = (site: any): boolean => {
  return shouldUseAutoIconFromConfig(site)
}

// 获取网站模式描述
const getSiteModeDescription = (site: any): string => {
  if (shouldUseAutoIcon(site)) {
    return '自动图标'
  } else if (site.icon.startsWith('http')) {
    return '自定义图标'
  } else if (site.icon.startsWith('xicon:') || site.icon.startsWith('fa')) {
    return '第三方图标'
  } else {
    return '默认图标'
  }
}

// 加载配置
onMounted(async () => {
  await loadAutoIconConfig()
  const currentConfig = getAutoIconConfig()
  
  selectedMode.value = currentConfig.mode
  selectedSize.value = currentConfig.icon.size
  enableCache.value = currentConfig.icon.cache
  showInitials.value = currentConfig.fallback.showInitials
  enableLogging.value = currentConfig.debug.enableLogging
})
</script>

<style scoped>
.config-panel {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.config-header {
  text-align: center;
  margin-bottom: 30px;
}

.config-header h3 {
  margin: 0 0 10px 0;
  color: #2d3748;
  font-size: 1.5rem;
}

.config-header p {
  margin: 0;
  color: #718096;
  font-size: 1rem;
}

.config-controls {
  display: grid;
  gap: 20px;
  margin-bottom: 30px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-weight: 600;
  color: #2d3748;
  font-size: 14px;
}

.control-group select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  font-size: 14px;
}

.control-group input[type="checkbox"] {
  margin-right: 8px;
}

.services-list {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #e2e8f0;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

.service-item:last-child {
  border-bottom: none;
}

.service-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 14px;
}

.service-desc {
  color: #718096;
  font-size: 12px;
  text-align: right;
  max-width: 60%;
}

.config-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #4299e1;
  color: white;
}

.action-btn:hover:not(:disabled) {
  background: #3182ce;
  transform: translateY(-1px);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.secondary {
  background: #edf2f7;
  color: #4a5568;
}

.action-btn.secondary:hover {
  background: #e2e8f0;
}

.config-stats {
  margin-bottom: 30px;
}

.config-stats h4 {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.stat-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #718096;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
}

.config-preview {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.config-preview h4 {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 1.1rem;
}

.preview-sites {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.preview-site {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.preview-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.preview-info {
  flex: 1;
  min-width: 0;
}

.preview-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 14px;
  margin-bottom: 2px;
}

.preview-mode {
  font-size: 12px;
  color: #718096;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .config-panel {
    padding: 15px;
  }
  
  .config-actions {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .preview-sites {
    grid-template-columns: 1fr;
  }
}
</style>
