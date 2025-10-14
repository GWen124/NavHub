<template>
  <div class="auto-icon">
    <img
      v-if="iconUrl"
      :src="iconUrl"
      :alt="`${name} icon`"
      class="icon-image"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <div
      v-else
      class="icon-placeholder"
      :style="{ backgroundColor: fallbackColor }"
    >
      {{ fallbackText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getSmartFavicon, getEnhancedSmartFavicon, getFallbackIcon, checkIconAvailability } from '../utils/iconUtils'

interface Props {
  url: string
  name: string
  fallbackIcon?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  fallbackIcon: '',
  size: 64
})

const iconUrl = ref<string>('')
const isLoading = ref<boolean>(true)
const hasError = ref<boolean>(false)

const fallbackColor = computed(() => {
  // 根据网站名称生成一致的颜色
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ]
  const index = props.name.charCodeAt(0) % colors.length
  return colors[index]
})

const fallbackText = computed(() => {
  return props.name.charAt(0).toUpperCase()
})

const loadIcon = async () => {
  try {
    isLoading.value = true
    hasError.value = false
    
    // 如果有自定义图标，先检查是否可用
    if (props.fallbackIcon) {
      const isAvailable = await checkIconAvailability(props.fallbackIcon)
      if (isAvailable) {
        iconUrl.value = props.fallbackIcon
        return
      }
    }
    
    // 使用增强的智能图标获取（支持智能回退）
    const smartIcon = await getEnhancedSmartFavicon(props.url, props.fallbackIcon || '', props.name)
    if (smartIcon) {
      iconUrl.value = smartIcon
    } else {
      // 使用备用图标
      iconUrl.value = getFallbackIcon(props.url)
    }
  } catch (error) {
    hasError.value = true
    iconUrl.value = getFallbackIcon(props.url)
  } finally {
    isLoading.value = false
  }
}

const handleImageError = () => {
  hasError.value = true
  
  // 如果当前不是备用图标，尝试使用备用图标
  if (!iconUrl.value.includes('google.com/s2/favicons') && !iconUrl.value.startsWith('data:')) {
    iconUrl.value = getFallbackIcon(props.url)
  }
}

const handleImageLoad = () => {
  hasError.value = false
  isLoading.value = false
}

onMounted(() => {
  loadIcon()
})
</script>

<style scoped>
.auto-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.icon-image {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.icon-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

/* 加载状态 */
.auto-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: loading 1.5s infinite;
  border-radius: 8px;
  opacity: v-bind(isLoading ? 1 : 0);
  transition: opacity 0.3s ease;
}

@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
