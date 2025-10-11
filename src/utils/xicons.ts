// Xicons 图标配置和映射
import { 
  Github,
  StackOverflow,
  Figma,
  StickyNote,
  Users,
  Twitter,
  Linkedin,
  Discord,
  Reddit,
  PlayCircle,
  Youtube,
  Film,
  Spotify,
  Steam,
  Newspaper,
  Globe,
  Tv,
  Microchip,
  Code,
  Briefcase,
  Search,
  QuestionCircle
} from '@vicons/fa'

// Xicons 图标映射表
export const xiconMap: Record<string, any> = {
  // 工作工具类
  Github,
  StackOverflow,
  Figma,
  StickyNote,
  Briefcase,
  
  // 社交媒体类
  Users,
  Twitter,
  Linkedin,
  Discord,
  Reddit,
  
  // 娱乐休闲类
  PlayCircle,
  Youtube,
  Film,
  Spotify,
  Steam,
  
  // 新闻资讯类
  Newspaper,
  Globe,
  Tv,
  Microchip,
  Code,
  
  // 功能图标
  Search,
  
  // 知乎相关图标
  Zhihu: QuestionCircle
}

// 判断是否为 Xicon 图标
export function isXicon(icon: string): boolean {
  return icon.startsWith('xicon:') || icon.startsWith('fa:')
}

// 获取图标名称（去掉 xicon: 或 fa: 前缀）
export function getXiconName(icon: string): string {
  return icon.replace(/^(xicon:|fa:)/, '')
}

// 获取 Xicon 组件
export function getXiconComponent(iconName: string) {
  return xiconMap[iconName] || null
}

// 添加新 Xicon 的方法
export function addXicon(name: string, component: any): void {
  xiconMap[name] = component
}

// 批量添加 Xicon 的方法
export function addXicons(icons: Record<string, any>): void {
  Object.assign(xiconMap, icons)
}

// 获取所有可用的 Xicon 名称
export function getAvailableXicons(): string[] {
  return Object.keys(xiconMap)
}
