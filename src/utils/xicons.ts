// Xicons 图标配置和映射
import { 
  Google,
  Bold,
  Windows,
  Dochub,
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
  Blog,
  Markdown,
  Image,
  Images,
  Paperclip,
  Clock,
  Icons,
  NetworkWired,
  Unlock,
  FileExport,
  Home,
  Server,
  Signal,
  GithubSquare,
  Compass,
  MediumM,
  Zhihu
} from '@vicons/fa'

// Xicons 图标映射表（按分类组织，便于维护）
export const xiconMap: Record<string, any> = {
  // 基础图标
  Google,
  Bold,
  Windows,
  Dochub,
  Github,
  StackOverflow,
  Figma,
  StickyNote,
  
  // 业务相关图标
  Briefcase,
  Markdown,
  Image,
  Images,
  Blog,
  Code,
  Search,
  
  // 社交和媒体图标
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
  
  // 技术图标
  Microchip,
  Paperclip,
  Clock,
  Icons,
  NetworkWired,
  Unlock,
  FileExport,
  Server,
  Signal,
  Home,
  GithubSquare,
  Compass,
  MediumM,
  Zhihu
}

// 直接导出所有图标组件
export { 
  Google,
  Bold,
  Windows,
  Dochub,
  Github,
  StackOverflow,
  Figma,
  StickyNote,
  Briefcase,
  Markdown,
  Image,
  Images,
  Users,
  Twitter,
  Linkedin,
  Discord,
  Reddit,
  Blog,
  PlayCircle,
  Youtube,
  Film,
  Spotify,
  Steam,
  Paperclip,
  Newspaper,
  Globe,
  Tv,
  Microchip,
  Search,
  Zhihu,
  Clock,
  Icons,
  NetworkWired,
  Unlock,
  FileExport,
  Server,
  Signal,
  Home,
  GithubSquare,
  Compass,
  MediumM,
  Code
}

// 判断是否为 Xicon 图标
export function isXicon(icon: string): boolean {
  return icon.startsWith('xicon:') || icon.startsWith('fa:')
}

// 获取图标名称（去掉 xicon: 或 fa: 前缀）
export function getXiconName(icon: string): string {
  return icon.replace(/^(xicon:|fa:)/, '')
}

// 类型定义
export type XiconName = keyof typeof xiconMap
export type XiconComponent = typeof xiconMap[XiconName]

// 获取 Xicon 组件
export function getXiconComponent(iconName: string): XiconComponent | null {
  const component = xiconMap[iconName]
  if (!component) {
    console.warn(`⚠️ Xicon 图标 "${iconName}" 未找到，可用图标:`, Object.keys(xiconMap))
  }
  return component || null
}

// 检查图标是否存在
export function hasXicon(iconName: string): boolean {
  return iconName in xiconMap
}

// 添加新 Xicon 的方法
export function addXicon(name: string, component: any): void {
  if (hasXicon(name)) {
    console.warn(`⚠️ Xicon 图标 "${name}" 已存在，将被覆盖`)
  }
  xiconMap[name] = component
}

// 批量添加 Xicon 的方法
export function addXicons(icons: Record<string, any>): void {
  Object.entries(icons).forEach(([name, component]) => {
    addXicon(name, component)
  })
}

// 获取所有可用的 Xicon 名称
export function getAvailableXicons(): XiconName[] {
  return Object.keys(xiconMap) as XiconName[]
}

// 获取图标统计信息
export function getXiconStats() {
  const total = Object.keys(xiconMap).length
  return {
    total,
    categories: {
      basic: 8,      // Google, Bold, Windows, Dochub, Github, StackOverflow, Figma, StickyNote
      business: 7,  // Briefcase, Markdown, Image, Images, Blog, Code, Search
      social: 13,   // Users, Twitter, Linkedin, Discord, Reddit, PlayCircle, Youtube, Film, Spotify, Steam, Newspaper, Globe, Tv
      tech: 12      // Microchip, Paperclip, Clock, Icons, NetworkWired, Unlock, FileExport, Server, Signal, Home, GithubSquare, Zhihu
    }
  }
}
