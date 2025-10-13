// 此文件由 scripts/generate-config.js 自动生成
// 请勿手动修改此文件

import { reactive } from 'vue'
import type { AppConfig } from './configLoader'

// 从 config.yml 生成的配置
export const appConfig = reactive<AppConfig>({
  ...{
  "deployment": {
    "customDomain": ""
  },
  "pageTitle": "Website Panel",
  "favicon": {
    "icon": "https://image.gw124.top/Avatar/A62B54A6-13B8-4BB8-9AAA-75E3342388BB_1_105_c.jpeg"
  },
  "pageQuote": "人生寂寞，知己难求。",
  "pageTitleConfig": {
    "hideQuote": false
  },
  "timeDate": {
    "enabled": true
  },
  "footer": {
    "websiteText": "WEBSITE.GW124.TOP",
    "websiteUrl": "https://gw124.top"
  },
  "copyright": {
    "startDate": "2025-10-01",
    "autoRange": true
  },
  "background": {
    "bingWallpaper": false,
    "image": "https://image.gw124.top/Video/1.mp4",
    "bingMode": "localFirst"
  },
  "colors": {
    "autoColor": true,
    "manual": {
      "header": "#000000",
      "cardTitle": "#000000",
      "footer": "#000000"
    }
  },
  "fonts": {
    "header": {
      "fontA": "fonts/AnJingChenXinShouJinTi.ttf",
      "fontB": "fonts/brand.ttf",
      "size": "",
      "weight": ""
    },
    "content": {
      "category": {
        "fontA": "fonts/SanJiZhengYaHei-ZhongCu.ttf",
        "fontB": "Arial, sans-serif"
      },
      "site": {
        "fontA": "fonts/SanJiZhengYaHei-Xi.ttf",
        "fontB": "Arial, sans-serif"
      }
    },
    "footer": {
      "fontA": "https://raw.githubusercontent.com/GWen124/HomePage/main/public/fonts/brand.ttf",
      "fontB": "",
      "size": "",
      "weight": ""
    },
    "sidebar": {
      "fontA": "fonts/SanJiZhengYaHei-ZhongCu.ttf",
      "fontB": ""
    }
  },
  "autoIcon": {
    "mode": 3
  },
  "categorySorting": {
    "autoSort": true,
    "pinnedCategories": [
      "Favorites - 常用网站",
      "AI Tools - AI工具",
      "Online Tools - 在线工具",
      "Useful Tools - 实用工具",
      "Productivity - 生产力工具"
    ],
    "bottomCategories": [
      "Other - 其他"
    ]
  },
  "siteSorting": {
    "mode": 2
  },
  "externalConfig": {
    "enabled": false,
    "url": ""
  }
},
  footer: {
    ...{
  "websiteText": "WEBSITE.GW124.TOP",
  "websiteUrl": "https://gw124.top"
},
    authorText: "Wen",
    authorUrl: "https://github.com/GWen124"
  }
})

// 导出配置加载函数（保持兼容性）
export async function loadConfig(): Promise<void> {
  // 配置已嵌入，无需加载
}

// 导出其他函数（保持兼容性）
export { applyBackgroundConfig, applyPageTitle, applyFaviconConfig, applyColorsConfig, applyFontsConfig, formatCopyrightYear } from './configLoader'
