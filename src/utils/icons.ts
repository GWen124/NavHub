// 通用图标工具函数
import { isXicon, getXiconName, getXiconComponent } from './xicons'

// 判断是否为 Xicon 图标
export { isXicon }

// 获取图标名称（去掉 xicon: 或 fa: 前缀）
export function getIconName(icon: string): string {
  return getXiconName(icon)
}

// 获取图标组件（兼容性函数）
export function getIconComponent(iconName: string) {
  return getXiconComponent(iconName)
}
