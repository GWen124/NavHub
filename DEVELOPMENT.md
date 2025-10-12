# 开发指南

## 📋 目录
- [开发环境搭建](#开发环境搭建)
- [项目结构](#项目结构)
- [核心组件](#核心组件)
- [配置系统](#配置系统)
- [构建部署](#构建部署)
- [代码规范](#代码规范)
- [调试技巧](#调试技巧)

## 开发环境搭建

### 环境要求
- **Node.js**: 16.0+ 
- **npm**: 8.0+ 或 **yarn**: 1.22+
- **Git**: 2.0+

### 安装依赖
```bash
# 克隆项目
git clone https://github.com/your-username/website-panel.git
cd website-panel

# 安装依赖
npm install
# 或使用 yarn
yarn install
```

### 开发模式
```bash
# 启动开发服务器（支持配置热重载）
npm run dev:watch

# 或使用普通开发模式
npm run dev
```

### 构建项目
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

## 项目结构

```
Website Panel/
├── public/                     # 静态资源目录
│   ├── fonts/                 # 字体文件目录
│   │   ├── AnJingChenXinShouJinTi.ttf
│   │   ├── SanJiZhengYaHei-Cu.ttf
│   │   ├── SanJiZhengYaHei-Xi.ttf
│   │   ├── SanJiZhengYaHei-ZhongCu.ttf
│   │   └── brand.ttf
│   └── favicon.ico            # 网站图标
├── src/                       # 源代码目录
│   ├── components/            # Vue 组件
│   │   ├── AutoIcon.vue       # 自动图标组件
│   │   ├── SiteCard.vue       # 网站卡片组件
│   │   ├── CategorySection.vue # 分组组件
│   │   ├── SearchEngineSelector.vue # 搜索引擎选择器
│   │   └── ConfigPanel.vue    # 配置面板组件
│   ├── config/                # 配置管理
│   │   ├── configLoader.ts    # 配置加载器
│   │   ├── generated.ts       # 生成的配置
│   │   ├── autoIconConfigLoader.ts # 自动图标配置
│   │   └── searchEngines.ts  # 搜索引擎配置
│   ├── views/                 # 页面视图
│   │   └── HomeView.vue       # 主页视图
│   ├── assets/                # 静态资源
│   │   └── base.css           # 基础样式
│   ├── App.vue                # 根组件
│   └── main.ts                # 入口文件
├── scripts/                   # 构建脚本
│   ├── generate-config.js     # 配置生成脚本
│   └── watch-config.js        # 配置监听脚本
├── config.yml                 # 配置文件
├── package.json               # 项目配置
├── vite.config.ts             # Vite 配置
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目说明
```

## 核心组件

### AutoIcon 组件
负责自动获取网站图标的核心组件。

**功能特性：**
- 多服务商图标获取
- 智能图标匹配
- 图标缓存管理
- 优先级排序

**使用方法：**
```vue
<template>
  <AutoIcon 
    :site="site" 
    :size="32" 
    @icon-loaded="onIconLoaded"
  />
</template>
```

**Props：**
- `site`: 网站对象，包含 name 和 url
- `size`: 图标大小，默认 32px
- `fallback`: 回退图标，默认显示网站名称首字母

**Events：**
- `icon-loaded`: 图标加载完成事件

### SiteCard 组件
显示单个网站卡片的组件。

**功能特性：**
- 响应式设计
- 悬停效果
- 点击跳转
- 图标显示

**使用方法：**
```vue
<template>
  <SiteCard 
    :site="site" 
    :search-query="searchQuery"
  />
</template>
```

**Props：**
- `site`: 网站对象
- `search-query`: 搜索查询，用于高亮匹配

### CategorySection 组件
显示网站分组的组件。

**功能特性：**
- 分组标题显示
- 网站列表展示
- 响应式布局
- 动画效果

**使用方法：**
```vue
<template>
  <CategorySection 
    :category="category" 
    :search-query="searchQuery"
  />
</template>
```

**Props：**
- `category`: 分组对象，包含 name 和 sites
- `search-query`: 搜索查询

### SearchEngineSelector 组件
提供搜索引擎选择功能的组件。

**功能特性：**
- 多搜索引擎支持
- 动画效果
- 键盘导航
- 搜索执行

**使用方法：**
```vue
<template>
  <SearchEngineSelector 
    v-model:current-engine="currentEngine"
    @search="handleSearch"
  />
</template>
```

**Props：**
- `current-engine`: 当前选中的搜索引擎
- `search-engines`: 搜索引擎列表

**Events：**
- `search`: 执行搜索事件

## 配置系统

### 配置加载流程
1. **开发环境**：从 `config.yml` 动态加载
2. **生产环境**：使用嵌入的 `generated.ts` 配置
3. **配置应用**：通过 `applyAllConfigs()` 函数应用所有配置

### 配置类型定义
```typescript
interface AppConfig {
  pageTitle?: string
  pageQuote?: string
  background?: BackgroundConfig
  footer?: FooterConfig
  favicon?: FaviconConfig
  timeDate?: TimeDateConfig
  copyright?: CopyrightConfig
  colors?: ColorsConfig
  fonts?: FontsConfig
  autoIcon?: AutoIconConfig
}
```

### 配置热重载
开发环境下，配置文件变更会自动：
1. 重新解析 `config.yml`
2. 更新 `generated.ts`
3. 重启开发服务器
4. 应用新配置

### 配置验证
配置系统会自动验证：
- 必需字段是否存在
- 数据类型是否正确
- 值是否在有效范围内

## 构建部署

### 构建流程
1. **配置生成**：运行 `generate-config.js` 生成嵌入配置
2. **类型检查**：运行 TypeScript 类型检查
3. **代码构建**：使用 Vite 构建生产版本
4. **资源优化**：压缩和优化静态资源

### 部署选项

#### GitHub Pages
```bash
# 构建项目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

#### 其他平台
```bash
# 构建项目
npm run build

# 将 dist 目录内容上传到服务器
```

### 环境变量
```bash
# 开发环境
NODE_ENV=development

# 生产环境
NODE_ENV=production
```

## 代码规范

### TypeScript 规范
- 使用严格的类型检查
- 避免使用 `any` 类型
- 使用接口定义数据结构
- 使用枚举定义常量

### Vue 组件规范
- 使用 Composition API
- 组件名使用 PascalCase
- Props 使用 TypeScript 接口定义
- 事件名使用 kebab-case

### CSS 规范
- 使用 CSS 变量
- 使用 BEM 命名规范
- 避免使用内联样式
- 使用响应式设计

### 文件命名规范
- 组件文件使用 PascalCase：`SiteCard.vue`
- 工具文件使用 camelCase：`configLoader.ts`
- 配置文件使用 kebab-case：`config.yml`

## 调试技巧

### 浏览器调试
1. **开发者工具**：使用 F12 打开开发者工具
2. **控制台日志**：查看应用运行状态
3. **网络面板**：检查资源加载情况
4. **元素检查**：查看 DOM 结构和样式

### 代码调试
1. **断点调试**：在关键位置设置断点
2. **日志输出**：使用 `console.log` 输出调试信息
3. **错误捕获**：使用 try-catch 捕获错误
4. **性能分析**：使用 Performance API 分析性能

### 常见问题调试

#### 字体不显示
```javascript
// 检查字体是否加载
document.fonts.ready.then(() => {
  console.log('字体加载完成')
})

// 检查字体是否可用
const isLoaded = document.fonts.check('16px "FontName"')
console.log('字体是否可用:', isLoaded)
```

#### 图标不显示
```javascript
// 检查图标 URL 是否可访问
fetch(iconUrl)
  .then(response => {
    if (response.ok) {
      console.log('图标可访问')
    } else {
      console.log('图标不可访问')
    }
  })
```

#### 配置不生效
```javascript
// 检查配置是否正确加载
console.log('当前配置:', appConfig)

// 检查配置是否正确应用
const root = document.documentElement
console.log('CSS 变量:', {
  headerFont: root.style.getPropertyValue('--header-font-family'),
  categoryFont: root.style.getPropertyValue('--category-font-family')
})
```

### 性能优化

#### 字体优化
```typescript
// 预加载字体
const font = new FontFace('FontName', 'url(/fonts/font.ttf)')
font.load().then(() => {
  document.fonts.add(font)
})
```

#### 图标优化
```typescript
// 图标缓存
const iconCache = new Map()
if (iconCache.has(iconUrl)) {
  return iconCache.get(iconUrl)
}
```

#### 配置优化
```typescript
// 配置缓存
const configCache = new Map()
if (configCache.has(configKey)) {
  return configCache.get(configKey)
}
```

## 测试指南

### 单元测试
```bash
# 运行单元测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

### 端到端测试
```bash
# 运行端到端测试
npm run test:e2e
```

### 手动测试
1. **功能测试**：测试所有功能是否正常工作
2. **兼容性测试**：测试不同浏览器的兼容性
3. **性能测试**：测试页面加载速度和响应时间
4. **响应式测试**：测试不同屏幕尺寸的显示效果

## 贡献指南

### 开发流程
1. Fork 项目
2. 创建功能分支
3. 开发功能
4. 编写测试
5. 提交代码
6. 创建 Pull Request

### 代码审查
- 代码质量检查
- 功能完整性检查
- 性能影响评估
- 安全性检查

### 发布流程
1. 更新版本号
2. 更新 CHANGELOG
3. 创建 Release
4. 部署到生产环境

---

如有其他问题，请查看 [README.md](README.md) 或 [CONFIG.md](CONFIG.md)。
