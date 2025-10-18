// 此文件由 scripts/generate-config.js 自动生成
// 请勿手动修改此文件

import { reactive } from 'vue'
import type { AppConfig } from './configLoader'

// 从 config.yml 生成的配置
export const appConfig = reactive<AppConfig>({
  ...{
  "deployment": {
    "customDomain": "navhub.gw124.top"
  },
  "pageTitle": "发现 · 收藏 · 出发",
  "favicon": {
    "icon": "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Uncategorized/Myicon.png"
  },
  "pageQuote": "你所喜爱的网站，一站汇聚。",
  "pageTitleConfig": {
    "hideQuote": true
  },
  "timeDate": {
    "enabled": true
  },
  "footer": {
    "websiteText": "NAVHUB.GW124.TOP",
    "websiteUrl": "https://navhub.gw124.top/",
    "secondLine": {
      "enabled": true,
      "links": [
        {
          "name": "Github",
          "icon": "fa-github",
          "url": "https://github.com/GWen124"
        },
        {
          "name": "Blog",
          "icon": "fa-rss",
          "url": "https://blog.gw124.top/"
        },
        {
          "name": "Email",
          "icon": "fa-envelope",
          "url": "mailto:9708281@gmail.com"
        },
        {
          "name": "Telegram",
          "icon": "fa-paper-plane",
          "url": "https://t.me/WenGe124_Bot"
        }
      ]
    }
  },
  "copyright": {
    "startDate": "2025-10-01",
    "autoRange": true
  },
  "background": {
    "bingWallpaper": false,
    "image": "https://image.gw124.top/Background/10-9-6k.jpg",
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
      "fontB": "fonts/brand.ttf"
    },
    "content": {
      "category": {
        "fontA": "fonts/SanJiZhengYaHei-ZhongCu.ttf",
        "fontB": ""
      },
      "site": {
        "fontA": "fonts/SanJiZhengYaHei-Xi.ttf",
        "fontB": ""
      }
    },
    "footer": {
      "fontA": "fonts/brand.ttf",
      "fontB": ""
    },
    "sidebar": {
      "fontA": "fonts/SanJiZhengYaHei-ZhongCu.ttf",
      "fontB": ""
    }
  },
  "autoIcon": {
    "mode": 2
  },
  "categorySorting": {
    "autoSort": true,
    "pinnedCategories": [
      "Favorites - 常用网站"
    ],
    "bottomCategories": [
      "Other - 其他"
    ]
  },
  "siteSorting": {
    "mode": 2
  },
  "externalConfig": {
    "url": ""
  },
  "externalProjectConfig": {
    "url": ""
  },
  "oauth": {
    "enabled": false,
    "clientId": "",
    "workerUrl": "",
    "redirectUri": "",
    "scope": "read:user"
  }
},
  footer: {
    ...{
  "websiteText": "NAVHUB.GW124.TOP",
  "websiteUrl": "https://navhub.gw124.top/",
  "secondLine": {
    "enabled": true,
    "links": [
      {
        "name": "Github",
        "icon": "fa-github",
        "url": "https://github.com/GWen124"
      },
      {
        "name": "Blog",
        "icon": "fa-rss",
        "url": "https://blog.gw124.top/"
      },
      {
        "name": "Email",
        "icon": "fa-envelope",
        "url": "mailto:9708281@gmail.com"
      },
      {
        "name": "Telegram",
        "icon": "fa-paper-plane",
        "url": "https://t.me/WenGe124_Bot"
      }
    ]
  }
},
    authorText: "Wen",
    authorUrl: "https://github.com/GWen124/NavHub"
  }
})

// 导出配置加载函数（保持兼容性）
export async function loadConfig(): Promise<void> {
  // 配置已嵌入，无需加载
}

// 导出其他函数（保持兼容性）
export { applyBackgroundConfig, applyPageTitle, applyFaviconConfig, applyColorsConfig, applyFontsConfig, formatCopyrightYear } from './configLoader'
