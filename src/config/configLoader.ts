import { ref, reactive } from 'vue'

// 配置接口定义
export interface BackgroundConfig {
  bingWallpaper: boolean
  image: string
  bingMode?: string
}

export interface FooterConfig {
  websiteText: string
  websiteUrl: string
  authorText: string
  authorUrl: string
}

export interface FaviconConfig {
  icon: string
}

export interface CopyrightConfig {
  startDate: string
  autoRange: boolean
}

export interface ManualColorsConfig {
  header: string    // 头部区域：主标题、时间、日期、竖线分割线、搜索图标
  cardTitle: string // 中部区域：网站分类标题、网站卡片标题
  footer: string    // Footer区域：版权信息、链接文字、分割线
}

export interface ColorsConfig {
  autoColor: boolean
  manual: ManualColorsConfig
}

export interface AppConfig {
  pageTitle: string
  pageQuote: string
  footer: FooterConfig
  background: BackgroundConfig
  favicon: FaviconConfig
  copyright: CopyrightConfig
  colors: ColorsConfig
}

// 默认配置（与config.yml保持一致）
const defaultConfig: AppConfig = {
  pageTitle: "Website Panel",
  pageQuote: "人生寂寞，知己难求。",
  footer: {
    websiteText: "WEBSITE.GW124.TOP",
    websiteUrl: "https://gw124.top",
    authorText: "Wen",
    authorUrl: "https://github.com/GWen124"
  },
  background: {
    bingWallpaper: true,
    image: "https://image.gw124.top/Video/Network%20-%2045961.mp4"
  },
  favicon: {
    icon: "https://image.gw124.top/Avatar/imgbin_a1bee513649d120523b69c8584c25695.png"
  },
  copyright: {
    startDate: "2025-10-01",
    autoRange: true
  },
  colors: {
    autoColor: true,
    manual: {
      header: "#000000",
      cardTitle: "#000000",
      footer: "#000000"
    }
  }
}

// 配置状态
export const appConfig = reactive<AppConfig>({ ...defaultConfig })

// 加载配置（从config.yml文件）
export async function loadConfig(): Promise<void> {
  try {
    const response = await fetch('/config.yml')
    
    if (response.ok) {
      const yamlText = await response.text()
      const parsedConfig = parseYaml(yamlText)
      
      // 合并配置
      Object.assign(appConfig, {
        ...defaultConfig,
        ...parsedConfig,
        footer: { 
          ...defaultConfig.footer, 
          ...parsedConfig.footer,
          // 强制保持作者信息为默认值
          authorText: defaultConfig.footer.authorText,
          authorUrl: defaultConfig.footer.authorUrl
        },
        background: { ...defaultConfig.background, ...parsedConfig.background },
        favicon: { ...defaultConfig.favicon, ...parsedConfig.favicon },
        copyright: { ...defaultConfig.copyright, ...parsedConfig.copyright }
      })
    } else {
      console.warn('config.yml not found, using default config')
    }
  } catch (error) {
    console.warn('配置加载失败，使用默认配置:', error)
  }
}

// 简单的 YAML 解析器
function parseYaml(yamlText: string): Partial<AppConfig> {
  const lines = yamlText.split('\n')
  const result: Record<string, any> = {}
  let currentSection: Record<string, any> | null = null
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // 跳过注释和空行
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue
    }

    const indent = line.search(/\S/) // Find first non-whitespace character
    if (indent === 0) {
      currentSection = null // Reset for top-level properties
    }

    const colonIndex = trimmedLine.indexOf(':')
    if (colonIndex > 0) {
      const key = trimmedLine.substring(0, colonIndex).trim()
      const value = trimmedLine.substring(colonIndex + 1).trim()

      // 移除引号并处理布尔值
      let cleanValue: string | boolean = value.replace(/^["']|["']$/g, '')

      // 处理布尔值
      if (cleanValue === 'true') {
        cleanValue = true
      } else if (cleanValue === 'false') {
        cleanValue = false
      }
      
      // 处理嵌套对象
      if (key === 'footer' || key === 'background' || key === 'favicon' || key === 'copyright' || key === 'colors') {
        if (!result[key]) {
          result[key] = {}
        }
        currentSection = result[key]
      } else if (currentSection) {
        // 处理嵌套属性
        currentSection[key] = cleanValue
      } else {
        // 处理顶级属性
        result[key] = cleanValue
      }
    }
  }
  
  return result
}

// Bing 轮播状态
let bingImages: string[] = []
let currentImageIndex = 0
let carouselInterval: number | null = null
let bingErrorCount = 0
let bingRetryInterval: number | null = null
let isBingAvailable = true
let currentConfig: BackgroundConfig | null = null
let cycleCount = 0 // 轮播循环计数
let isRefreshingImages = false // 是否正在刷新图片

// 获取多张 Bing 图片
async function getBingWallpapers(): Promise<string[]> {
  try {
    
    // 直接使用 CORS 代理获取 Bing 每日图片API
    // 获取更多天的图片，增加多样性
    const bingApiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=16&mkt=zh-CN'
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const fullUrl = proxyUrl + encodeURIComponent(bingApiUrl)
    
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    
    
    if (response.ok) {
      const data = await response.json()
      if (data.images && Array.isArray(data.images)) {
        const imageUrls = data.images.map((image: any) => {
          return `https://www.bing.com${image.url}`
        })
        return imageUrls
      }
    }
    
    // 如果代理失败，尝试其他代理
    const alternativeProxies = [
      'https://cors-anywhere.herokuapp.com/',
      'https://api.codetabs.com/v1/proxy?quest='
    ]
    
    for (const proxy of alternativeProxies) {
      try {
        const proxyResponse = await fetch(proxy + bingApiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        })
        
        
        if (proxyResponse.ok) {
          const data = await proxyResponse.json()
          if (data.images && Array.isArray(data.images)) {
            const imageUrls = data.images.map((image: any) => {
              return `https://www.bing.com${image.url}`
            })
            return imageUrls
          }
        }
      } catch (proxyError) {
        continue // 尝试下一个代理
      }
    }
    
    // 如果所有代理都失败，使用备用方案
    const fallbackImages = [
      'https://www.bing.com/th?id=OHR.SaranacLake_ZH-CN0224689397_1920x1080.jpg',
      'https://www.bing.com/th?id=OHR.WoodDuckHen_ZH-CN9558916773_1920x1080.jpg',
      'https://www.bing.com/th?id=OHR.MonurikiFiji_ZH-CN9178115886_1920x1080.jpg',
      'https://www.bing.com/th?id=OHR.WebbPillars_ZH-CN9054137596_1920x1080.jpg',
      'https://www.bing.com/th?id=OHR.OctopusCyanea_ZH-CN8948609460_1920x1080.jpg',
      'https://www.bing.com/th?id=OHR.RidgwayAspens_ZH-CN8735375502_1920x1080.jpg',
      'https://www.bing.com/th?id=OHR.AnshunBridge_ZH-CN8392458102_1920x1080.jpg',
      'https://www.bing.com/th?id=OHR.TeacherOwl_ZH-CN8289875605_1920x1080.jpg'
    ]
    return fallbackImages
  } catch (error) {
    console.error('获取Bing图片失败:', error)
    return []
  }
}

// 刷新 Bing 图片
async function refreshBingImages(): Promise<void> {
  if (isRefreshingImages) {
    return
  }
  
  isRefreshingImages = true
  
  try {
    const newImages = await getBingWallpapers()
    if (newImages.length > 0) {
      bingImages = newImages
      currentImageIndex = 0
      cycleCount = 0
      
      // 立即应用第一张新图片
      const firstImageUrl = bingImages[0]
      setBackgroundImage(firstImageUrl)
      
      // 根据新背景设置文字颜色
      if (firstImageUrl) {
        setTextColorBasedOnBackground(firstImageUrl)
      }
    }
  } catch (error) {
    console.error('刷新 Bing 图片时出错:', error)
  } finally {
    isRefreshingImages = false
  }
}

// 检查是否需要刷新Bing图片（每天刷新一次）
function shouldRefreshBingImages(): boolean {
  const lastRefreshKey = 'bing_last_refresh'
  const lastRefresh = localStorage.getItem(lastRefreshKey)
  
  if (!lastRefresh) {
    return true
  }
  
  const lastRefreshTime = parseInt(lastRefresh)
  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000 // 24小时
  
  return (now - lastRefreshTime) > oneDay
}

// 设置最后刷新时间
function setLastRefreshTime(): void {
  const lastRefreshKey = 'bing_last_refresh'
  localStorage.setItem(lastRefreshKey, Date.now().toString())
}

// 常量定义
const BRIGHTNESS_THRESHOLD = 128 // 亮度阈值，超过此值使用黑色文字
const PIXEL_SAMPLE_INTERVAL = 40 // 像素采样间隔（每40个像素采样一次）
const CAROUSEL_INTERVAL = 30000 // 轮播间隔（30秒）
const MAX_BING_ERRORS = 3 // 最大错误次数
const BING_RETRY_INTERVAL = 5 * 60 * 1000 // Bing重试间隔（5分钟）

// 计算图片亮度并设置文字颜色
async function setTextColorBasedOnBackground(imageUrl: string): Promise<void> {
  try {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) return
      
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      // 获取图片数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      let totalBrightness = 0
      let pixelCount = 0
      
      // 采样计算平均亮度（每40个像素采样一次以提高性能）
      for (let i = 0; i < data.length; i += PIXEL_SAMPLE_INTERVAL) {
        const r = data[i] || 0
        const g = data[i + 1] || 0
        const b = data[i + 2] || 0
        
        // 计算亮度 (0-255)
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114)
        totalBrightness += brightness
        pixelCount++
      }
      
      const averageBrightness = totalBrightness / pixelCount
      
      // 根据亮度设置文字颜色
      const textColor = averageBrightness > BRIGHTNESS_THRESHOLD ? '#000000' : '#ffffff'
      
      // 只有在自动变色模式下才应用颜色
      if (appConfig.colors && appConfig.colors.autoColor) {
        // 设置三个区域的颜色变量
        document.documentElement.style.setProperty('--header-color', textColor)
        document.documentElement.style.setProperty('--card-title-color', textColor)
        document.documentElement.style.setProperty('--footer-color', textColor)
      }
      
    }
    
    img.src = imageUrl
  } catch (error) {
    console.error('计算背景亮度失败:', error)
    // 失败时只有在自动变色模式下才使用默认颜色
    if (appConfig.colors && appConfig.colors.autoColor) {
      document.documentElement.style.setProperty('--header-color', '#000000')
      document.documentElement.style.setProperty('--card-title-color', '#000000')
      document.documentElement.style.setProperty('--footer-color', '#000000')
    }
  }
}

// 启动 Bing 轮播
function startBingCarousel(): void {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
  
  // 每 30 秒切换一次背景
  carouselInterval = setInterval(() => {
    if (bingImages.length > 0) {
      // 随机选择下一张图片，增加多样性
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * bingImages.length)
      } while (nextIndex === currentImageIndex && bingImages.length > 1)
      
      currentImageIndex = nextIndex
      const imageUrl = bingImages[currentImageIndex]
      
      // 检查是否完成一轮循环
      if (currentImageIndex === 0) {
        cycleCount++
        
        // 异步刷新图片，不阻塞当前轮播
        refreshBingImages().catch(error => {
          console.error('异步刷新图片失败:', error)
        })
      }
      
      // 应用背景
      setBackgroundImage(imageUrl)
      
      
      // 根据新背景设置文字颜色
      if (imageUrl) {
        setTextColorBasedOnBackground(imageUrl)
      }
    }
  }, CAROUSEL_INTERVAL) // 30秒切换一次
}

// 停止 Bing 轮播
function stopBingCarousel(): void {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
  if (bingRetryInterval) {
    clearInterval(bingRetryInterval)
    bingRetryInterval = null
  }
}

// 回退到自定义背景
function fallbackToCustomBackground(): void {
  // 停止 Bing 轮播
  stopBingCarousel()
  
  if (!currentConfig) {
    setWhiteBackground()
    return
  }
  
  // 检查是否有自定义背景
  const customImage = currentConfig.image && currentConfig.image.trim() !== ''
  
  if (customImage) {
    setCustomBackground(currentConfig.image)
  } else {
    setWhiteBackground()
  }
  
  // 启动重试机制
  startBingRetry()
}

// 检查是否为视频文件
function isVideoFile(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv']
  const lowerUrl = url.toLowerCase()
  return videoExtensions.some(ext => lowerUrl.includes(ext))
}

// 设置自定义背景（支持图片和视频）
function setCustomBackground(mediaUrl: string): void {
  const body = document.body
  
  // 清理之前的视频元素
  const existingVideo = document.getElementById('background-video')
  if (existingVideo) {
    existingVideo.remove()
  }
  
  if (isVideoFile(mediaUrl)) {
    // 创建视频背景
    const video = document.createElement('video')
    video.id = 'background-video'
    video.src = mediaUrl
    video.autoplay = true
    video.loop = true
    video.muted = true
    video.playsInline = true
    
    // 视频样式
    video.style.position = 'fixed'
    video.style.top = '0'
    video.style.left = '0'
    video.style.width = '100%'
    video.style.height = '100%'
    video.style.objectFit = 'cover'
    video.style.zIndex = '-1'
    video.style.pointerEvents = 'none'
    
    // 添加到页面
    document.body.appendChild(video)
    
    // 设置body背景
    body.style.setProperty('background-color', 'transparent', 'important')
    body.style.setProperty('background-image', 'none', 'important')
    
  } else {
    // 设置图片背景
    const backgroundImageUrl = `url(${mediaUrl})`
    
      setBackgroundImage(imageUrl)
    
    // 根据自定义背景设置文字颜色
    setTextColorBasedOnBackground(mediaUrl)
    
  }
}

// 设置背景图片的通用函数
function setBackgroundImage(imageUrl: string): void {
  const body = document.body
  const backgroundImageUrl = `url(${imageUrl})`
      setBackgroundImage(imageUrl)
}

// 设置白色背景
function setWhiteBackground(): void {
  const body = document.body
  
  body.style.setProperty('background-image', 'none', 'important')
  body.style.setProperty('background-color', '#ffffff', 'important')
}

// 启动 Bing 重试机制
function startBingRetry(): void {
  if (bingRetryInterval) {
    clearInterval(bingRetryInterval)
  }
  
  // 每 5 分钟重试一次
  bingRetryInterval = setInterval(async () => {
    if (!isBingAvailable && currentConfig && currentConfig.bingWallpaper) {
      try {
        const testImages = await getBingWallpapers()
        if (testImages.length > 0) {
          isBingAvailable = true
          bingImages = testImages
          currentImageIndex = 0
          
          // 设置第一张图片
          currentImageIndex = 0
          cycleCount = 0
          const firstImageUrl = bingImages[0]
          const backgroundImageUrl = `url(${firstImageUrl})`
          
          const body = document.body
      setBackgroundImage(imageUrl)
          
          // 重新启动轮播
          startBingCarousel()
          
          // 停止重试
          if (bingRetryInterval) {
            clearInterval(bingRetryInterval)
            bingRetryInterval = null
          }
        }
      } catch (error) {
        // Bing 服务仍不可用，继续使用备用背景
      }
    }
  }, BING_RETRY_INTERVAL) // 5分钟
}

// 应用背景配置
export async function applyBackgroundConfig(bgConfig: BackgroundConfig): Promise<void> {
  const body = document.body
  
  // 保存当前配置
  currentConfig = bgConfig
  
  // 停止之前的轮播和重试
  stopBingCarousel()
  
  // 重置状态
  bingErrorCount = 0
  isBingAvailable = true
  
  // 检查是否启用 Bing 轮播背景
  if (bgConfig.bingWallpaper) {
    // 强制获取新的Bing图片（临时调试用）
    bingImages = await getBingWallpapers()
    // 设置最后刷新时间
    setLastRefreshTime()
    
    if (bingImages.length > 0) {
      // 根据bingMode配置决定显示方式
      const bingMode = (bgConfig as any).bingMode || 'localFirst'
      
      if (bingMode === 'direct') {
        // 直接显示Bing轮播第一张图片
        currentImageIndex = 0
        cycleCount = 0
        const firstImageUrl = bingImages[0]
        const backgroundImageUrl = `url(${firstImageUrl})`
        
      setBackgroundImage(imageUrl)
        
        
        // 根据背景设置文字颜色
        if (firstImageUrl) {
          setTextColorBasedOnBackground(firstImageUrl)
        }
      } else {
        // localFirst模式：先显示本地背景，30秒后切换到Bing轮播
        const imageUrl = bgConfig.image && bgConfig.image.trim() !== '' ? bgConfig.image : null
        if (imageUrl) {
          setCustomBackground(imageUrl)
        } else {
          setWhiteBackground()
        }
        
        // 延迟30秒后切换到Bing轮播第一张图片
        setTimeout(() => {
          currentImageIndex = 0
          cycleCount = 0
          const firstImageUrl = bingImages[0]
          const backgroundImageUrl = `url(${firstImageUrl})`
          
          // 先移除视频背景
          const existingVideo = document.getElementById('background-video')
          if (existingVideo) {
            existingVideo.remove()
          }
          
          // 设置Bing图片背景，使用更强的优先级
          setBackgroundImage(firstImageUrl)
          
          // 根据背景设置文字颜色
          if (firstImageUrl) {
            setTextColorBasedOnBackground(firstImageUrl)
          }
        }, 30000) // 30秒延迟
        
        // 启动轮播
        startBingCarousel()
      
    } else {
      // 先显示自定义背景作为初始背景
      const imageUrl = bgConfig.image && bgConfig.image.trim() !== '' ? bgConfig.image : null
      if (imageUrl) {
        setCustomBackground(imageUrl)
      } else {
        setWhiteBackground()
      }
      
      // 启动重试机制
      startBingRetry()
    }
  } else {
    const imageUrl = bgConfig.image && bgConfig.image.trim() !== '' ? bgConfig.image : null
    
    if (imageUrl) {
      setCustomBackground(imageUrl)
    } else {
      setWhiteBackground()
    }
  }
  
  // 清理可能存在的CSS变量
  document.documentElement.style.removeProperty('--bg-image')
  document.documentElement.style.removeProperty('--bg-color')
}

// 应用页面标题
export function applyPageTitle(title: string): void {
  document.title = title
}

// 格式化版权年份
export function formatCopyrightYear(copyrightConfig: CopyrightConfig): string {
  if (!copyrightConfig.autoRange) {
    // 如果禁用自动范围，只显示开始年份
    return copyrightConfig.startDate.split('-')[0] || ''
  }

  try {
    const startDate = new Date(copyrightConfig.startDate)
    const currentDate = new Date()
    
    const startYear = startDate.getFullYear()
    const currentYear = currentDate.getFullYear()
    
    // 计算年份差
    const yearDiff = currentYear - startYear
    
    if (yearDiff <= 0) {
      // 当前年份小于等于开始年份，只显示开始年份
      return startYear.toString()
    } else if (yearDiff >= 1) {
      // 超过一年，显示年份范围
      return `${startYear}-${currentYear}`
    } else {
      // 不到一年，只显示开始年份
      return startYear.toString()
    }
  } catch (error) {
    console.error('版权年份格式化错误:', error)
    // 出错时返回开始年份
    return copyrightConfig.startDate.split('-')[0] || ''
  }
}

// 应用颜色配置
export function applyColorsConfig(colorsConfig: ColorsConfig): void {
  if (colorsConfig.autoColor) {
    // 自动变色模式：使用基于背景亮度的颜色
    // 这里不设置颜色，让背景亮度计算函数来处理
    return
  } else {
    // 手动颜色模式：使用配置的颜色
    const manual = colorsConfig.manual
    // 设置三个区域的颜色变量
    document.documentElement.style.setProperty('--header-color', manual.header)
    document.documentElement.style.setProperty('--card-title-color', manual.cardTitle)
    document.documentElement.style.setProperty('--footer-color', manual.footer)
  }
}

export function applyFaviconConfig(faviconConfig: FaviconConfig): void {
  // 移除现有的 favicon 链接
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]')
  existingFavicons.forEach(link => link.remove())
  
  if (!faviconConfig.icon || faviconConfig.icon.trim() === '') {
    // 使用默认 favicon
    const defaultFavicon = document.createElement('link')
    defaultFavicon.rel = 'icon'
    defaultFavicon.type = 'image/x-icon'
    defaultFavicon.href = '/favicon.ico'
    document.head.appendChild(defaultFavicon)
  } else {
    // 创建新的 favicon 链接
    const favicon = document.createElement('link')
    favicon.rel = 'icon'
    favicon.type = 'image/x-icon'
    favicon.href = faviconConfig.icon
    document.head.appendChild(favicon)
    
    // 同时添加 apple-touch-icon 支持
    const appleIcon = document.createElement('link')
    appleIcon.rel = 'apple-touch-icon'
    appleIcon.href = faviconConfig.icon
    document.head.appendChild(appleIcon)
  }
}
