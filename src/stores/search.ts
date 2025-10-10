import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Category, Site } from '@/config'

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref('')
  const filteredCategories = ref<Category[]>([])

  // 搜索功能
  const search = (query: string, categories: Category[]) => {
    searchQuery.value = query
    
    if (!query.trim()) {
      filteredCategories.value = categories
      return
    }

    const filtered = categories.map(category => {
      const filteredSites = category.sites.filter(site =>
        site.name.toLowerCase().includes(query.toLowerCase()) ||
        site.url.toLowerCase().includes(query.toLowerCase())
      )
      
      return {
        ...category,
        sites: filteredSites
      }
    }).filter(category => category.sites.length > 0)

    filteredCategories.value = filtered
  }

  // 清除搜索
  const clearSearch = (categories: Category[]) => {
    searchQuery.value = ''
    filteredCategories.value = categories
  }

  // 高亮搜索结果
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(regex, '<span class="highlight">$1</span>')
  }

  return {
    searchQuery,
    filteredCategories,
    search,
    clearSearch,
    highlightText
  }
})
