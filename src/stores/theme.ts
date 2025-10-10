import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // 简化主题管理，移除所有主题切换功能
  const initTheme = () => {
    // 移除所有主题相关的类名和样式
    const root = document.documentElement
    root.classList.remove('dark-mode')
    
    // 清理localStorage中的主题设置
    localStorage.removeItem('theme')
  }

  return {
    initTheme
  }
})
