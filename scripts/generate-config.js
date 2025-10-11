#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取 config.yml
const configPath = path.join(__dirname, '../config.yml')
const configContent = fs.readFileSync(configPath, 'utf8')

// 解析 YAML
const config = yaml.load(configContent)

// 生成 TypeScript 配置
const configCode = `// 此文件由 scripts/generate-config.js 自动生成
// 请勿手动修改此文件

import { reactive } from 'vue'
import type { AppConfig } from './configLoader'

// 从 config.yml 生成的配置
export const appConfig = reactive<AppConfig>({
  ...${JSON.stringify(config, null, 2)},
  footer: {
    ...${JSON.stringify(config.footer || {}, null, 2)},
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
`

// 写入文件
const outputPath = path.join(__dirname, '../src/config/generated.ts')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, configCode)

console.log('✅ 配置已生成到 src/config/generated.ts')
