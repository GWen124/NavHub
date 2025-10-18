#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 从外部 URL 获取网站配置
async function fetchExternalConfig(url) {
  try {
    console.log(`🌐 正在从外部 URL 拉取网站配置: ${url}`)
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    if (!Array.isArray(data)) {
      throw new Error('外部网站配置格式错误：期望数组格式')
    }
    
    console.log(`✅ 成功拉取外部网站配置，包含 ${data.length} 个分组`)
    return data
  } catch (error) {
    console.error(`❌ 拉取外部网站配置失败: ${error.message}`)
    return null
  }
}

// 从外部 URL 获取项目配置
async function fetchExternalProjectConfig(url) {
  try {
    console.log(`🌐 正在从外部 URL 拉取项目配置: ${url}`)
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const yamlText = await response.text()
    const data = yaml.load(yamlText)
    
    if (!data || typeof data !== 'object') {
      throw new Error('外部项目配置格式错误：期望YAML对象格式')
    }
    
    console.log(`✅ 成功拉取外部项目配置`)
    return data
  } catch (error) {
    console.error(`❌ 拉取外部项目配置失败: ${error.message}`)
    return null
  }
}

// 读取 config.yml
const configPath = path.join(__dirname, '../config.yml')
const configContent = fs.readFileSync(configPath, 'utf8')

// 解析 YAML
const config = yaml.load(configContent)

// 处理 footer 链接配置
// 统一从 public/footer-links.json 读取，构建时嵌入配置
if (config.footer?.secondLine?.enabled) {
  try {
    const footerLinksPath = path.join(__dirname, '../public/footer-links.json')
    if (fs.existsSync(footerLinksPath)) {
      const footerLinksContent = fs.readFileSync(footerLinksPath, 'utf8')
      const footerLinksData = JSON.parse(footerLinksContent)
      // 将链接数据嵌入到配置中
      if (!config.footer.secondLine) {
        config.footer.secondLine = {}
      }
      config.footer.secondLine.links = footerLinksData.links
      console.log('✅ 已从 public/footer-links.json 加载 footer 链接配置')
    } else {
      console.error('❌ footer 链接配置文件不存在: public/footer-links.json')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ 加载 footer 链接配置失败:', error.message)
    process.exit(1)
  }
}

// 处理外部项目配置
let usingExternalProjectConfig = false
// 保存本地的配置设置
const localExternalConfig = config.externalConfig ? { ...config.externalConfig } : null
const localAutoIcon = config.autoIcon ? { ...config.autoIcon } : null

if (config.externalProjectConfig?.url) {
  console.log('📦 检测到外部项目配置 URL')
  const externalProjectConfig = await fetchExternalProjectConfig(config.externalProjectConfig.url)
  
  if (externalProjectConfig) {
    // 使用外部项目配置覆盖本地配置
    console.log('🔄 使用外部项目配置覆盖本地配置')
    
    // 保存远程项目配置中的 externalConfig 和 autoIcon
    const remoteExternalConfig = externalProjectConfig.externalConfig
    const remoteAutoIcon = externalProjectConfig.autoIcon
    
    Object.assign(config, externalProjectConfig)
    
    // 合并外部网站配置设置（优先使用远程的，如果远程没有或为空则使用本地的）
    if (remoteExternalConfig?.url) {
      config.externalConfig = remoteExternalConfig
      console.log('🔄 使用远程项目配置中的外部网站配置设置')
    } else if (localExternalConfig?.url) {
      config.externalConfig = localExternalConfig
      console.log('🔄 使用本地的外部网站配置设置')
    }
    
    // 合并 autoIcon 配置设置（优先使用远程的，如果远程没有则使用本地的）
    if (remoteAutoIcon) {
      config.autoIcon = remoteAutoIcon
    } else if (localAutoIcon) {
      config.autoIcon = localAutoIcon
    }
    
    usingExternalProjectConfig = true
    
    // 重新加载 footer 链接配置（因为外部配置可能覆盖了 footer）
    if (config.footer?.secondLine?.enabled) {
      try {
        const footerLinksPath = path.join(__dirname, '../public/footer-links.json')
        if (fs.existsSync(footerLinksPath)) {
          const footerLinksContent = fs.readFileSync(footerLinksPath, 'utf8')
          const footerLinksData = JSON.parse(footerLinksContent)
          // 将链接数据嵌入到配置中
          if (!config.footer.secondLine) {
            config.footer.secondLine = {}
          }
          config.footer.secondLine.links = footerLinksData.links
          console.log('✅ 已重新加载 footer 链接配置（外部项目配置覆盖后）')
        }
      } catch (error) {
        console.error('❌ 重新加载 footer 链接配置失败:', error.message)
      }
    }
  } else {
    console.log('⚠️  外部项目配置拉取失败，回退到本地配置')
  }
} else {
  console.log('📝 使用本地项目配置')
}

// 处理外部网站配置
let sitesConfigCode = ''
let usingExternalConfig = false

// 优先级1: 检查 Website.json 文件（支持两个位置）
// 优先检查 public/Website.json（第三方仓库常用），如果不存在则检查根目录
const publicWebsiteJsonPath = path.join(__dirname, '../public/Website.json')
const rootWebsiteJsonPath = path.join(__dirname, '../Website.json')

let localWebsiteJsonPath = null
let websiteJsonSource = ''

if (fs.existsSync(publicWebsiteJsonPath)) {
  localWebsiteJsonPath = publicWebsiteJsonPath
  websiteJsonSource = 'public/Website.json'
} else if (fs.existsSync(rootWebsiteJsonPath)) {
  localWebsiteJsonPath = rootWebsiteJsonPath
  websiteJsonSource = 'Website.json'
}

if (localWebsiteJsonPath) {
  console.log(`📦 检测到本地 ${websiteJsonSource} 文件`)
  try {
    const websiteJsonContent = fs.readFileSync(localWebsiteJsonPath, 'utf8')
    const websiteData = JSON.parse(websiteJsonContent)
    
    if (Array.isArray(websiteData) && websiteData.length > 0) {
      // 使用 Website.json 覆盖 src/config.ts
      const websiteConfigCode = `// 网站配置数据 (从 ${websiteJsonSource} 生成)
// 构建时间: ${new Date().toISOString()}
// 数据来源: ${websiteJsonSource}

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

export const config: Category[] = ${JSON.stringify(websiteData, null, 2)}
`
      const configTsPath = path.join(__dirname, '../src/config.ts')
      
      // 备份原始配置（仅第一次）
      const backupPath = path.join(__dirname, '../src/config.ts.backup')
      if (fs.existsSync(configTsPath) && !fs.existsSync(backupPath)) {
        fs.copyFileSync(configTsPath, backupPath)
        console.log('💾 已备份原始 config.ts 到 config.ts.backup')
      }
      
      fs.writeFileSync(configTsPath, websiteConfigCode)
      console.log(`✅ 已使用 ${websiteJsonSource} 更新 src/config.ts（包含 ${websiteData.length} 个分组）`)
      usingExternalConfig = true
    } else {
      console.error(`❌ ${websiteJsonSource} 格式错误：期望非空数组格式`)
      console.log('💡 将尝试使用其他配置源')
    }
  } catch (error) {
    console.error(`❌ 读取 ${websiteJsonSource} 失败: ${error.message}`)
    console.log('💡 将尝试使用其他配置源')
  }
}

// 优先级2: 如果没有使用 Website.json，检查外部 URL 配置
if (!usingExternalConfig && config.externalConfig?.url) {
  console.log('📦 检测到外部网站配置 URL')
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
    console.log('✅ 已使用外部网站配置更新 src/config.ts')
    usingExternalConfig = true
  } else {
    console.log('⚠️  外部网站配置拉取失败，回退到本地 config.ts')
    console.log('💡 将继续使用本地配置文件构建项目')
    
    // 如果存在备份文件，恢复备份
    const configTsPath = path.join(__dirname, '../src/config.ts')
    const backupPath = path.join(__dirname, '../src/config.ts.backup')
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, configTsPath)
      console.log('🔄 已从备份恢复本地配置')
    }
  }
}

// 优先级3: 使用本地 config.ts
if (!usingExternalConfig) {
  console.log('📝 使用本地 config.ts 配置')
}

// 输出配置摘要
console.log('')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('📊 配置摘要:')
console.log(`   项目配置来源: ${usingExternalProjectConfig ? '外部 URL' : '本地文件'}`)
if (usingExternalProjectConfig) {
  console.log(`   项目配置 URL: ${config.externalProjectConfig.url}`)
}

// 确定网站配置来源
let siteConfigSource = '本地文件'
let siteConfigDetail = ''
if (localWebsiteJsonPath) {
  siteConfigSource = websiteJsonSource
  siteConfigDetail = ''
} else if (usingExternalConfig && config.externalConfig?.url) {
  siteConfigSource = '外部 URL'
  siteConfigDetail = config.externalConfig.url
} else {
  siteConfigSource = '本地文件'
  siteConfigDetail = 'src/config.ts'
}

console.log(`   网站配置来源: ${siteConfigSource}`)
if (siteConfigDetail) {
  console.log(`   网站配置详情: ${siteConfigDetail}`)
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
    authorUrl: "https://github.com/GWen124/NavHub"
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

