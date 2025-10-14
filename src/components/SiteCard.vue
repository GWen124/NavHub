<template>
  <a
    :href="site.url"
    target="_blank"
    rel="noopener noreferrer"
    class="site-card"
  >
    <div class="site-icon">
      <!-- 自动图标组件 -->
      <AutoIcon
        v-if="shouldUseAuto"
        :url="site.url"
        :name="site.name"
        :fallback-icon="site.icon"
        :size="48"
      />
      <!-- 原有的图标显示逻辑 -->
      <template v-else>
        <img
          v-if="isExternalIcon"
          :src="site.icon"
          :alt="site.name"
        >
        <component
          v-else-if="isXiconIcon && xiconComponent"
          :is="xiconComponent"
          :size="18"
        />
        <i
          v-else-if="isFontAwesomeIcon"
          :class="site.icon"
        ></i>
        <div
          v-else-if="isEmojiIcon"
          class="emoji-icon"
        >
          {{ site.icon }}
        </div>
        <div
          v-else
          class="text-icon"
        >
          {{ site.name.charAt(0).toUpperCase() }}
        </div>
      </template>
    </div>
    <div class="site-name">
      {{ site.name }}
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { Site } from '@/config/index'
import { isXicon, getIconName, getIconComponent } from '@/utils/icons'
import AutoIcon from './AutoIcon.vue'
import { shouldUseAutoIcon, loadAutoIconConfig } from '@/config/autoIconConfigLoader'

interface Props {
  site: Site
  searchQuery: string
  useAutoIcon?: boolean // 是否使用自动图标（手动覆盖）
}

const props = withDefaults(defineProps<Props>(), {
  useAutoIcon: undefined // undefined 表示使用配置决定
})

// 是否应该使用自动图标
const shouldUseAuto = computed(() => {
  // 如果手动指定了 useAutoIcon，则使用手动设置
  if (props.useAutoIcon !== undefined) {
    return props.useAutoIcon
  }
  
  // 否则使用配置决定
  return shouldUseAutoIcon(props.site)
})

// 加载配置
onMounted(async () => {
  await loadAutoIconConfig()
})

// 判断是否为外链图标
const isExternalIcon = computed(() => {
  return props.site.icon.startsWith('http')
})

// 判断是否为 Xicon 图标
const isXiconIcon = computed(() => {
  return isXicon(props.site.icon)
})

// 判断是否为 Font Awesome 图标
const isFontAwesomeIcon = computed(() => {
  return props.site.icon.startsWith('fa') || props.site.icon.startsWith('fas') || props.site.icon.startsWith('fab') || props.site.icon.startsWith('far')
})

// 判断是否为 Emoji 图标
const isEmojiIcon = computed(() => {
  // 简单的 emoji 检测：检查是否包含 emoji 字符
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u
  return emojiRegex.test(props.site.icon) && props.site.icon.length <= 4 && !props.site.icon.startsWith('http')
})

// 获取 Xicon 组件
const xiconComponent = computed(() => {
  if (!isXiconIcon.value) return null
  const iconName = getIconName(props.site.icon)
  return getIconComponent(iconName)
})
</script>

<style scoped>
.site-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  text-decoration: none;
  color: var(--card-title-color, #000000);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  min-height: 46px;
  height: auto;
  width: 100%;
  justify-content: flex-start;
  gap: 8px;
  backdrop-filter: blur(10px);
}

.site-card:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.site-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #000000;
  background: transparent;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.site-card:hover .site-icon {
  background: transparent;
  color: #000000;
  transform: scale(1.05);
}

.site-icon i {
  font-weight: 900;
  font-style: normal;
}

.site-icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
}

/* 确保 AutoIcon 组件内的图片也使用相同尺寸 */
.site-icon :deep(.icon-image) {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
}

.site-icon :deep(.icon-placeholder) {
  width: 48px;
  height: 48px;
  border-radius: 8px;
}

.site-icon :deep(svg) {
  width: 40px;
  height: 40px;
  color: inherit;
}

.emoji-icon {
  font-size: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-icon {
  font-size: 32px;
  font-weight: 600;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 0;
  width: 56px;
  height: 56px;
}

.site-name {
  font-family: var(--site-font-family, inherit);
  font-size: var(--site-font-size, 0.9rem);
  font-weight: var(--site-font-weight, 700);
  color: var(--card-title-color, #000000);
  text-align: left;
  line-height: 1.3;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  overflow-wrap: break-word;
  min-width: 0;
}


/* 响应式设计 */
@media (max-width: 1024px) {
  .site-card {
    padding: 8px 16px;
    min-height: 56px;
    height: 100%;
    gap: 12px;
  }
  
  .site-icon {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
  
  .site-icon img {
    width: 40px;
    height: 40px;
  }
  
  .site-icon :deep(.icon-image) {
    width: 40px;
    height: 40px;
  }
  
  .site-icon :deep(.icon-placeholder) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .site-icon :deep(svg) {
    width: 32px;
    height: 32px;
  }
  
  .emoji-icon {
    font-size: 32px;
  }
  
  .text-icon {
    font-size: 22px;
    width: 48px;
    height: 48px;
    color: #000000;
  }
  
  .site-name {
    font-size: 0.85rem;
    line-height: 1.3;
  }
}

@media (max-width: 768px) {
  .site-card {
    padding: 6px 12px;
    min-height: 48px;
    height: 100%;
    gap: 10px;
  }
  
  .site-icon {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
  
  .site-icon img {
    width: 36px;
    height: 36px;
  }
  
  .site-icon :deep(.icon-image) {
    width: 36px;
    height: 36px;
  }
  
  .site-icon :deep(.icon-placeholder) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
  
  .site-icon :deep(svg) {
    width: 28px;
    height: 28px;
  }
  
  .emoji-icon {
    font-size: 28px;
  }
  
  .text-icon {
    font-size: 20px;
    width: 44px;
    height: 44px;
    color: #000000;
  }
  
  .site-name {
    font-size: 0.8rem;
    line-height: 1.25;
  }
}

@media (max-width: 480px) {
  .site-card {
    padding: 5px 10px;
    min-height: 44px;
    height: 100%;
    gap: 8px;
  }
  
  .site-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .site-icon img {
    width: 32px;
    height: 32px;
  }
  
  .site-icon :deep(.icon-image) {
    width: 32px;
    height: 32px;
  }
  
  .site-icon :deep(.icon-placeholder) {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
  
  .site-icon :deep(svg) {
    width: 24px;
    height: 24px;
  }
  
  .emoji-icon {
    font-size: 24px;
  }
  
  .text-icon {
    font-size: 18px;
    width: 40px;
    height: 40px;
  }
  
  .site-name {
    font-size: 0.75rem;
    line-height: 1.2;
  }
}
</style>
