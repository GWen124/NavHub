// 搜索引擎配置
import { 
  Google,
  Bold,
  Windows,
  Dochub,
  Github,
  StackOverflow,
  Youtube,
  Zhihu
} from '@/utils/xicons'

export interface SearchEngine {
  id: string
  name: string
  icon: any // xicons组件
  url: string
  placeholder: string
}

export const searchEngines: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    icon: Google,
    url: 'https://www.google.com/search?q=',
    placeholder: '在Google中搜索...'
  },
  {
    id: 'baidu',
    name: '百度',
    icon: Bold,
    url: 'https://www.baidu.com/s?wd=',
    placeholder: '在百度中搜索...'
  },
  {
    id: 'bing',
    name: 'Bing',
    icon: Windows,
    url: 'https://www.bing.com/search?q=',
    placeholder: '在Bing中搜索...'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    icon: Dochub,
    url: 'https://duckduckgo.com/?q=',
    placeholder: '在DuckDuckGo中搜索...'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/search?q=',
    placeholder: '在GitHub中搜索...'
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    icon: StackOverflow,
    url: 'https://stackoverflow.com/search?q=',
    placeholder: '在Stack Overflow中搜索...'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/results?search_query=',
    placeholder: '在YouTube中搜索...'
  },
  {
    id: 'zhihu',
    name: '知乎',
    icon: Zhihu,
    url: 'https://www.zhihu.com/search?q=',
    placeholder: '在知乎中搜索...'
  }
]

// 获取搜索引擎
export const getSearchEngine = (id: string): SearchEngine | undefined => {
  return searchEngines.find(engine => engine.id === id)
}

// 获取默认搜索引擎
export const getDefaultSearchEngine = (): SearchEngine => {
  return searchEngines[0] // Google
}

// 执行搜索
export const performSearch = (query: string, engineId: string): void => {
  const engine = getSearchEngine(engineId)
  if (engine && query.trim()) {
    const searchUrl = engine.url + encodeURIComponent(query.trim())
    window.open(searchUrl, '_blank')
  }
}
