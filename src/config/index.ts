// 配置导出和排序处理
import { config as rawConfig, type Category } from '../config'
import { appConfig } from './generated'

// 导出类型
export type { Site, Category } from '../config'

// 外部配置缓存
let externalConfigCache: { data: Category[] | null; timestamp: number } = {
  data: null,
  timestamp: 0
}

// 从外部 URL 加载配置
async function loadExternalConfig(): Promise<Category[] | null> {
  const externalConfig = appConfig.externalConfig
  
  if (!externalConfig || !externalConfig.enabled || !externalConfig.url) {
    return null
  }

  // 检查缓存
  const now = Date.now()
  const cacheMinutes = externalConfig.cacheMinutes || 30
  const cacheMaxAge = cacheMinutes * 60 * 1000
  
  if (externalConfigCache.data && (now - externalConfigCache.timestamp) < cacheMaxAge) {
    console.log('使用缓存的外部配置')
    return externalConfigCache.data
  }

  try {
    console.log('从外部 URL 加载配置:', externalConfig.url)
    const response = await fetch(externalConfig.url)
    
    if (!response.ok) {
      console.error('加载外部配置失败:', response.statusText)
      return null
    }

    const data = await response.json()
    
    // 验证数据格式
    if (!Array.isArray(data)) {
      console.error('外部配置格式错误: 期望数组格式')
      return null
    }

    // 更新缓存
    externalConfigCache = {
      data: data as Category[],
      timestamp: now
    }

    console.log('外部配置加载成功，包含', data.length, '个分组')
    return data as Category[]
  } catch (error) {
    console.error('加载外部配置出错:', error)
    return null
  }
}

// 排序分组的函数
function sortCategories(categories: Category[]): Category[] {
  const sorting = appConfig.categorySorting
  
  // 如果禁用自动排序，直接返回原始配置
  if (!sorting || sorting.autoSort === false) {
    return categories
  }
  
  const pinnedNames = sorting.pinnedCategories || []
  const bottomNames = sorting.bottomCategories || []
  
  // 分离置顶、末尾和中间分组
  const pinned: Category[] = []
  const middle: Category[] = []
  const bottom: Category[] = []
  
  categories.forEach(category => {
    if (pinnedNames.includes(category.name)) {
      pinned.push(category)
    } else if (bottomNames.includes(category.name)) {
      bottom.push(category)
    } else {
      middle.push(category)
    }
  })
  
  // 对中间分组按首字母排序
  middle.sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    return nameA.localeCompare(nameB)
  })
  
  // 保持置顶和末尾分组的原始顺序
  const sortPinned = pinnedNames
    .map(name => pinned.find(cat => cat.name === name))
    .filter((cat): cat is Category => cat !== undefined)
  
  const sortBottom = bottomNames
    .map(name => bottom.find(cat => cat.name === name))
    .filter((cat): cat is Category => cat !== undefined)
  
  return [...sortPinned, ...middle, ...sortBottom]
}

// 异步加载并导出配置
let loadedConfig: Category[] | null = null

// 初始化配置
async function initConfig(): Promise<Category[]> {
  if (loadedConfig) {
    return loadedConfig
  }

  // 尝试加载外部配置
  const external = await loadExternalConfig()
  
  if (external && external.length > 0) {
    loadedConfig = sortCategories(external)
    console.log('使用外部配置')
  } else {
    loadedConfig = sortCategories(rawConfig)
    console.log('使用本地配置')
  }

  return loadedConfig
}

// 导出配置（同步版本，用于向后兼容）
export const config = sortCategories(rawConfig)

// 导出异步获取配置的函数
export const getConfig = initConfig

// 同时导出原始配置（如果需要）
export const rawCategories = rawConfig

