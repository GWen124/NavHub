<template>
  <div class="search-engine-selector">
    <div class="current-engine" @click="toggleDropdown">
      <component :is="currentEngine.icon" class="engine-icon" />
    </div>
    
    
    
    <!-- 遮罩层 -->
    <div 
      v-if="showDropdown" 
      class="dropdown-overlay"
      @click.stop="showDropdown = false"
      style="z-index: 9999998 !important;"
    ></div>
    
    <div 
      v-if="showDropdown" 
      class="dropdown-menu"
      :class="{ 'dropdown-enter': showDropdown }"
      :style="{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width
      }"
    >
      <div class="engines-grid">
        <div
          v-for="(engine, index) in searchEngines"
          :key="engine.id"
          class="engine-option"
          :class="{ active: engine.id === selectedEngine }"
          :style="{ animationDelay: `${index * 0.05}s` }"
          @click="selectEngine(engine)"
        >
          <component :is="engine.icon" class="engine-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { searchEngines, type SearchEngine } from '@/utils/searchEngines'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showDropdown = ref(false)
const dropdownPosition = ref({ top: '0px', left: '0px', width: '700px' })

const selectedEngine = computed(() => props.modelValue)

const currentEngine = computed(() => {
  return searchEngines.find(engine => engine.id === selectedEngine.value) || searchEngines[0]
})

const toggleDropdown = () => {
  if (!showDropdown.value) {
    updateDropdownPosition()
  }
  showDropdown.value = !showDropdown.value
}

// 更新选择框位置
const updateDropdownPosition = () => {
  const searchContainer = document.querySelector('.search-container')
  if (searchContainer) {
    const rect = searchContainer.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    
    // 使用搜索框的精确位置和尺寸
    const left = rect.left
    const top = rect.bottom + 8
    const width = rect.width
    
    // 检查是否有足够空间，如果没有则显示在上方
    const dropdownHeight = 200 // 预估高度
    let finalTop = top
    if (top + dropdownHeight > viewportHeight - 16) {
      finalTop = rect.top - dropdownHeight - 8
    }
    
    // 检查水平位置，确保不超出视窗
    let finalLeft = left
    if (left + width > viewportWidth - 16) {
      finalLeft = viewportWidth - width - 16
    }
    if (finalLeft < 16) {
      finalLeft = 16
    }
    
    
    dropdownPosition.value = {
      top: `${finalTop}px`,
      left: `${finalLeft}px`,
      width: `${width}px`
    }
  }
}

const selectEngine = (engine: SearchEngine) => {
  emit('update:modelValue', engine.id)
  showDropdown.value = false
}


// 点击外部关闭下拉菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.search-engine-selector')) {
    showDropdown.value = false
  }
}


// 添加全局点击事件监听
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.search-engine-selector {
  position: relative;
  display: inline-block;
  z-index: 10; /* 确保选择器在搜索容器之上 */
}

/* 全局样式，确保下拉菜单不被遮挡 */
:global(.dropdown-menu) {
  z-index: 999999 !important;
}

:global(.dropdown-overlay) {
  z-index: 999998 !important;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 999998;
  cursor: pointer;
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
  transition: all 0.2s ease;
  border: none;
  pointer-events: auto;
  z-index: 1000;
}

.current-engine:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.engine-icon {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #ffffff;
}

.engine-icon :deep(svg) {
  width: 16px;
  height: 16px;
  color: #ffffff;
}

.dropdown-arrow {
  font-size: 12px !important;
  transition: transform 0.2s ease;
}

.current-engine:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  z-index: 9999999;
  overflow: hidden;
  max-width: calc(100vw - 32px);
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(20px) scale(0.95);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
}

.dropdown-menu.dropdown-enter {
  transform: translateY(0) scale(1) !important;
  opacity: 1 !important;
}


.dropdown-header {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.engines-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 0;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 8px 0;
}

.engine-option {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 40px;
  max-width: 80px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(10px);
  transform: translateY(10px);
  opacity: 0;
  animation: slideInUp 0.4s ease-out forwards;
  position: relative;
  overflow: hidden;
}

.engine-option:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.engine-option.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.engine-option .engine-icon {
  width: 24px;
  height: 24px;
  font-size: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.engine-option .engine-icon :deep(svg) {
  width: 20px;
  height: 20px;
  color: #ffffff;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}



/* 动画效果 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .dropdown-menu {
    padding: 20px;
  }
  
  .engines-grid {
    gap: 12px;
    justify-content: space-between;
  }
  
  .engine-option {
    height: 56px;
    flex: 1;
    min-width: 48px;
    max-width: 80px;
  }
  
  .engine-option .engine-icon {
    width: 28px;
    height: 28px;
    font-size: 18px;
  }
  
  .engine-option .engine-icon :deep(svg) {
    width: 24px;
    height: 24px;
  }
  
  .engine-name {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .dropdown-menu {
    padding: 14px;
  }
  
  .engines-grid {
    gap: 6px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .engine-option {
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
  }
  
  .engine-option .engine-icon {
    width: 16px;
    height: 16px;
    font-size: 12px;
  }
  
  .engine-option .engine-icon :deep(svg) {
    width: 14px;
    height: 14px;
  }
}

/* iPad Mini 特殊优化 */
@media (max-width: 768px) and (min-width: 481px) {
  .dropdown-menu {
    padding: 16px;
  }
  
  .engines-grid {
    gap: 10px;
    justify-content: space-between;
  }
  
  .engine-option {
    height: 52px;
    flex: 1;
    min-width: 44px;
    max-width: 70px;
  }
}

@media (max-width: 480px) {
  .dropdown-menu {
    padding: 10px;
  }
  
  .engines-grid {
    gap: 4px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .engine-option {
    width: 32px;
    height: 32px;
    flex: 0 0 auto;
  }
  
  .engine-option .engine-icon {
    width: 14px;
    height: 14px;
    font-size: 10px;
  }
  
  .engine-option .engine-icon :deep(svg) {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 390px) {
  .dropdown-menu {
    padding: 8px;
  }
  
  .engines-grid {
    gap: 3px;
    justify-content: center;
  }
  
  .engine-option {
    width: 30px;
    height: 30px;
  }
}


@media (max-width: 480px) {
  .dropdown-menu {
    left: 50% !important;
    transform: translateX(-50%) translateY(-20px) scale(0.9);
    padding: 10px;
  }
  
  .engines-grid {
    gap: 4px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .engine-option {
    width: 32px;
    height: 32px;
    flex: 0 0 auto;
  }
  
  .dropdown-menu.dropdown-enter {
    transform: translateX(-50%) translateY(0) scale(1);
  }
  
  .engines-grid {
    flex-wrap: wrap;
    gap: 4px;
    max-height: 140px;
  }
  
  .engine-option {
    padding: 5px 8px;
  }
  
  .engine-option .engine-icon {
    width: 14px;
    height: 14px;
    font-size: 10px;
  }
  
  .engine-option .engine-icon :deep(svg) {
    width: 10px;
    height: 10px;
  }
  
  .engine-name {
    font-size: 10px;
  }
}
</style>
