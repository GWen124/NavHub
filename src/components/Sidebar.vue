<template>
  <div>
    <!-- 桌面端触发区域 -->
    <div 
      v-if="!isMobile && !isTablet"
      class="sidebar-trigger-area"
      @mouseenter="handleMouseEnter"
    ></div>

    <!-- 平板端触发区域 -->
    <div 
      v-if="isTablet"
      class="sidebar-trigger-area"
      @click="toggleSidebar"
    ></div>

    <!-- 移动端展开按钮 -->
    <button
      v-if="isMobile"
      class="mobile-menu-button"
      @click="toggleSidebar"
      :aria-label="isOpen ? '关闭菜单' : '打开菜单'"
    >
      ☰
    </button>

    <!-- 移动端遮罩层 -->
    <Transition name="slide">
      <div
        v-if="isMobile && isOpen"
        class="sidebar-overlay"
        @click="closeSidebar"
      ></div>
    </Transition>

    <!-- 侧边栏主体 -->
    <nav
      v-show="!isMobile || isOpen || (isTablet && isDragging)"
      class="sidebar"
      :class="{ 'is-expanded': isExpanded || (isMobile && isOpen) || (isTablet && isOpen) }"
      :style="{ transform: isTablet && isDragging ? `translateX(${sidebarTransform}px)` : '' }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleSidebarClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <ul class="category-list">
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="category-item"
              @click.stop="scrollToCategory(category.name)"
            >
              <span class="category-name">{{ category.name }}</span>
              <span class="site-count">{{ category.sites.length }}</span>
            </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Category } from '@/config/index'

interface Props {
  categories: Category[]
}

const props = defineProps<Props>()

const isOpen = ref(false)
const isMobile = ref(false)
const isExpanded = ref(false)

// 触摸滑动相关变量
const touchStartX = ref(0)
const touchStartY = ref(0)
const isDragging = ref(false)
const sidebarTransform = ref(0)

// 检测设备类型
const checkDevice = () => {
  isMobile.value = window.innerWidth < 768
}

// 检测是否为平板
const isTablet = computed(() => {
  return window.innerWidth >= 768 && window.innerWidth < 1024
})

// 桌面端鼠标进入侧边栏
const handleMouseEnter = () => {
  if (!isMobile.value && !isTablet.value) {
    isExpanded.value = true
  }
}

// 桌面端鼠标离开侧边栏
const handleMouseLeave = () => {
  if (!isMobile.value && !isTablet.value) {
    isExpanded.value = false
  } else if (isMobile.value) {
    // 移动端离开时关闭
    isOpen.value = false
  }
}

// 处理触摸开始
const handleTouchStart = (event: TouchEvent) => {
  if (isTablet.value && event.touches && event.touches[0]) {
    touchStartX.value = event.touches[0].clientX
    touchStartY.value = event.touches[0].clientY
    isDragging.value = true
    sidebarTransform.value = 0
  }
}

// 处理触摸移动
const handleTouchMove = (event: TouchEvent) => {
  if (isTablet.value && isDragging.value && event.touches && event.touches[0]) {
    event.preventDefault() // 防止页面滚动
    const touchCurrentX = event.touches[0].clientX
    const deltaX = touchCurrentX - touchStartX.value
    
    if (isOpen.value) {
      // 侧边栏已展开，向左滑动时实时移动
      if (deltaX < 0) {
        sidebarTransform.value = Math.max(deltaX, -300) // 限制最大移动距离
      }
    } else {
      // 侧边栏未展开，向右滑动时实时移动侧边栏
      if (deltaX > 0 && touchStartX.value < 100) {
        // 直接使用deltaX作为移动距离，让侧边栏跟随手指
        sidebarTransform.value = Math.min(deltaX, 300) // 限制最大移动距离
      }
    }
  }
}

// 处理触摸结束
const handleTouchEnd = (event: TouchEvent) => {
  if (isTablet.value && isDragging.value && event.changedTouches && event.changedTouches[0]) {
    const touchEndX = event.changedTouches[0].clientX
    const touchEndY = event.changedTouches[0].clientY
    const deltaX = touchEndX - touchStartX.value
    const deltaY = Math.abs(touchStartY.value - touchEndY)
    
    isDragging.value = false
    
    if (isOpen.value) {
      // 如果侧边栏已展开，向左滑动超过80px且垂直滑动小于100px，则收回侧边栏
      if (touchStartX.value - touchEndX > 80 && deltaY < 100) {
        // 直接关闭侧边栏，让CSS过渡处理动画
        isOpen.value = false
        sidebarTransform.value = 0
      } else {
        // 否则回弹到原位置
        sidebarTransform.value = 0
      }
    } else {
      // 如果侧边栏未展开，向右滑动超过100px且垂直滑动小于100px，则展开侧边栏
      if (deltaX > 100 && deltaY < 100 && touchStartX.value < 100) {
        // 直接展开侧边栏，让CSS过渡处理动画
        isOpen.value = true
        sidebarTransform.value = 0
      } else {
        // 否则回弹到原位置
        sidebarTransform.value = 0
      }
    }
  }
}


// 处理侧边栏点击事件
const handleSidebarClick = (event: Event) => {
  // 如果是平板设备且点击的是侧边栏本身（不是分组项），则收回侧边栏
  if (isTablet.value && event.target === event.currentTarget) {
    isExpanded.value = false
  }
}

// 切换侧边栏
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

// 关闭侧边栏
const closeSidebar = () => {
  isOpen.value = false
}

// 滚动到指定分组
const scrollToCategory = (categoryName: string) => {
  // 查找对应的分组元素
  const categoryElements = document.querySelectorAll('.category-title')
  const targetElement = Array.from(categoryElements).find(
    el => el.textContent?.trim() === categoryName
  )

  if (targetElement) {
    // 平滑滚动到目标元素
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    
    // 滚动后关闭侧边栏
    setTimeout(() => {
      closeSidebar()
    }, 300)
  }
}

// 防抖函数
const debounce = (func: Function, wait: number) => {
  let timeout: number | null = null
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// 监听窗口大小变化
const handleResize = debounce(() => {
  checkDevice()
  if (!isMobile.value) {
    isOpen.value = false
    isExpanded.value = false
  }
}, 200)

onMounted(() => {
  checkDevice()
  window.addEventListener('resize', handleResize)
  
  // 为pad端添加全局触摸事件
  document.addEventListener('touchstart', handleTouchStart, { passive: false })
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('touchend', handleTouchEnd, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  
  // 清理pad端的全局触摸事件
  document.removeEventListener('touchstart', handleTouchStart)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style scoped>
/* 桌面端触碰区域 */
.sidebar-trigger-area {
  position: fixed;
  left: 0;
  top: 0;
  width: 30px;
  height: 100vh;
  z-index: 998;
  cursor: pointer;
}

/* 移动端菜单按钮 */
.mobile-menu-button {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 999;
  background: transparent;
  border: none;
  padding: 6px 6px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--header-color, #000000);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.mobile-menu-button:hover {
  transform: scale(1.02);
}

.mobile-menu-button:active {
  transform: scale(0.96);
}

/* 遮罩层 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(4px);
}

/* 侧边栏主体 */
.sidebar {
  position: fixed;
  top: 0;
  left: -60px;
  width: 60px;
  height: 100vh;
  background: transparent;
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: left 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
               width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
               background-color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
               transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  /* 右侧圆角 */
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  /* 完全隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 桌面端侧边栏展开状态 */
.sidebar.is-expanded {
  left: 0;
  width: var(--sidebar-width, 280px);
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(0.8px) saturate(100%);
  -webkit-backdrop-filter: blur(0.8px) saturate(100%);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

/* 隐藏所有浏览器的滚动条 */
.sidebar::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.category-list::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* 分组列表 */
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* 优化滚动性能 */
  will-change: scroll-position;
  -webkit-overflow-scrolling: touch;
  /* 减少重绘 */
  contain: layout style paint;
}

.category-item {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin: 8px 0;
  padding: 8px 15px;
  border-radius: 6px;
  /* 扩大点击区域 */
  min-height: 40px;
}

/* 滑条样式 */
.category-item::before {
  content: '';
  width: 16px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              box-shadow 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: none;
  flex-shrink: 0;
  margin-right: 10px;
}

/* Hover 时滑条变宽 */
.sidebar.is-expanded .category-item:hover::before {
  width: 32px;
}

.category-name {
  font-family: var(--sidebar-font-family, system-ui, -apple-system, BlinkMacSystemFont, sans-serif);
  font-size: var(--sidebar-font-size, 13px);
  color: white;
  font-weight: var(--sidebar-font-weight, 400);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left center;
}

/* 展开时显示文字 */
.sidebar.is-expanded .category-name {
  opacity: 1;
}

/* Hover 时文字变大 - 使用 transform 避免抖动 */
.sidebar.is-expanded .category-item:hover .category-name {
  transform: scale(1.1);
}

.site-count {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.12);
  padding: 2px 8px;
  border-radius: 10px;
  min-width: 24px;
  text-align: center;
  font-weight: 500;
  margin-left: 8px;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

/* 展开时显示数量 */
.sidebar.is-expanded .site-count {
  opacity: 1;
}

/* 遮罩层淡入淡出动画 */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .sidebar {
    left: -100%;
    width: calc(var(--sidebar-width, 320px) * 0.94);
  }
  
  .sidebar.is-expanded {
    left: 0;
    width: calc(var(--sidebar-width, 320px) * 0.94);
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: calc(var(--sidebar-width, 320px) * 0.88);
  }
  
  .sidebar.is-expanded {
    width: calc(var(--sidebar-width, 320px) * 0.88);
  }
  
  .category-item {
    margin: 6px 0;
    padding: 6px 12px;
    min-height: 36px;
  }
  
  .category-name {
    font-family: var(--sidebar-font-family, system-ui, -apple-system, BlinkMacSystemFont, sans-serif);
    font-size: calc(var(--sidebar-font-size, 13px) * 0.92);
    font-weight: var(--sidebar-font-weight, 400);
  }
  
  .sidebar.is-expanded .category-item:hover .category-name {
    transform: scale(1.1);
  }
  
  .mobile-menu-button {
    top: 12px;
    left: 12px;
    padding: 5px 5px;
    font-size: 28px;
  }
}
</style>

