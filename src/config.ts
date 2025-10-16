// 网站配置数据 (从 public/Website.json 生成)
// 构建时间: 2025-10-16T09:59:59.438Z
// 数据来源: public/Website.json

export interface Site {
  name: string
  url: string
  icon: string
  autoIcon?: boolean
}

export interface Category {
  name: string
  sites: Site[]
}

export const config: Category[] = [
  {
    "name": "示例分组",
    "sites": [
      {
        "name": "示例网站",
        "url": "https://example.com",
        "icon": "https://example.com/favicon.ico"
      }
    ]
  }
]
