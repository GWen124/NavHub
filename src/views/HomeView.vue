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
          <div class="search-container">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="请输入搜索内容"
              class="search-input"
            >
            <div class="search-button">
              <component :is="searchIconComponent" />
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
import { useSearchStore } from '@/stores/search'
import { loadConfig, applyBackgroundConfig, applyPageTitle, applyFaviconConfig, applyColorsConfig, appConfig, formatCopyrightYear } from '@/utils/configLoader'
import CategorySection from '@/components/CategorySection.vue'
import { getIconComponent } from '@/utils/icons'

const themeStore = useThemeStore()
const searchStore = useSearchStore()

const searchQuery = ref('')
const timeInterval = ref<number | null>(null)

// 应用配置
const appConfigRef = computed(() => appConfig)

// 版权年份
const copyrightYear = computed(() => {
  return formatCopyrightYear(appConfig.copyright)
})
const filteredCategories = ref<Category[]>([])
const currentTime = ref('')
const currentDate = ref('')

// 搜索图标组件
const searchIconComponent = computed(() => {
  return getIconComponent('search')
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
  searchStore.search(searchQuery.value, config)
  filteredCategories.value = searchStore.filteredCategories
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
})

// 清理定时器
onUnmounted(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
  }
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
  gap: 30px;
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
  color: var(--text-color, #000000);
  margin: 0;
  text-align: center;
  text-shadow: none;
}

.time-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  border-left: 2px solid var(--text-color, #000000);
}

.current-time {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-color, #000000);
  margin: 0;
  text-shadow: none;
}

.current-date {
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-color, #000000);
  margin: 0;
  opacity: 0.8;
  text-shadow: none;
}

.search-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.search-container {
  position: relative;
  width: 800px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 8px 24px;
  backdrop-filter: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.5);
}


.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  outline: none;
  color: #ffffff;
  font-weight: 400;
}

.search-input::placeholder {
  color: #999999;
}

.search-button {
  width: 28px;
  height: 28px;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-button:hover {
  background: transparent;
}

.search-button :deep(svg) {
  color: var(--text-color);
  width: 16px;
  height: 16px;
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
  background: linear-gradient(to right, transparent 0%, var(--text-color, #000000) 20%, var(--text-color, #000000) 80%, transparent 100%);
}

.footer-content {
  max-width: 80vw;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
  color: var(--text-color, #000000);
  font-size: 1rem;
}

.footer-link {
  color: var(--text-color, #000000);
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
    gap: 20px;
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
    max-width: 700px;
    padding: 8px 20px;
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
    max-width: 600px;
    padding: 8px 18px;
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