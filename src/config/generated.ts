// 此文件由 scripts/generate-config.js 自动生成
// 请勿手动修改此文件

import { reactive } from 'vue'
import type { AppConfig } from './configLoader'

// 从 config.yml 生成的配置
export const appConfig = reactive<AppConfig>({
  ...{
  "pageTitle": "Website Panel",
  "favicon": {
    "icon": "https://image.gw124.top/Avatar/imgbin_a1bee513649d120523b69c8584c25695.png"
  },
  "pageQuote": "Website Panel",
  "footer": {
    "websiteText": "WEBSITE.GW124.TOP",
    "websiteUrl": "https://gw124.top"
  },
  "copyright": {
    "startDate": "2025-10-01",
    "autoRange": false
  },
  "background": {
    "bingWallpaper": true,
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
  "autoIcon": {
    "mode": 3
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
  console.log('✅ 配置已嵌入构建产物')
}

// 导出其他函数（保持兼容性）
export { applyBackgroundConfig, applyPageTitle, applyFaviconConfig, applyColorsConfig, formatCopyrightYear } from './configLoader'
