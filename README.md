# Website Panel

一个现代化的网站导航面板，基于 Vue 3 + TypeScript + Vite 构建，支持自定义字体、自动图标获取、Bing 壁纸轮播等功能。

## ✨ 功能特性

### 🎨 视觉设计
- **响应式布局**：完美适配桌面、平板、手机等各种设备
- **智能颜色切换**：根据背景亮度自动切换文字颜色（黑白）
- **Bing 壁纸轮播**：支持每日 Bing 壁纸自动轮播
- **自定义背景**：支持图片和视频背景
- **时间日期显示**：实时显示当前时间和日期

### 🔤 字体系统
- **A/B 字体配置**：支持中英文字体分别配置
- **智能字体选择**：中文字符优先使用 A 字体，英文数字优先使用 B 字体
- **本地/远程字体**：支持本地字体文件和远程字体 URL
- **字体粗细控制**：支持字体大小和粗细自定义

### 🎯 自动图标
- **智能图标获取**：自动为网站获取高质量图标
- **多服务商支持**：集成多个图标服务提供商
- **图标缓存**：获取的图标永久缓存，避免重复请求
- **优先级匹配**：方形图标 > 圆形图标 > 其他形状，高清优先

### 🔍 搜索功能
- **多搜索引擎**：支持 Google、百度、Bing、DuckDuckGo、GitHub、Stack Overflow、YouTube、知乎
- **本地搜索**：支持网站名称和分组名称搜索
- **搜索框动画**：优雅的搜索框展开动画

### ⚙️ 配置管理
- **YAML 配置**：使用 YAML 格式进行配置管理
- **热重载**：开发环境下配置变更自动重载
- **生产优化**：生产环境使用嵌入配置，无需外部文件

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
# 启动开发服务器（支持配置热重载）
npm run dev:watch

# 或使用普通开发模式
npm run dev
```

### 构建部署
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📝 配置说明

### 基础配置

#### 页面信息
```yaml
# 页面标题
pageTitle: "Website Panel"

# 页面副标题
pageQuote: "人生寂寞，知己难求。"

# 标签页图标
favicon:
  icon: "https://example.com/favicon.ico"
```

#### 时间日期模块
```yaml
timeDate:
  # 是否显示时间日期模块
  enabled: true
```

#### 背景设置
```yaml
background:
  # 自定义背景图片/视频
  image: "https://example.com/background.mp4"
  
  # 是否启用 Bing 壁纸轮播
  bingWallpaper: true
  
  # Bing 壁纸模式
  bingMode: "localFirst"  # "localFirst" | "direct"
```

### 字体配置

#### 头部字体
```yaml
fonts:
  header:
    # A字体：汉字优先级高
    fontA: "fonts/AnJingChenXinShouJinTi.ttf"
    # B字体：英文和数字优先级高
    fontB: "fonts/brand.ttf"
    size: ""
    weight: ""
```

#### 中部区域字体
```yaml
fonts:
  content:
    # 分组标题字体
    category:
      fontA: "fonts/SanJiZhengYaHei-ZhongCu.ttf"
      fontB: ""
    # 网站卡片标题字体
    site:
      fontA: "fonts/SanJiZhengYaHei-Xi.ttf"
      fontB: ""
```

#### Footer 字体
```yaml
fonts:
  footer:
    fontA: "https://raw.githubusercontent.com/example/font.ttf"
    fontB: ""
```

### 颜色配置

```yaml
colors:
  # 自动颜色切换
  autoColor: true
  
  # 手动颜色设置（仅在 autoColor: false 时生效）
  manual:
    header: "#000000"
    cardTitle: "#000000"
    footer: "#666666"
```

### 自动图标配置

```yaml
autoIcon:
  # 自动图标模式
  mode: 3  # 1: 强制所有网站自动获取 | 2: 空图标自动获取 | 3: 非本地/链接图标自动获取
  
  # 图标服务商优先级（按顺序）
  services:
    - "Google Favicon"
    - "DuckDuckGo Favicon"
    - "Favicon.io"
    - "icon.horse"
    - "Clearbit"
    - "Brandfetch"
    - "Logo.dev"
    - "Simple Icons"
    - "Iconify"
    - "Iconfont"
    - "xicon"
    - "Font Awesome"
    - "文字图标"
```

## 🎨 自定义指南

### 添加网站
在 `src/config.ts` 中添加网站配置：

```typescript
{
  name: "网站名称",
  url: "https://example.com",
  icon: ""  // 留空自动获取图标
}
```

### 添加分组
在 `src/config.ts` 中添加分组配置：

```typescript
{
  name: "分组名称",
  sites: [
    // 网站列表
  ]
}
```

### 自定义字体
1. 将字体文件放入 `public/fonts/` 目录
2. 在 `config.yml` 中配置字体路径
3. 支持本地字体和远程字体 URL

### 自定义背景
- **图片背景**：设置 `background.image` 为图片 URL
- **视频背景**：设置 `background.image` 为视频 URL（支持 .mp4, .webm, .ogg）
- **Bing 壁纸**：设置 `background.bingWallpaper: true`

## 🔧 开发指南

### 项目结构
```
Website Panel/
├── public/                 # 静态资源
│   ├── fonts/             # 字体文件
│   └── favicon.ico        # 网站图标
├── src/
│   ├── components/        # Vue 组件
│   │   ├── AutoIcon.vue   # 自动图标组件
│   │   ├── SiteCard.vue   # 网站卡片组件
│   │   ├── CategorySection.vue  # 分组组件
│   │   └── SearchEngineSelector.vue  # 搜索引擎选择器
│   ├── config/            # 配置管理
│   │   ├── configLoader.ts    # 配置加载器
│   │   ├── generated.ts       # 生成的配置
│   │   └── autoIconConfigLoader.ts  # 自动图标配置
│   ├── views/             # 页面视图
│   │   └── HomeView.vue   # 主页
│   └── App.vue            # 根组件
├── config.yml            # 配置文件
└── scripts/              # 构建脚本
    ├── generate-config.js    # 配置生成脚本
    └── watch-config.js       # 配置监听脚本
```

### 核心组件

#### AutoIcon 组件
负责自动获取网站图标，支持多种图标服务商和智能匹配。

#### SiteCard 组件
显示单个网站卡片，支持图标显示和点击跳转。

#### CategorySection 组件
显示网站分组，包含分组标题和网站列表。

#### SearchEngineSelector 组件
提供搜索引擎选择功能，支持多种搜索引擎。

### 配置系统

#### 开发环境
- 从 `config.yml` 动态加载配置
- 支持配置热重载
- 配置变更自动重启开发服务器

#### 生产环境
- 配置嵌入到构建产物中
- 无需外部配置文件
- 更快的加载速度

## 🚀 部署指南

### GitHub Pages 部署
1. 构建项目：`npm run build`
2. 将 `dist` 目录内容推送到 GitHub Pages
3. 配置 GitHub Pages 源为 `main` 分支的 `dist` 目录

### 其他平台部署
1. 构建项目：`npm run build`
2. 将 `dist` 目录内容上传到服务器
3. 配置 Web 服务器指向 `dist` 目录

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [xicons](https://xicons.org/) - Vue 图标库
- [Font Awesome](https://fontawesome.com/) - 图标库

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [创建 Issue](https://github.com/your-username/website-panel/issues)
- Email: your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！