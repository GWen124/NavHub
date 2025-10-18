// 配置导出和排序处理
import { config as rawConfig, type Category, type Site } from '../config'
import { appConfig } from './generated'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

// 导出类型
export type { Site, Category } from '../config'

/**
 * 判断字符串是否包含中文字符
 * @param str 要检查的字符串
 * @returns 是否包含中文字符
 */
function containsChinese(str: string): boolean {
  return /[\u4e00-\u9fff]/.test(str)
}

/**
 * 对网站进行排序
 * @param sites 原始网站数组
 * @param mode 排序模式
 * @returns 排序后的网站数组
 */
function sortSites(sites: Site[], mode: number): Site[] {
  // 模式3：按配置文件中的网站排序（不使用自动排序）
  if (mode === 3) {
    return sites
  }
  
  // 模式1：自动按首字母排序（中英文混合排序）
  if (mode === 1) {
    return [...sites].sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      return nameA.localeCompare(nameB, 'zh-CN')
    })
  }
  
  // 模式2：中文网站在前，英文网站在后，分别按首字母排序
  if (mode === 2) {
    const chineseSites: Site[] = []
    const englishSites: Site[] = []
    
    // 分离中文和英文网站
    sites.forEach(site => {
      if (containsChinese(site.name)) {
        chineseSites.push(site)
      } else {
        englishSites.push(site)
      }
    })
    
    // 分别排序
    chineseSites.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      return nameA.localeCompare(nameB, 'zh-CN')
    })
    
    englishSites.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      return nameA.localeCompare(nameB, 'zh-CN')
    })
    
    // 中文网站在前，英文网站在后
    return [...chineseSites, ...englishSites]
  }
  
  // 默认返回原始顺序
  return sites
}

/**
 * 对分组进行排序和过滤
 * @param categories 原始分组数组
 * @param isAuthenticated 是否已登录
 * @returns 排序后的分组数组（已过滤隐藏的分组和需要登录的分组）
 */
function sortCategories(categories: Category[], isAuthenticated: boolean = false): Category[] {
  const sorting = appConfig.categorySorting
  const siteSorting = appConfig.siteSorting
  
  // 过滤规则：
  // 1. hidden: true 且 requireAuth: true - 登录后显示，未登录隐藏
  // 2. hidden: true 但没有 requireAuth - 永远隐藏
  // 3. requireAuth: true - 需要登录才显示
  // 4. 无标记 - 公开显示
  const visibleCategories = categories.filter(category => {
    // 如果同时设置了 hidden 和 requireAuth，登录后显示
    if (category.hidden && category.requireAuth) {
      return isAuthenticated
    }
    
    // 如果只设置了 hidden（没有 requireAuth），永远隐藏
    if (category.hidden && !category.requireAuth) {
      return false
    }
    
    // 如果设置了 requireAuth，需要登录才显示
    if (category.requireAuth && !isAuthenticated) {
      return false
    }
    
    return true
  })
  
  // 如果禁用自动排序，直接返回原始配置（已过滤隐藏分组）
  if (!sorting || sorting.autoSort === false) {
    return visibleCategories
  }
  
  const pinnedNames = sorting.pinnedCategories || []
  const bottomNames = sorting.bottomCategories || []
  
  // 分离置顶、末尾和中间分组
  const pinned: Category[] = []
  const middle: Category[] = []
  const bottom: Category[] = []
  
  visibleCategories.forEach(category => {
    if (pinnedNames.includes(category.name)) {
      pinned.push(category)
    } else if (bottomNames.includes(category.name)) {
      bottom.push(category)
    } else {
      middle.push(category)
    }
  })
  
  // 对中间分组按首字母排序（支持中英文）
  middle.sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    return nameA.localeCompare(nameB, 'zh-CN')
  })
  
  // 保持置顶和末尾分组的配置顺序
  const sortPinned = pinnedNames
    .map(name => pinned.find(cat => cat.name === name))
    .filter((cat): cat is Category => cat !== undefined)
  
  const sortBottom = bottomNames
    .map(name => bottom.find(cat => cat.name === name))
    .filter((cat): cat is Category => cat !== undefined)
  
  const sortedCategories = [...sortPinned, ...middle, ...sortBottom]
  
  // 对每个分组内的网站进行排序
  const siteSortMode = siteSorting?.mode || 3
  return sortedCategories.map(category => ({
    ...category,
    sites: sortSites(category.sites, siteSortMode)
  }))
}

// 导出响应式的配置（根据登录状态动态过滤）
export function useConfig() {
  const authStore = useAuthStore()
  
  return computed(() => sortCategories(rawConfig, authStore.isAuthenticated))
}

// 导出静态配置（用于不需要登录功能的场景）
export const config = sortCategories(rawConfig, false)
