#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 从外部 URL 获取配置
async function fetchExternalConfig(url) {
  try {
    console.log(`🌐 正在从外部 URL 拉取配置: ${url}`)
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    if (!Array.isArray(data)) {
      throw new Error('外部配置格式错误：期望数组格式')
    }
    
    console.log(`✅ 成功拉取外部配置，包含 ${data.length} 个分组`)
    return data
  } catch (error) {
    console.error(`❌ 拉取外部配置失败: ${error.message}`)
    return null
  }
}

// 读取 config.yml
const configPath = path.join(__dirname, '../config.yml')
const configContent = fs.readFileSync(configPath, 'utf8')

// 解析 YAML
const config = yaml.load(configContent)

// 处理 footer 第二行链接配置
if (config.footer?.secondLine?.configFile) {
  try {
    const footerLinksPath = path.join(__dirname, '..', config.footer.secondLine.configFile)
    if (fs.existsSync(footerLinksPath)) {
      const footerLinksContent = fs.readFileSync(footerLinksPath, 'utf8')
      const footerLinksData = JSON.parse(footerLinksContent)
      config.footer.secondLine.links = footerLinksData.links
      console.log(`✅ 已从 ${config.footer.secondLine.configFile} 加载 footer 链接配置`)
    } else {
      console.error(`❌ footer 链接配置文件不存在: ${footerLinksPath}`)
      throw new Error(`配置文件不存在: ${config.footer.secondLine.configFile}`)
    }
  } catch (error) {
    console.error(`❌ 加载 footer 链接配置失败:`, error.message)
    process.exit(1) // 配置文件必须存在，否则构建失败
  }
}

// 处理外部配置
let sitesConfigCode = ''
let usingExternalConfig = false

if (config.externalConfig && config.externalConfig.enabled && config.externalConfig.url) {
  console.log('📦 检测到外部配置已启用')
  const externalSites = await fetchExternalConfig(config.externalConfig.url)
  
  if (externalSites && externalSites.length > 0) {
    // 使用外部配置覆盖 src/config.ts
    const externalConfigCode = `// 网站配置数据 (从外部配置生成)
// 构建时间: ${new Date().toISOString()}
// 数据来源: ${config.externalConfig.url}

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

export const config: Category[] = ${JSON.stringify(externalSites, null, 2)}
`
    const configTsPath = path.join(__dirname, '../src/config.ts')
    
    // 备份原始配置（仅第一次）
    const backupPath = path.join(__dirname, '../src/config.ts.backup')
    if (fs.existsSync(configTsPath) && !fs.existsSync(backupPath)) {
      fs.copyFileSync(configTsPath, backupPath)
      console.log('💾 已备份原始 config.ts 到 config.ts.backup')
    }
    
    fs.writeFileSync(configTsPath, externalConfigCode)
    console.log('✅ 已使用外部配置更新 src/config.ts')
    usingExternalConfig = true
  } else {
    console.log('⚠️  外部配置拉取失败，回退到本地 config.ts')
    console.log('💡 将继续使用本地配置文件构建项目')
    
    // 如果存在备份文件，恢复备份
    const configTsPath = path.join(__dirname, '../src/config.ts')
    const backupPath = path.join(__dirname, '../src/config.ts.backup')
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, configTsPath)
      console.log('🔄 已从备份恢复本地配置')
    }
  }
} else {
  console.log('📝 使用本地 config.ts 配置')
}

// 输出配置摘要
console.log('')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('📊 配置摘要:')
console.log(`   配置来源: ${usingExternalConfig ? '外部 URL' : '本地文件'}`)
if (usingExternalConfig) {
  console.log(`   URL: ${config.externalConfig.url}`)
}
console.log(`   分组排序: ${config.categorySorting?.autoSort ? '启用' : '禁用'}`)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('')


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
    authorUrl: "https://gw124.top/"
  }
})

// 导出配置加载函数（保持兼容性）
export async function loadConfig(): Promise<void> {
  // 配置已嵌入，无需加载
}

// 导出其他函数（保持兼容性）
export { applyBackgroundConfig, applyPageTitle, applyFaviconConfig, applyColorsConfig, applyFontsConfig, formatCopyrightYear } from './configLoader'
`

// 写入文件
const outputPath = path.join(__dirname, '../src/config/generated.ts')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, configCode)

console.log('✅ 配置已生成到 src/config/generated.ts')

