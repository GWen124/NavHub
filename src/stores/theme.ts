import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // 初始化主题，清理可能存在的主题相关设置
  const initTheme = () => {
    const root = document.documentElement
    root.classList.remove('dark-mode')
    localStorage.removeItem('theme')
  }

  return {
    initTheme
  }
})
