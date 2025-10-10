# Website Panel

一个现代化的网站导航面板，基于 Vue 3 + TypeScript 构建，支持动态背景、智能颜色适配和高度自定义。

## ✨ 特性

### 🎨 视觉设计
- **现代化 UI**：简洁的黑白设计风格，灵感来源于 Sun Panel
- **响应式布局**：完美适配桌面和移动设备
- **动态背景**：支持 Bing 每日图片轮播和自定义图片/视频背景
- **智能颜色适配**：根据背景亮度自动切换文字颜色

### 🔧 功能特性
- **实时搜索**：快速查找网站和分类
- **分类管理**：支持多级分类和自定义图标
- **图标系统**：支持 Xicons、Font Awesome、Emoji、外部图片等多种图标类型
- **颜色配置**：支持自动变色和手动颜色设置
- **版权信息**：自动计算版权年份范围

### 🚀 技术特性
- **Vue 3**：使用 Composition API 和 TypeScript
- **Vite**：快速的构建工具和开发服务器
- **Pinia**：现代化的状态管理
- **GitHub Actions**：自动化部署到 GitHub Pages

## 📦 安装和运行

### 环境要求
- Node.js >= 20.19.0
- npm >= 10.0.0

### 本地开发
```bash
# 克隆项目
git clone https://github.com/GWen124/Website-Panel.git
cd Website-Panel

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 部署到 GitHub Pages
项目已配置 GitHub Actions，推送到 `main` 分支后会自动部署到 `Web` 分支。

## ⚙️ 配置说明

### config.yml 配置文件

项目使用 `config.yml` 文件进行配置，支持以下设置：

#### 基础配置
```yaml
# 网页标题
pageTitle: "Website Panel"

# 页面主标题文字
pageQuote: "人生寂寞，知己难求。"

# 标签页图标
favicon:
  icon: "https://example.com/favicon.ico"
```

#### Footer 配置
```yaml
footer:
  websiteText: "WEBSITE.GW124.TOP"
  websiteUrl: "https://gw124.top"
  # 注意：作者信息不可配置，始终保持默认值
```

#### 版权信息配置
```yaml
copyright:
  # 版权开始日期，格式：YYYY-MM-DD
  startDate: "2025-10-01"
  # 是否自动计算年份范围
  autoRange: true
```

#### 背景配置
```yaml
background:
  # Bing 轮播背景开关
  bingWallpaper: true
  # 自定义背景图片/视频
  image: "https://example.com/background.mp4"
```

#### 颜色配置
```yaml
colors:
  # 自动变色开关
  autoColor: true
  # 手动颜色设置（仅在 autoColor: false 时生效）
  manual:
    header: "#000000"      # 头部文字颜色
    cardTitle: "#000000"   # 网站卡片标题颜色
    footer: "#000000"      # Footer文字颜色
```

### 网站配置

网站数据在 `src/config.ts` 中配置：

```typescript
export interface Site {
  name: string
  url: string
  icon: string
}

export interface Category {
  name: string
  sites: Site[]
}

export const config: Category[] = [
  {
    name: "工作工具",
    sites: [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: "xicon:github"
      }
    ]
  }
]
```

## 🎨 图标系统

### 支持的图标类型

#### 1. Xicons (推荐)
```typescript
icon: "xicon:github"        // GitHub 图标
icon: "xicon:stack-overflow" // Stack Overflow 图标
```

#### 2. Font Awesome
```typescript
icon: "fas fa-code"         // 代码图标
icon: "fab fa-github"       // GitHub 品牌图标
```

#### 3. Emoji
```typescript
icon: "emoji:🚀"           // 火箭表情
icon: "emoji:💻"           // 电脑表情
```

#### 4. 外部图片
```typescript
icon: "image:https://example.com/icon.png"
```

#### 5. 文字图标
```typescript
icon: "text:A"             // 显示字母 A
```

### 添加新图标

1. **Xicons 图标**：在 `src/utils/icons.ts` 中添加映射
2. **Font Awesome 图标**：直接使用类名
3. **自定义图标**：使用 `image:` 前缀

## 🔧 开发指南

### 项目结构
```
src/
├── components/          # Vue 组件
│   ├── SiteCard.vue     # 网站卡片组件
│   ├── CategorySection.vue # 分类区域组件
│   └── ConfigPanel.vue # 配置面板组件
├── views/               # 页面视图
│   └── HomeView.vue    # 主页视图
├── stores/              # Pinia 状态管理
│   ├── theme.ts        # 主题状态
│   └── search.ts       # 搜索状态
├── utils/               # 工具函数
│   ├── configLoader.ts # 配置加载器
│   └── icons.ts        # 图标管理
└── config.ts           # 网站配置数据
```

### 核心功能

#### 1. 配置加载 (`configLoader.ts`)
- 加载和解析 `config.yml` 文件
- 应用页面标题、favicon、背景等配置
- 处理 Bing 轮播和自定义背景
- 智能颜色适配

#### 2. 图标管理 (`icons.ts`)
- 统一管理所有图标类型
- 支持动态添加新图标
- 提供图标组件获取函数

#### 3. 搜索功能 (`search.ts`)
- 实时搜索网站和分类
- 支持模糊匹配
- 搜索结果高亮显示

### 自定义开发

#### 添加新的配置项
1. 在 `configLoader.ts` 中定义接口
2. 更新 `defaultConfig` 默认值
3. 在 `parseYaml` 函数中添加解析逻辑
4. 创建应用函数并调用

#### 添加新的图标类型
1. 在 `icons.ts` 中添加识别逻辑
2. 实现渲染函数
3. 更新 `getIconComponent` 函数

## 🚀 部署指南

### GitHub Pages 部署

1. **配置 GitHub Actions**
   - 项目已包含 `.github/workflows/deploy.yml`
   - 自动构建并部署到 `Web` 分支

2. **设置自定义域名**
   - 在 GitHub Pages 设置中添加自定义域名
   - 项目会自动创建 `CNAME` 文件

3. **环境变量**
   - 无需额外配置，使用 GitHub 默认的 `GITHUB_TOKEN`

### 其他部署方式

#### Vercel 部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

#### Netlify 部署
```bash
# 构建项目
npm run build

# 上传 dist 目录到 Netlify
```

## 🔍 故障排除

### 常见问题

#### 1. 背景图片不显示
- 检查图片 URL 是否可访问
- 确认 CORS 设置
- 检查网络连接

#### 2. 图标不显示
- 确认图标名称正确
- 检查图标类型前缀
- 查看浏览器控制台错误

#### 3. 颜色适配不工作
- 检查 `autoColor` 设置
- 确认背景图片加载成功
- 查看控制台错误信息

#### 4. 部署失败
- 检查 GitHub Actions 日志
- 确认 Node.js 版本兼容性
- 检查构建错误

### 调试模式

开发环境下可以启用调试模式：
```typescript
// 在 configLoader.ts 中
const DEBUG = import.meta.env.DEV
if (DEBUG) {
  console.log('Debug info:', data)
}
```

## 📝 更新日志

### v1.0.0 (2025-10-11)
- ✨ 初始版本发布
- 🎨 现代化 UI 设计
- 🔄 Bing 轮播背景支持
- 🎯 智能颜色适配
- ⚙️ 完整的配置系统
- 🚀 GitHub Actions 自动部署

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Xicons](https://www.xicons.org/) - 丰富的图标库
- [Bing](https://www.bing.com/) - 每日图片 API

## 📞 联系方式

- 项目链接：[https://github.com/GWen124/Website-Panel](https://github.com/GWen124/Website-Panel)
- 在线演示：[https://website.gw124.top](https://website.gw124.top)
- 作者：Wen ([@GWen124](https://github.com/GWen124))

---

⭐ 如果这个项目对你有帮助，请给它一个星标！