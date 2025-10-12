<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="quote-section">
          <h1 class="main-quote">{{ appConfigRef.pageQuote }}</h1>
          <div class="time-section">
            <div class="current-time">{{ currentTime }}</div>
            <div class="current-date">{{ currentDate }}</div>
          </div>
        </div>
        <div class="search-section">
          <div class="search-section-container">
            <div class="search-container">
              <!-- 搜索引擎选择器在搜索框左侧 -->
              <div class="search-engine-selector-left">
                <div class="current-engine" @click.stop="toggleDropdown">
                  <component :is="currentSearchEngine.icon" class="engine-icon" />
                </div>
              </div>
              
              <!-- 搜索框主体，包含输入框和内部展开的下拉菜单 -->
              <div class="search-main-area">
                <input
                  v-model="searchQuery"
                  @input="handleSearch"
                  @keydown.enter="handleSearchSubmit"
                  type="text"
                  :placeholder="showDropdown ? '' : currentSearchEngine.placeholder"
                  class="search-input"
                  :class="{ 'hide-text': showDropdown }"
                >
                
                <!-- 在搜索框内部从左到右展开的下拉菜单 -->
                <div 
                  v-if="showDropdown" 
                  class="internal-dropdown"
                  :class="{ 'dropdown-enter': showDropdown }"
                >
                  <div class="engines-grid">
                    <div
                      v-for="(engine, index) in searchEngines.filter(e => e.id !== selectedSearchEngine)"
                      :key="engine.id"
                      class="engine-option"
                      :style="{ animationDelay: `${index * 0.05}s` }"
                      @click="selectEngine(engine)"
                      @mouseenter="handleEngineHover(engine)"
                      @mouseleave="handleEngineLeave"
                    >
                      <component :is="engine.icon" class="engine-icon" />
                    </div>
                  </div>
                  
                  <!-- 悬浮提示 -->
                  <div v-if="hoveredEngine" class="engine-tooltip">
                    {{ hoveredEngine }}
                  </div>
                </div>
              </div>
              
              <button 
                @click="handleSearchSubmit"
                class="search-button"
                type="button"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="categories-container">
        <CategorySection
          v-for="category in filteredCategories"
          :key="category.name"
          :category="category"
          :search-query="searchQuery"
        />
      </div>
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        Copyright © {{ copyrightYear }} 
        <a :href="appConfigRef.footer.websiteUrl" target="_blank" class="footer-link">{{ appConfigRef.footer.websiteText }}</a> 
        • Powered by 
        <a :href="appConfigRef.footer.authorUrl" target="_blank" class="footer-link">{{ appConfigRef.footer.authorText }}</a>
      </div>
    </footer>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { config, type Category } from '@/config'
import { useThemeStore } from '@/stores/theme'
import { loadConfig, applyBackgroundConfig, applyPageTitle, applyFaviconConfig, applyColorsConfig, appConfig, formatCopyrightYear } from '@/config/generated'
import CategorySection from '@/components/CategorySection.vue'
import { searchEngines, getSearchEngine, performSearch, type SearchEngine } from '@/utils/searchEngines'

const themeStore = useThemeStore()

const searchQuery = ref('')
const selectedSearchEngine = ref('google')
const timeInterval = ref<number | null>(null)
const showDropdown = ref(false)
const hoveredEngine = ref<string | null>(null)

// 应用配置
const appConfigRef = computed(() => appConfig)

// 版权年份
const copyrightYear = computed(() => {
  return formatCopyrightYear(appConfig.copyright)
})
const filteredCategories = ref<Category[]>([])
const currentTime = ref('')
const currentDate = ref('')

// 当前搜索引擎
const currentSearchEngine = computed(() => {
  return getSearchEngine(selectedSearchEngine.value) || searchEngines[0]
})


// 更新时间
const updateTime = () => {
  const now = new Date()
  
  // 使用浏览器本地时区
  currentTime.value = now.toLocaleTimeString('zh-CN', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekday = weekdays[now.getDay()]
  currentDate.value = `${month}-${day} ${weekday}`
}

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    filteredCategories.value = config
    return
  }

  const query = searchQuery.value.toLowerCase()
  
  const filtered = config.map(category => {
    // 检查分组名称是否匹配
    const categoryMatches = category.name.toLowerCase().includes(query)
    
    // 过滤网站
    const filteredSites = category.sites.filter(site =>
      site.name.toLowerCase().includes(query) ||
      site.url.toLowerCase().includes(query)
    )
    
    // 如果分组名称匹配，显示该分组的所有网站
    if (categoryMatches) {
      return {
        ...category,
        sites: category.sites
      }
    }
    
    // 否则只显示匹配的网站
    return {
      ...category,
      sites: filteredSites
    }
  }).filter(category => category.sites.length > 0)

  filteredCategories.value = filtered
}

// 处理搜索提交（搜索引擎搜索）
const handleSearchSubmit = () => {
  if (searchQuery.value.trim()) {
    performSearch(searchQuery.value, selectedSearchEngine.value)
  }
}

// 搜索引擎选择器相关函数
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  // 如果关闭下拉菜单，恢复输入框文字显示
  if (!showDropdown.value) {
    // 延迟恢复，确保动画完成
    setTimeout(() => {
      // 这里可以添加恢复文字显示的逻辑
    }, 100)
  }
}

const selectEngine = (engine: SearchEngine) => {
  selectedSearchEngine.value = engine.id
  showDropdown.value = false
}

const handleEngineHover = (engine: SearchEngine) => {
  hoveredEngine.value = engine.name
}

const handleEngineLeave = () => {
  hoveredEngine.value = null
}


// 点击外部关闭下拉菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.search-engine-selector-left') && !target.closest('.search-main-area')) {
    showDropdown.value = false
  }
}


// 初始化
onMounted(async () => {
  themeStore.initTheme()
  await loadConfig()
  applyPageTitle(appConfig.pageTitle)
  applyFaviconConfig(appConfig.favicon)
  applyColorsConfig(appConfig.colors)
  
  // 延迟应用背景，确保DOM完全加载
  setTimeout(async () => {
    await applyBackgroundConfig(appConfig.background)
  }, 100)
  
  filteredCategories.value = config
  updateTime()
  timeInterval.value = setInterval(updateTime, 1000)
  
  // 添加点击外部关闭下拉菜单的事件监听
  document.addEventListener('click', handleClickOutside)
})

// 清理定时器
onUnmounted(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
  }
  // 清理事件监听器
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.app-header {
  background: transparent;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.quote-section {
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  justify-content: center;
}

.main-quote {
  font-size: 4rem;
  font-weight: 700;
  color: var(--header-color, #000000);
  margin: 0;
  text-align: center;
  text-shadow: none;
}

.time-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  border-left: 2px solid var(--header-color, #000000);
}

.current-time {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--header-color, #000000);
  margin: 0;
  text-shadow: none;
}

.current-date {
  font-size: 1rem;
  font-weight: 400;
  color: var(--header-color, #000000);
  margin: 0;
  opacity: 0.8;
  text-shadow: none;
}

.search-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.search-section-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: visible; /* 确保子元素不被裁剪 */
  z-index: 10; /* 提高层级 */
}


.search-container {
  position: relative;
  width: 700px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  padding: 6px 12px;
  backdrop-filter: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.5);
  gap: 8px;
  z-index: 10; /* 提高层级 */
  overflow: visible; /* 确保子元素不被裁剪 */
}


.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  color: #ffffff;
  font-weight: 400;
}

.search-input::placeholder {
  color: #999999;
}

.search-input.hide-text {
  color: transparent;
  text-shadow: 0 0 0 transparent;
}

.search-input.hide-text::placeholder {
  color: transparent;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: var(--header-color, #000000);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.search-button:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.search-button i {
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-button:hover i {
  transform: scale(1.1);
  filter: brightness(1.2);
}


.search-engine-selector-left {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  flex-shrink: 0;
  z-index: 10;
}

.search-main-area {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.current-engine {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  pointer-events: auto;
  z-index: 10;
}

.current-engine:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.engine-icon {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--header-color, #000000);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.engine-icon :deep(svg) {
  width: 16px;
  height: 16px;
  color: var(--header-color, #000000);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.current-engine:hover .engine-icon {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.current-engine:hover .engine-icon :deep(svg) {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.internal-dropdown {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 1000;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  transform: translateX(-100%);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}


.internal-dropdown.dropdown-enter {
  transform: translateX(0) !important;
  opacity: 1 !important;
}

.engines-grid {
  display: flex;
  gap: 12px;
  align-items: center;
  overflow: hidden;
  padding: 0 16px;
  width: 100%;
}

.engine-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  transform: translateY(10px);
  opacity: 0;
  animation: slideInUp 0.4s ease-out forwards;
  position: relative;
  overflow: hidden;
}

.engine-option:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.engine-option:active {
  transform: translateY(-1px) scale(1.05);
  transition: all 0.1s ease;
}


.engine-option .engine-icon {
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: var(--header-color, #000000);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.engine-option .engine-icon :deep(svg) {
  width: 16px;
  height: 16px;
  color: var(--header-color, #000000);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.engine-option:hover .engine-icon {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.engine-option:hover .engine-icon :deep(svg) {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.engine-tooltip {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1001;
  pointer-events: none;
  animation: fadeIn 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.main-content {
  flex: 1;
  padding: 32px 0;
}

.categories-container {
  max-width: 85vw;
  margin: 0 auto;
  padding: 0 24px;
}

.app-footer {
  background: transparent;
  padding: 24px 0;
  margin-top: auto;
  position: relative;
}

.app-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 1px;
  background: linear-gradient(to right, transparent 0%, var(--footer-color, #000000) 20%, var(--footer-color, #000000) 80%, transparent 100%);
}

.footer-content {
  max-width: 80vw;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
  color: var(--footer-color, #000000);
  font-size: 0.9rem;
}

.footer-link {
  color: var(--footer-color, #000000);
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
  font-weight: 600;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.footer-link:hover::after {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
        .header-content {
          padding: 0 16px;
          gap: 15px;
        }
        
        .search-section-container {
          gap: 10px;
        }
        
  
  .quote-section {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .main-quote {
    font-size: 1.8rem;
  }
  
  .time-section {
    padding-left: 0;
    border-left: none;
    border-top: 2px solid #333333;
    padding-top: 15px;
    align-items: center;
  }
  
  .current-time {
    font-size: 1.4rem;
  }
  
  .search-container {
    width: 100%;
    max-width: 600px;
    padding: 6px 12px;
    gap: 6px;
  }
  
  .categories-container {
    padding: 0 16px;
  }
  
  .footer-content {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .main-quote {
    font-size: 1.5rem;
  }
  
  .current-time {
    font-size: 1.2rem;
  }
  
  .current-date {
    font-size: 0.9rem;
  }
  
  .search-container {
    max-width: 500px;
    padding: 6px 10px;
    gap: 5px;
  }
  
  .main-content {
    padding: 24px 0;
  }
}



/* 滚动条样式 */
:global(::-webkit-scrollbar) {
  width: 6px;
}

:global(::-webkit-scrollbar-track) {
  background: #e0e0e0;
  border-radius: 3px;
}

:global(::-webkit-scrollbar-thumb) {
  background: #b0b0b0;
  border-radius: 3px;
}

:global(::-webkit-scrollbar-thumb:hover) {
  background: #999999;
}

</style>