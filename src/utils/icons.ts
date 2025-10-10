// Xicons 图标导入和映射
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
  Search
} from '@vicons/fa'

// 图标映射表
export const iconMap: Record<string, any> = {
  // 工作工具类
  'github': Github,
  'stack-overflow': StackOverflow,
  'figma': Figma,
  'sticky-note': StickyNote,
  'briefcase': Briefcase,
  
  // 社交媒体类
  'users': Users,
  'twitter': Twitter,
  'linkedin': Linkedin,
  'discord': Discord,
  'reddit': Reddit,
  
  // 娱乐休闲类
  'play-circle': PlayCircle,
  'youtube': Youtube,
  'film': Film,
  'spotify': Spotify,
  'steam': Steam,
  
  // 新闻资讯类
  'newspaper': Newspaper,
  'globe': Globe,
  'tv': Tv,
  'microchip': Microchip,
  'code': Code,
  
  // 功能图标
  'search': Search
}

// 获取图标组件
export function getIconComponent(iconName: string) {
  return iconMap[iconName] || null
}

// 判断是否为 Xicon 图标
export function isXicon(icon: string): boolean {
  return icon.startsWith('xicon:')
}

// 获取图标名称（去掉 xicon: 前缀）
export function getIconName(icon: string): string {
  return icon.replace('xicon:', '')
}

// 添加新图标的方法
export function addIcon(name: string, component: any): void {
  iconMap[name] = component
}

// 批量添加图标的方法
export function addIcons(icons: Record<string, any>): void {
  Object.assign(iconMap, icons)
}
