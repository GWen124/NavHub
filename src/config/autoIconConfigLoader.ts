// 自动图标配置加载器
import { ref, computed } from 'vue'

// 配置接口定义
export interface AutoIconConfig {
  mode: 1 | 2 | 3
  services: string[]
  customSources: string[] // 自定义图标源
  icon: {
    size: number
    shapePriority: string[]
    qualityPriority: string[]
    cache: boolean
    cacheExpiry: number
  }
  fallback: {
    showInitials: boolean
    backgroundColor: string
    textColor: string
  }
  debug: {
    enableLogging: boolean
    showLoadingState: boolean
  }
}

// 默认配置
const defaultConfig: AutoIconConfig = {
  mode: 2,
  services: ['direct', 'clearbit', 'google', 'duckduckgo', 'iconhorse', 'simple', 'iconify', 'iconfont'],
  customSources: [
    'https://raw.githubusercontent.com/GWen124/HD-Icons/main/border-radius/',
    'https://cdn.jsdelivr.net/gh/GWen124/HD-Icons@main/border-radius/'
  ],
  icon: {
    size: 64,
    shapePriority: ['square', 'round', 'any'],
    qualityPriority: ['hd', 'normal', 'any'],
    cache: true,
    cacheExpiry: 24
  },
  fallback: {
    showInitials: true,
    backgroundColor: '',
    textColor: '#ffffff'
  },
  debug: {
    enableLogging: false,
    showLoadingState: true
  }
}

// 配置状态
const config = ref<AutoIconConfig>(defaultConfig)
const isLoading = ref<boolean>(false)

/**
 * 加载配置文件
 */
export const loadAutoIconConfig = async (): Promise<AutoIconConfig> => {
  try {
    isLoading.value = true
    
    // 这里应该从 config.yml 文件加载配置
    // 由于是本地测试，我们直接返回默认配置
    // 实际项目中需要解析 YAML 文件
    const loadedConfig = await loadConfigFromYaml()
    config.value = { ...defaultConfig, ...loadedConfig }
    
    return config.value
  } catch (error) {
    return defaultConfig
  } finally {
    isLoading.value = false
  }
}

/**
 * 从 YAML 文件加载配置（模拟实现）
 */
const loadConfigFromYaml = async (): Promise<Partial<AutoIconConfig>> => {
  // 尝试从 generated.ts 加载配置（优先级最高）
  try {
    const { appConfig } = await import('./generated')
    console.log('📦 尝试从 generated.ts 加载配置')
    console.log('   appConfig 存在:', !!appConfig)
    console.log('   appConfig.autoIcon 存在:', !!(appConfig && appConfig.autoIcon))
    console.log('   appConfig.autoIcon.mode:', appConfig?.autoIcon?.mode)
    
    if (appConfig && appConfig.autoIcon && appConfig.autoIcon.mode) {
      const mode = appConfig.autoIcon.mode
      // 验证 mode 值是否有效
      if (mode === 1 || mode === 2 || mode === 3) {
        console.log('✅ 从 generated.ts 加载 autoIcon 配置，mode:', mode)
        return {
          mode: mode as 1 | 2 | 3,
          services: ['clearbit', 'google', 'duckduckgo', 'iconhorse', 'simple', 'iconify', 'iconfont', 'direct'],
          customSources: defaultConfig.customSources,
          icon: defaultConfig.icon,
          fallback: defaultConfig.fallback,
          debug: defaultConfig.debug
        }
      } else {
        console.warn('⚠️ autoIcon.mode 值无效:', mode)
      }
    } else {
      console.warn('⚠️ generated.ts 中缺少 autoIcon 配置')
    }
  } catch (error) {
    console.error('❌ 从 generated.ts 加载配置失败:', error)
  }
  
  // 在开发环境中，从 config.yml 文件加载配置
  if (import.meta.env.DEV) {
    try {
      const response = await fetch('/config.yml')
      const yamlText = await response.text()
      
      // 简单的 YAML 解析（仅解析 mode 配置）
    const lines = yamlText.split('\n')
    let inAutoIconSection = false
    let mode = 4
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      if (trimmedLine === 'autoIcon:') {
        inAutoIconSection = true
        continue
      }
      
      if (inAutoIconSection && trimmedLine.startsWith('mode:')) {
        const parts = trimmedLine.split(':')
        if (parts.length > 1 && parts[1]) {
          const modeValue = parseInt(parts[1].trim())
          if (modeValue >= 1 && modeValue <= 3) {
            mode = modeValue as 1 | 2 | 3
          }
        }
        continue
      }
      
      // 如果遇到其他顶级配置，退出 autoIcon 部分
      if (inAutoIconSection && trimmedLine && !trimmedLine.startsWith(' ') && !trimmedLine.startsWith('#') && !trimmedLine.includes(':')) {
        break
      }
    }
    
    return {
      mode: mode as 1 | 2 | 3,
      services: ['clearbit', 'google', 'duckduckgo', 'iconhorse', 'simple', 'iconify', 'iconfont', 'direct'],
      customSources: defaultConfig.customSources,
      icon: {
        size: 64,
        shapePriority: ['square', 'round', 'any'],
        qualityPriority: ['hd', 'normal', 'any'],
        cache: true,
        cacheExpiry: 24
      },
      fallback: {
        showInitials: true,
        backgroundColor: '',
        textColor: '#ffffff'
      },
      debug: {
        enableLogging: false,
        showLoadingState: true
      }
    }
    } catch (error) {
      // 返回默认配置
      return {
        mode: 3,
        services: ['clearbit', 'google', 'duckduckgo', 'simple', 'iconify', 'iconfont', 'direct'],
        icon: {
          size: 64,
          shapePriority: ['square', 'round', 'any'],
          qualityPriority: ['hd', 'normal', 'any'],
          cache: true,
          cacheExpiry: 24
        },
        fallback: {
          showInitials: true,
          backgroundColor: '',
          textColor: '#ffffff'
        },
        debug: {
          enableLogging: false,
          showLoadingState: true
        }
      }
    }
  }
  
  // 如果所有方法都失败，返回默认配置（mode: 2 保留自定义图标）
  console.warn('⚠️ 使用默认 autoIcon 配置，mode: 2')
  return {
    mode: 2,
    services: ['clearbit', 'google', 'duckduckgo', 'simple', 'iconify', 'iconfont', 'direct'],
    icon: {
      size: 64,
      shapePriority: ['square', 'round', 'any'],
      qualityPriority: ['hd', 'normal', 'any'],
      cache: true,
      cacheExpiry: 24
    },
    fallback: {
      showInitials: true,
      backgroundColor: '',
      textColor: '#ffffff'
    },
    debug: {
      enableLogging: false,
      showLoadingState: true
    }
  }
}

/**
 * 获取当前配置
 */
export const getAutoIconConfig = (): AutoIconConfig => {
  return config.value
}

/**
 * 更新配置
 */
export const updateAutoIconConfig = (newConfig: Partial<AutoIconConfig>): void => {
  config.value = { ...config.value, ...newConfig }
}

/**
 * 判断是否应该使用自动图标
 */
export const shouldUseAutoIcon = (site: { icon: string; autoIcon?: boolean }): boolean => {
  const currentConfig = config.value
  
  switch (currentConfig.mode) {
    case 1: // 强制所有网站自动获取
      return true
      
    case 2: // 网站图标为空时自动获取
      const isEmpty = !site.icon || site.icon.trim() === ''
      return isEmpty
      
    case 3: // 非本地或链接图标一律自动获取（智能回退：服务商 → xicon → Font Awesome → 文字图标）
      const isNotLocalOrLink = !isValidIconUrl(site.icon)
      return isNotLocalOrLink
      
    default:
      return site.autoIcon || false
  }
}

/**
 * 判断是否为有效的图标URL
 */
const isValidIconUrl = (icon: string): boolean => {
  if (!icon || icon.trim() === '') return false
  
  // 检查是否为 HTTP/HTTPS 链接
  if (icon.startsWith('http://') || icon.startsWith('https://')) {
    return true
  }
  
  // 检查是否为本地文件路径
  if (icon.startsWith('/') || icon.startsWith('./') || icon.startsWith('../')) {
    return true
  }
  
  // 检查是否为 data URL
  if (icon.startsWith('data:')) {
    return true
  }
  
  // 检查是否为 xicon 图标（优先级最高）
  if (icon.startsWith('xicon:') || icon.startsWith('fa:')) {
    return true
  }
  
  // 检查是否为 Font Awesome 图标
  if (icon.startsWith('fa') || icon.startsWith('fas') || icon.startsWith('fab') || icon.startsWith('far')) {
    return true
  }
  
  // 检查是否为 emoji 图标（简化检测：短字符串且不包含特殊前缀）
  if (icon.length <= 4 && !icon.includes(':') && !icon.includes('/') && !icon.includes('.')) {
    return true
  }
  
  // 其他情况返回 false
  return false
}

/**
 * 获取图标服务列表
 */
export const getIconServices = (): string[] => {
  return config.value.services
}

/**
 * 获取图标大小
 */
export const getIconSize = (): number => {
  return config.value.icon.size
}

/**
 * 是否启用缓存
 */
export const isCacheEnabled = (): boolean => {
  return config.value.icon.cache
}

/**
 * 获取缓存过期时间
 */
export const getCacheExpiry = (): number => {
  return config.value.icon.cacheExpiry
}

/**
 * 是否显示备用图标
 */
export const shouldShowFallback = (): boolean => {
  return config.value.fallback.showInitials
}

/**
 * 获取备用图标背景颜色
 */
export const getFallbackBackgroundColor = (): string => {
  return config.value.fallback.backgroundColor
}

/**
 * 获取备用图标文字颜色
 */
export const getFallbackTextColor = (): string => {
  return config.value.fallback.textColor
}

/**
 * 是否启用调试日志
 */
export const isDebugLoggingEnabled = (): boolean => {
  return config.value.debug.enableLogging
}

/**
 * 是否显示加载状态
 */
export const shouldShowLoadingState = (): boolean => {
  return config.value.debug.showLoadingState
}

/**
 * 计算属性：配置是否已加载
 */
export const isConfigLoaded = computed(() => !isLoading.value)

/**
 * 计算属性：当前模式描述
 */
export const getModeDescription = computed(() => {
  switch (config.value.mode) {
    case 1:
      return '强制所有网站自动获取图标'
    case 2:
      return '网站图标为空时自动获取'
    case 3:
      return '非链接或本地图标自动获取'
    default:
      return '未知模式'
  }
})
