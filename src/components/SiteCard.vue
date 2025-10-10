<template>
  <a
    :href="site.url"
    target="_blank"
    rel="noopener noreferrer"
    class="site-card"
  >
    <div class="site-icon">
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
    </div>
    <div class="site-name">
      {{ site.name }}
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Site } from '@/config'
import { isXicon, getIconName, getIconComponent } from '@/utils/icons'

interface Props {
  site: Site
  searchQuery: string
}

const props = defineProps<Props>()

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
  return emojiRegex.test(props.site.icon) && props.site.icon.length <= 4
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
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
  min-height: 40px;
  justify-content: flex-start;
  gap: 10px;
  backdrop-filter: blur(10px);
}

.site-card:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.5);
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
  color: var(--icon-color);
  background: var(--transparent-bg);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.site-card:hover .site-icon {
  background: var(--transparent-bg);
  color: var(--icon-color);
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
  color: var(--icon-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--transparent-bg);
  border-radius: 0;
  width: 56px;
  height: 56px;
}

.site-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-color, #ffffff);
  text-align: left;
  line-height: 1.3;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


/* 响应式设计 */
@media (max-width: 768px) {
  .site-card {
    padding: 2px 10px;
    min-height: 32px;
    gap: 8px;
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
  
  .site-icon :deep(svg) {
    width: 32px;
    height: 32px;
  }
  
  .emoji-icon {
    font-size: 32px;
  }
  
  .text-icon {
    font-size: 24px;
    width: 48px;
    height: 48px;
    color: var(--icon-color);
  }
  
  .site-name {
    font-size: 0.8rem;
  }
}
</style>
