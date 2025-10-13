// 配置导出和排序处理
import { config as rawConfig, type Category } from '../config'
import { appConfig } from './generated'

// 导出类型
export type { Site, Category } from '../config'

/**
 * 对分组进行排序
 * @param categories 原始分组数组
 * @returns 排序后的分组数组
 */
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
  
  return [...sortPinned, ...middle, ...sortBottom]
}

// 导出排序后的配置
export const config = sortCategories(rawConfig)
