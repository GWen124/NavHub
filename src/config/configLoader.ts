import { reactive } from 'vue'

// 配置接口定义
export interface BackgroundConfig {
  image?: string
  bingWallpaper?: boolean
  bingMode?: string
}

export interface FooterLink {
  name: string
  icon: string
  url: string
}

export interface FooterSecondLineFont {
  size?: string
  weight?: string
}

export interface FooterSecondLine {
  enabled?: boolean
  links?: FooterLink[]
  font?: FooterSecondLineFont
}

export interface FooterConfig {
  enabled?: boolean
  text?: string
  link?: string
  linkText?: string
  websiteText?: string
  websiteUrl?: string
  authorText?: string
  authorUrl?: string
  secondLine?: FooterSecondLine
}

export interface FaviconConfig {
  enabled?: boolean
  url?: string
  icon?: string
}

export interface TimeDateConfig {
  enabled?: boolean
}

export interface PageTitleConfig {
  hideQuote?: boolean
}

export interface CopyrightConfig {
  year?: number
  text?: string
  startDate?: string
  autoRange?: boolean
}

export interface ManualColorsConfig {
  primary?: string
  secondary?: string
  accent?: string
  header?: string
  cardTitle?: string
  footer?: string
}

export interface ColorsConfig {
  auto?: boolean
  autoColor?: boolean
  manual?: ManualColorsConfig
}

export interface FontConfig {
  fontA?: string
  fontB?: string
  size?: string
  weight?: string
  secondLine?: FooterSecondLineFont
}

export interface SidebarConfig extends FontConfig {
  width?: string
}

export interface ContentFontConfig {
  category?: FontConfig
  site?: FontConfig
}

export interface FontsConfig {
  header?: FontConfig
  content?: ContentFontConfig
  footer?: FontConfig
  sidebar?: SidebarConfig
}

export interface CategorySortingConfig {
  autoSort?: boolean
  pinnedCategories?: string[]
  bottomCategories?: string[]
}

export interface SiteSortingConfig {
  mode?: number
}

export interface AppConfig {
  pageTitle?: string
  pageQuote?: string
  pageTitleConfig?: PageTitleConfig
  background?: BackgroundConfig
  footer?: FooterConfig
  favicon?: FaviconConfig
  timeDate?: TimeDateConfig
  copyright?: CopyrightConfig
  colors?: ColorsConfig
  fonts?: FontsConfig
  categorySorting?: CategorySortingConfig
  siteSorting?: SiteSortingConfig
}

// 默认配置
const defaultConfig: AppConfig = {
  pageTitle: 'Website Panel',
  pageQuote: '人生寂寞，知己难求。',
  background: {
    image: '',
    bingWallpaper: false,
    bingMode: 'localFirst'
  },
  footer: {
    enabled: true,
    text: 'Powered by Vue.js',
    link: 'https://vuejs.org',
    linkText: 'Vue.js'
  },
  favicon: {
    enabled: true,
    url: '/favicon.ico'
  },
  timeDate: {
    enabled: true
  },
  copyright: {
    year: new Date().getFullYear(),
    text: 'All rights reserved.'
  },
  colors: {
    auto: true,
    manual: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b'
    }
  },
  fonts: {
    header: {
      fontA: '',
      fontB: '',
      size: '',
      weight: ''
    },
    content: {
      category: {
        fontA: '',
        fontB: '',
        size: '',
        weight: ''
      },
      site: {
        fontA: '',
        fontB: '',
        size: '',
        weight: ''
      }
    },
    footer: {
      fontA: '',
      fontB: '',
      size: '',
      weight: ''
    }
  }
}

export const appConfig = reactive<AppConfig>({ ...defaultConfig })

// 加载配置
export async function loadConfig(): Promise<void> {
  try {
    if (import.meta.env.DEV) {
      // 开发环境：从 config.yml 加载
    const response = await fetch('/config.yml')
      if (!response.ok) {
        console.warn('无法加载 config.yml，使用默认配置')
        return
      }
    
      const yamlText = await response.text()
      const config = parseYamlConfig(yamlText)
      
      // 更新配置
      Object.assign(appConfig, config)
      
      // 应用配置
      await applyAllConfigs()
    } else {
      // 生产环境：使用嵌入的配置
      const { appConfig: embeddedConfig } = await import('./generated')
      Object.assign(appConfig, embeddedConfig)
      await applyAllConfigs()
    }
  } catch (error) {
    console.error('加载配置失败:', error)
  }
}

// 解析YAML配置
function parseYamlConfig(yamlText: string): any {
  const result: any = {}
  const lines = yamlText.split('\n')
  let currentSection: any = null
  let currentSectionName: string = ''
  let currentSubSection: any = null
  let currentSubSectionName: string = ''
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith('#')) continue
    
    const keyValue = trimmedLine.split(':')
    if (keyValue.length < 2) continue
    
    const key = keyValue[0]?.trim() || ''
    let value = keyValue.slice(1).join(':').trim()
    
    // 处理引号
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1)
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1)
    }

      // 处理布尔值
    if (value === 'true') {
      value = true as any
    } else if (value === 'false') {
      value = false as any
    }
      
    // 处理顶级section
    if (key === 'footer' || key === 'background' || key === 'favicon' || key === 'copyright' || key === 'colors' || key === 'fonts' || key === 'timeDate' || key === 'autoIcon') {
        if (!result[key]) {
          result[key] = {}
        }
        currentSection = result[key]
      currentSectionName = key
      currentSubSection = null
      currentSubSectionName = ''
    } 
    // 处理二级section (如 fonts.header, fonts.content, fonts.footer, colors.manual)
    else if (currentSection && (key === 'header' || key === 'content' || key === 'footer' || key === 'manual' || key === 'category' || key === 'site')) {
      if (!currentSection[key]) {
        currentSection[key] = {}
      }
      currentSubSection = currentSection[key]
      currentSubSectionName = key
    }
    // 处理值
    else if (currentSubSection) {
      currentSubSection[key] = value
    } else if (currentSection) {
      currentSection[key] = value
    } else {
      result[key] = value
    }
  }
  
  return result
}

// Bing 轮播状态
let bingImages: string[] = []
let currentImageIndex = 0
let carouselInterval: number | null = null

// 获取多张 Bing 图片
async function getBingWallpapers(): Promise<string[]> {
  try {
    const bingApiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=16&mkt=zh-CN'
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const fullUrl = proxyUrl + encodeURIComponent(bingApiUrl)
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.images && Array.isArray(data.images)) {
      const imageUrls = data.images.map((img: any) => {
        if (img.url) {
          return `https://www.bing.com${img.url}`
        }
        return null
      }).filter((url: string | null) => url !== null)
      
      return imageUrls
    }
    
    return []
  } catch (error) {
    console.error('获取Bing图片失败:', error)
    return []
  }
}

// 设置背景图片
function setBackgroundImage(imageUrl: string): void {
  // 创建或更新背景元素
  let bgElement = document.getElementById('dynamic-background')
  if (!bgElement) {
    bgElement = document.createElement('div')
    bgElement.id = 'dynamic-background'
    bgElement.style.position = 'fixed'
    bgElement.style.top = '0'
    bgElement.style.left = '0'
    bgElement.style.width = '100%'
    bgElement.style.height = '100%'
    bgElement.style.backgroundImage = `url("${imageUrl}")`
    bgElement.style.backgroundSize = 'cover'
    bgElement.style.backgroundPosition = 'center'
    bgElement.style.backgroundRepeat = 'no-repeat'
    bgElement.style.backgroundAttachment = 'fixed'
    bgElement.style.zIndex = '-1'
    document.body.appendChild(bgElement)
  } else {
    bgElement.style.backgroundImage = `url("${imageUrl}")`
  }
}

// 设置白色背景
function setWhiteBackground(): void {
  // 移除动态背景元素
  const bgElement = document.getElementById('dynamic-background')
  if (bgElement) {
    bgElement.remove()
  }
  
  // 移除视频元素
  const videoElement = document.querySelector('video')
  if (videoElement) {
    videoElement.remove()
  }
  
  // 设置body背景
  document.body.style.backgroundImage = 'none'
  document.body.style.backgroundColor = '#ffffff'
}

// 设置自定义背景
function setCustomBackground(imageUrl: string): void {
  if (imageUrl.endsWith('.mp4') || imageUrl.endsWith('.webm') || imageUrl.endsWith('.ogg')) {
    // 视频背景
    const video = document.createElement('video')
    video.src = imageUrl
    video.autoplay = true
    video.loop = true
    video.muted = true
    video.style.position = 'fixed'
    video.style.top = '0'
    video.style.left = '0'
    video.style.width = '100%'
    video.style.height = '100%'
    video.style.objectFit = 'cover'
    video.style.zIndex = '-1'
    
    // 移除旧的视频元素和背景元素
    const oldVideo = document.querySelector('video')
    if (oldVideo) {
      oldVideo.remove()
    }
    const bgElement = document.getElementById('dynamic-background')
    if (bgElement) {
      bgElement.remove()
    }
    
    document.body.appendChild(video)
    
    // 确保body背景透明，让视频显示
    document.body.style.backgroundColor = 'transparent'
    document.body.style.backgroundImage = 'none'
  } else {
    // 图片背景
    setBackgroundImage(imageUrl)
  }
}

// 开始Bing轮播
function startBingCarousel(): void {
  if (bingImages.length === 0) return
  
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
  
  carouselInterval = setInterval(() => {
    if (bingImages.length === 0) return
    
    const nextIndex = Math.floor(Math.random() * bingImages.length)
    const nextImageUrl = bingImages[nextIndex]
    
    if (nextImageUrl) {
      setBackgroundImage(nextImageUrl)
      currentImageIndex = nextIndex
    }
  }, 30000) // 30秒切换一次
}

// 应用背景配置
export async function applyBackgroundConfig(bgConfig: BackgroundConfig): Promise<void> {
  if (bgConfig.bingWallpaper) {
    try {
    bingImages = await getBingWallpapers()
    
    if (bingImages.length > 0) {
        if (bgConfig.bingMode === 'direct') {
          // 直接显示Bing图片
          const firstImageUrl = bingImages[0]
          if (firstImageUrl) {
            setBackgroundImage(firstImageUrl)
          }
          startBingCarousel()
        } else {
          // 先显示本地背景，然后切换到Bing
          if (bgConfig.image && bgConfig.image.trim() !== '') {
            setCustomBackground(bgConfig.image)
          } else {
            setWhiteBackground()
          }
          
          // 30秒后切换到第一张Bing图片
          setTimeout(() => {
            if (bingImages.length > 0) {
              const firstImageUrl = bingImages[0]
              if (firstImageUrl) {
                setBackgroundImage(firstImageUrl)
              }
              currentImageIndex = 0
              startBingCarousel()
            }
          }, 30000)
        }
      } else {
        // 没有获取到Bing图片，使用本地背景
        if (bgConfig.image && bgConfig.image.trim() !== '') {
          setCustomBackground(bgConfig.image)
        } else {
          setWhiteBackground()
        }
      }
    } catch (error) {
      console.error('Bing壁纸设置失败:', error)
      if (bgConfig.image && bgConfig.image.trim() !== '') {
        setCustomBackground(bgConfig.image)
      } else {
        setWhiteBackground()
      }
    }
  } else {
    // 不使用Bing壁纸
    if (bgConfig.image && bgConfig.image.trim() !== '') {
      setCustomBackground(bgConfig.image)
    } else {
      setWhiteBackground()
    }
  }
}

// 应用页面标题
export function applyPageTitle(title: string): void {
  document.title = title
}

// 格式化版权年份
export function formatCopyrightYear(copyrightConfig: CopyrightConfig): string {
  const currentYear = new Date().getFullYear()
  
  // 从 startDate 中提取年份
  let startYear = copyrightConfig.year || currentYear
  if (copyrightConfig.startDate) {
    const dateMatch = copyrightConfig.startDate.match(/(\d{4})/)
    if (dateMatch && dateMatch[1]) {
      startYear = parseInt(dateMatch[1])
    }
  }
  
  // 根据 autoRange 决定是否显示年份范围
  if (copyrightConfig.autoRange === false) {
    return startYear.toString()
  }
  
  // autoRange 为 true 或未设置时，自动计算范围
  if (startYear === currentYear) {
    return currentYear.toString()
  } else if (startYear < currentYear) {
      return `${startYear}-${currentYear}`
    } else {
      return startYear.toString()
  }
}

// 应用颜色配置
export function applyColorsConfig(colorsConfig: ColorsConfig): void {
  const root = document.documentElement
  
  if (colorsConfig.autoColor) {
    // 自动颜色模式：根据背景亮度自动切换黑白文字
    // 设置为黑色，theme.ts 会根据背景亮度动态调整
    root.style.setProperty('--header-color', '#000000')
    root.style.setProperty('--card-title-color', '#000000')
    root.style.setProperty('--footer-color', '#000000')
  } else if (colorsConfig.manual) {
    // 手动颜色模式
    const { header, cardTitle, footer } = colorsConfig.manual
    if (header) root.style.setProperty('--header-color', header)
    if (cardTitle) root.style.setProperty('--card-title-color', cardTitle)
    if (footer) root.style.setProperty('--footer-color', footer)
  }
}

// 应用Favicon配置
export function applyFaviconConfig(faviconConfig: FaviconConfig): void {
  const faviconUrl = faviconConfig.url || faviconConfig.icon || '/favicon.ico'
  
  // 移除所有现有的 favicon 链接
  const existingLinks = document.querySelectorAll("link[rel*='icon']")
  existingLinks.forEach(link => link.remove())
  
  // 创建新的 favicon 链接
  const link = document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'icon'
  link.href = faviconUrl
  
  const head = document.getElementsByTagName('head')[0]
  if (head) {
    head.appendChild(link)
  }
}

// 生成字体名称
function generateFontName(fontPath: string, region: string, type: 'a' | 'b'): string {
  if (fontPath.startsWith('http')) {
    return `${region}-font-${type}`
  }
  return fontPath.split('/').pop()?.split('.')[0] || (type === 'a' ? 'SanJiZhengYaHei-XianXi' : 'brand')
}

// 生成字体族
function generateFontFamily(fontA: string, fontB: string, region: string): string {
  const fonts: string[] = []
  
  if (fontA && fontA.trim() !== '') {
    const fontName = generateFontName(fontA, region, 'a')
    fonts.push(`"${fontName}"`)
  }
  
  if (fontB && fontB.trim() !== '') {
    const fontName = generateFontName(fontB, region, 'b')
    fonts.push(`"${fontName}"`)
  }
  
  fonts.push('system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif')
  
  return fonts.join(', ')
}

// 应用字体配置
export async function applyFontsConfig(fontsConfig: FontsConfig): Promise<void> {
  const { header, content, footer, sidebar } = fontsConfig
  
  if (!header || !content || !footer) {
    console.warn('字体配置不完整，跳过应用')
    return
  }
  
  // 注入CSS @font-face规则（在字体应用之前）
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-family: 'AnJingChenXinShouJinTi';
      src: url('/fonts/AnJingChenXinShouJinTi.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'brand';
      src: url('/fonts/brand.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'SanJiZhengYaHei-Cu';
      src: url('/fonts/SanJiZhengYaHei-Cu.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'SanJiZhengYaHei-ZhongCu';
      src: url('/fonts/SanJiZhengYaHei-ZhongCu.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'SanJiZhengYaHei-Xi';
      src: url('/fonts/SanJiZhengYaHei-Xi.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'brand';
      src: url('/fonts/brand.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
  `
  document.head.appendChild(style)
  
  // 应用字体样式
  const root = document.documentElement
  
  // 头部字体样式
  const headerFontFamily = generateFontFamily(header.fontA || '', header.fontB || '', 'header')
  root.style.setProperty('--header-font-family', headerFontFamily)
  if (header.size) root.style.setProperty('--header-font-size', `${header.size}px`)
  if (header.weight) root.style.setProperty('--header-font-weight', header.weight)

  // 头部B字体样式（专门用于数字）
  const headerBFontFamily = generateFontFamily('', header.fontB || '', 'header-b')
  root.style.setProperty('--header-font-b-family', headerBFontFamily)
  
  // 等待字体加载完成后应用
  document.fonts.ready.then(() => {
    const timeElements = document.querySelectorAll('.current-time')
    timeElements.forEach((el) => {
      const element = el as HTMLElement
      element.style.fontFamily = 'var(--header-font-b-family)'
    })
    
    const dateElements = document.querySelectorAll('.current-date')
    dateElements.forEach((el) => {
      const element = el as HTMLElement
      const dateText = element.textContent || ''
      if (/[\u4e00-\u9fff]/.test(dateText)) {
        element.style.fontFamily = 'var(--header-font-family)'
      } else {
        element.style.fontFamily = 'var(--header-font-b-family)'
      }
    })
  })

  // 智能字体选择函数
  function createSmartFontFamily(fontA: string, fontB: string, region: string): string {
    if (fontA && fontB) {
      const fontAName = generateFontName(fontA, region, 'a')
      const fontBName = generateFontName(fontB, region, 'b')
      return `"${fontBName}", "${fontAName}", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`
    }
    return generateFontFamily(fontA, fontB, region)
  }

  // 分组标题字体样式
  const categoryFontFamily = createSmartFontFamily(content.category?.fontA || '', content.category?.fontB || '', 'category')
  root.style.setProperty('--category-font-family', categoryFontFamily)
  if (content.category?.size) root.style.setProperty('--category-font-size', `${content.category.size}px`)
  if (content.category?.weight) root.style.setProperty('--category-font-weight', content.category.weight)

  // 网站卡片字体样式
  const siteFontFamily = createSmartFontFamily(content.site?.fontA || '', content.site?.fontB || '', 'site')
  root.style.setProperty('--site-font-family', siteFontFamily)
  if (content.site?.size) root.style.setProperty('--site-font-size', `${content.site.size}px`)
  if (content.site?.weight) root.style.setProperty('--site-font-weight', content.site.weight)

  // Footer字体样式
  const footerFontFamily = generateFontFamily(footer.fontA || '', footer.fontB || '', 'footer')
  root.style.setProperty('--footer-font-family', footerFontFamily)
  if (footer.size) {
    // 如果size已经包含px，直接使用；否则添加px
    const sizeValue = footer.size.includes('px') ? footer.size : `${footer.size}px`
    root.style.setProperty('--footer-font-size', sizeValue)
  }
  if (footer.weight) root.style.setProperty('--footer-font-weight', footer.weight)

  // Footer第二行字体样式（使用主footer字体，但独立大小和粗细）
  if (footer.secondLine) {
    // 使用主footer的字体族
    root.style.setProperty('--footer-second-line-font-family', footerFontFamily)
    // 独立的大小和粗细配置
    if (footer.secondLine.size) root.style.setProperty('--footer-second-line-font-size', footer.secondLine.size)
    if (footer.secondLine.weight) root.style.setProperty('--footer-second-line-font-weight', footer.secondLine.weight)
  }

  // 侧边栏字体样式
  if (sidebar) {
    const sidebarFontFamily = generateFontFamily(sidebar.fontA || '', sidebar.fontB || '', 'sidebar')
    root.style.setProperty('--sidebar-font-family', sidebarFontFamily)
    if (sidebar.size) root.style.setProperty('--sidebar-font-size', sidebar.size)
    if (sidebar.weight) root.style.setProperty('--sidebar-font-weight', sidebar.weight)
    if (sidebar.width) root.style.setProperty('--sidebar-width', sidebar.width)
  }
  
  // 设置body默认字体为系统默认字体，不强制使用任何特定字体
  document.body.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  
  // 应用字体到所有元素
  setTimeout(() => {
    const mainQuoteElements = document.querySelectorAll('.main-quote')
    mainQuoteElements.forEach(el => {
      (el as HTMLElement).style.fontFamily = 'var(--header-font-family)'
    })
    
    const dateNumbersElements = document.querySelectorAll('.date-numbers')
    dateNumbersElements.forEach((el) => {
      const element = el as HTMLElement
      element.style.fontFamily = 'var(--header-font-b-family)'
    })
    
    const dateChineseElements = document.querySelectorAll('.date-chinese')
    dateChineseElements.forEach((el) => {
      const element = el as HTMLElement
      element.style.fontFamily = 'var(--header-font-family)'
      element.style.fontWeight = 'bold'
    })
    
    const categoryElements = document.querySelectorAll('.category-title')
    categoryElements.forEach(el => {
      (el as HTMLElement).style.fontFamily = 'var(--category-font-family)'
    })
    
    const siteElements = document.querySelectorAll('.site-name')
    siteElements.forEach(el => {
      (el as HTMLElement).style.fontFamily = 'var(--site-font-family)'
    })
  }, 1000)
}

// 加载字体
async function loadFont(fontName: string, fontUrl: string): Promise<void> {
  try {
    const font = new FontFace(fontName, `url(${fontUrl})`)
    await font.load()
    document.fonts.add(font)
  } catch (error) {
    console.warn(`字体加载失败: ${fontName}`, error)
  }
}

// 应用所有配置
export async function applyAllConfigs(): Promise<void> {
  if (appConfig.background) {
    await applyBackgroundConfig(appConfig.background)
  }
  
  if (appConfig.pageTitle) {
    applyPageTitle(appConfig.pageTitle)
  }
  
  if (appConfig.favicon) {
    applyFaviconConfig(appConfig.favicon)
  }
  
  if (appConfig.colors) {
    applyColorsConfig(appConfig.colors)
  }
  
  if (appConfig.fonts) {
    await applyFontsConfig(appConfig.fonts)
  }
}