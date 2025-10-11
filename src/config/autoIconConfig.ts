// 自动图标配置
import { getSmartFavicon, getBatchFavicons } from '../utils/iconUtils'

// 网站配置接口
export interface Site {
  name: string
  url: string
  icon?: string // 可选的自定义图标
  autoIcon?: boolean // 是否启用自动图标
}

export interface Category {
  name: string
  sites: Site[]
}

// 示例配置 - 使用自动图标
export const autoIconConfig: Category[] = [
  {
    name: "Daily Hub",
    sites: [
      {
        name: "Home Page",
        url: "https://gw124.top",
        icon: "https://image.gw124.top/Avatar/imgbin_a1bee513649d120523b69c8584c25695.png",
        autoIcon: false // 使用自定义图标
      },
      {
        name: "Google",
        url: "https://www.google.com/",
        autoIcon: true // 自动获取图标
      },
      {
        name: "GitHub",
        url: "https://github.com",
        autoIcon: true
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/",
        autoIcon: true
      },
      {
        name: "Bilibili",
        url: "https://www.bilibili.com/",
        autoIcon: true
      }
    ]
  },
  {
    name: "AI Tools",
    sites: [
      {
        name: "ChatGPT",
        url: "https://chat.openai.com",
        autoIcon: true
      },
      {
        name: "Claude",
        url: "https://claude.ai",
        autoIcon: true
      },
      {
        name: "Gemini",
        url: "https://gemini.google.com",
        autoIcon: true
      },
      {
        name: "Copilot",
        url: "https://github.com/features/copilot",
        autoIcon: true
      }
    ]
  },
  {
    name: "Instant Messaging",
    sites: [
      {
        name: "WhatsApp",
        url: "https://web.whatsapp.com",
        autoIcon: true
      },
      {
        name: "Telegram",
        url: "https://web.telegram.org",
        autoIcon: true
      },
      {
        name: "Discord",
        url: "https://discord.com/app",
        autoIcon: true
      },
      {
        name: "Slack",
        url: "https://slack.com",
        autoIcon: true
      }
    ]
  }
]

/**
 * 批量获取所有启用自动图标的网站图标
 * @param config 网站配置
 * @returns Promise<Record<string, string>>
 */
export const loadAllAutoIcons = async (config: Category[]): Promise<Record<string, string>> => {
  const urls: string[] = []
  
  // 收集所有启用自动图标的URL
  config.forEach(category => {
    category.sites.forEach(site => {
      if (site.autoIcon) {
        urls.push(site.url)
      }
    })
  })
  
  // 批量获取图标
  return await getBatchFavicons(urls)
}

/**
 * 获取单个网站的自动图标
 * @param url 网站URL
 * @returns Promise<string>
 */
export const getAutoIcon = async (url: string): Promise<string> => {
  return await getSmartFavicon(url)
}

/**
 * 更新配置中的图标
 * @param config 网站配置
 * @returns Promise<Category[]>
 */
export const updateConfigWithAutoIcons = async (config: Category[]): Promise<Category[]> => {
  const updatedConfig = [...config]
  
  for (const category of updatedConfig) {
    for (const site of category.sites) {
      if (site.autoIcon && !site.icon) {
        try {
          site.icon = await getSmartFavicon(site.url)
        } catch (error) {
          console.error(`获取 ${site.name} 图标失败:`, error)
        }
      }
    }
  }
  
  return updatedConfig
}

/**
 * 验证图标是否可用
 * @param iconUrl 图标URL
 * @returns Promise<boolean>
 */
export const validateIcon = async (iconUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(iconUrl, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * 获取图标统计信息
 * @param config 网站配置
 * @returns Promise<{total: number, autoIcon: number, customIcon: number, failed: number}>
 */
export const getIconStats = async (config: Category[]): Promise<{
  total: number
  autoIcon: number
  customIcon: number
  failed: number
}> => {
  let total = 0
  let autoIcon = 0
  let customIcon = 0
  let failed = 0
  
  for (const category of config) {
    for (const site of category.sites) {
      total++
      
      if (site.autoIcon) {
        autoIcon++
        // 检查自动图标是否可用
        if (site.icon) {
          const isValid = await validateIcon(site.icon)
          if (!isValid) {
            failed++
          }
        } else {
          failed++
        }
      } else if (site.icon) {
        customIcon++
      } else {
        failed++
      }
    }
  }
  
  return { total, autoIcon, customIcon, failed }
}
