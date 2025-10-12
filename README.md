# 🌐 Website Panel

一个现代化、高度可定制的网站导航面板，基于 Vue 3 + TypeScript + Vite 构建。

[![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ 核心特性

### 🎨 视觉体验
- **响应式设计** - 完美适配桌面、平板、手机
- **智能配色** - 根据背景亮度自动切换文字颜色
- **动态背景** - 支持图片、视频、Bing每日壁纸轮播
- **实时时钟** - 显示当前时间和日期（可开关）
- **流畅动画** - 优雅的过渡效果和交互动画

### 🔤 字体系统
- **A/B字体分离** - 中文使用A字体，英文数字使用B字体
- **智能字体应用** - 自动识别字符类型并应用对应字体
- **多区域配置** - 头部、分类标题、网站标题、页脚独立配置
- **本地/远程支持** - 支持本地字体文件和远程字体URL
- **字重控制** - 自定义字体大小和粗细

### 🎯 自动图标
- **智能获取** - 自动为网站获取高质量图标
- **多源支持** - 集成12+图标服务商
- **永久缓存** - 获取的图标本地缓存，避免重复请求
- **优先级匹配** - 方形 > 圆形，高清优先
- **回退机制** - 自动生成文字图标作为备选

### 🔍 搜索功能
- **多引擎支持** - Google、百度、Bing、DuckDuckGo、GitHub、Stack Overflow、YouTube、知乎
- **本地搜索** - 快速搜索网站名称和分组
- **搜索历史** - 自动保存搜索记录
- **优雅动画** - 搜索框展开/收起动画

### ⚙️ 配置管理
- **YAML配置** - 简单直观的配置格式
- **热重载** - 开发环境配置变更自动生效
- **生产优化** - 配置嵌入构建产物，无需外部文件

## 🚀 快速开始

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装

```bash
# 克隆项目
git clone https://github.com/your-username/website-panel.git
cd website-panel

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器（支持配置热重载）
npm run dev:watch

# 或使用普通开发模式
npm run dev
```

访问 http://localhost:5173

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📝 配置指南

所有配置都在 `config.yml` 文件中完成。

### 基础配置

```yaml
# 页面标题
pageTitle: "Website Panel"

# 页面主标题文字
pageQuote: "人生寂寞，知己难求。"

# 标签页图标
favicon:
  icon: "https://example.com/favicon.ico"

# 时间日期模块
timeDate:
  enabled: true  # true: 显示时间日期 | false: 隐藏并居中标题
```

### 背景配置

```yaml
background:
  # 自定义背景（支持图片和视频）
  # 图片: .jpg, .png, .gif, .webp
  # 视频: .mp4, .webm, .ogg
  image: "https://example.com/background.mp4"
  
  # Bing壁纸轮播
  bingWallpaper: false
  
  # Bing轮播模式
  # "localFirst": 先显示本地背景，30秒后切换到Bing轮播
  # "direct": 直接显示Bing壁纸并开始轮播
  bingMode: "localFirst"
```

### 字体配置

```yaml
fonts:
  # 头部区域（主标题、时间、日期）
  header:
    fontA: "fonts/AnJingChenXinShouJinTi.ttf"  # 中文字体
    fontB: "fonts/brand.ttf"                    # 英文数字字体
    size: ""
    weight: ""
  
  # 中部区域
  content:
    # 分类标题
    category:
      fontA: "fonts/SanJiZhengYaHei-ZhongCu.ttf"
      fontB: ""
    # 网站卡片标题
    site:
      fontA: "fonts/SanJiZhengYaHei-Xi.ttf"
      fontB: ""
  
  # 页脚区域
  footer:
    fontA: "https://example.com/font.ttf"  # 支持远程URL
    fontB: ""
```

### 颜色配置

```yaml
colors:
  # 自动颜色模式（根据背景亮度自动切换黑白）
  autoColor: true
  
  # 手动颜色配置（仅在 autoColor: false 时生效）
  manual:
    header: "#000000"      # 头部文字颜色
    cardTitle: "#000000"   # 卡片标题颜色
    footer: "#666666"      # 页脚文字颜色
```

### 自动图标配置

```yaml
autoIcon:
  # 自动图标模式
  # 1: 强制所有网站自动获取图标
  # 2: 仅为空图标的网站自动获取
  # 3: 为非本地/链接图标的网站自动获取（推荐）
  mode: 3
  
  # 图标服务商优先级（按顺序尝试）
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

### 版权信息配置

```yaml
copyright:
  # 起始年份
  year: 2024
  
  # 版权文字
  text: "All rights reserved."
  
  # 是否自动计算年份范围
  # true: 显示 "2024-2025" 格式
  # false: 只显示起始年份
  autoRange: true
```

### Footer配置

```yaml
footer:
  # 网站信息
  websiteText: "WEBSITE.GW124.TOP"
  websiteUrl: "https://gw124.top"
  
  # 注意：作者信息不可配置，始终保持默认值
```

## 🎨 添加网站

在 `src/config.ts` 中添加网站：

```typescript
export default [
  {
    name: "常用网站",
    sites: [
      {
        name: "Google",
        url: "https://www.google.com",
        icon: ""  // 留空自动获取图标
      },
      {
        name: "GitHub",
        url: "https://github.com",
        icon: "fab fa-github"  // 使用 Font Awesome 图标
      },
      {
        name: "自定义图标",
        url: "https://example.com",
        icon: "https://example.com/icon.png"  // 使用自定义图标URL
      }
    ]
  }
]
```

## 📁 项目结构

```
Website Panel/
├── public/                    # 静态资源
│   ├── fonts/                # 字体文件
│   └── config.yml            # 配置文件（生产环境）
├── src/
│   ├── components/           # Vue组件
│   │   ├── AutoIcon.vue      # 自动图标组件
│   │   ├── SiteCard.vue      # 网站卡片
│   │   ├── CategorySection.vue  # 分类区域
│   │   ├── SearchEngineSelector.vue  # 搜索引擎选择器
│   │   ├── ConfigPanel.vue   # 配置面板
│   │   └── AutoIconConfigPanel.vue  # 自动图标配置面板
│   ├── config/               # 配置管理
│   │   ├── configLoader.ts   # 配置加载器
│   │   ├── generated.ts      # 生成的配置（生产环境）
│   │   ├── autoIconConfig.ts # 自动图标配置
│   │   └── autoIconConfigLoader.ts  # 自动图标配置加载器
│   ├── utils/                # 工具函数
│   │   ├── iconUtils.ts      # 图标工具
│   │   ├── icons.ts          # 图标定义
│   │   ├── xicons.ts         # xicons集成
│   │   └── searchEngines.ts  # 搜索引擎配置
│   ├── stores/               # 状态管理
│   │   ├── theme.ts          # 主题状态
│   │   └── search.ts         # 搜索状态
│   ├── views/                # 页面视图
│   │   └── HomeView.vue      # 主页
│   ├── assets/               # 样式资源
│   │   ├── base.css          # 基础样式
│   │   └── main.css          # 主样式
│   ├── App.vue               # 根组件
│   └── main.ts               # 入口文件
├── scripts/                  # 构建脚本
│   ├── generate-config.js    # 配置生成脚本
│   └── watch-config.js       # 配置监听脚本
├── config.yml                # 配置文件（开发环境）
├── index.html                # HTML入口
├── vite.config.ts            # Vite配置
├── tsconfig.json             # TypeScript配置
└── package.json              # 项目配置
```

## 🔧 高级功能

### 字体系统工作原理

系统使用智能字体栈，根据字符类型自动选择合适的字体：

1. **头部区域**：
   - 时间数字：使用B字体
   - 日期数字：使用B字体
   - 中文文字（如"星期一"）：使用A字体
   - 主标题：混合使用A/B字体

2. **中部区域**：
   - 分类标题：B字体优先（英文数字），A字体备用（中文）
   - 网站标题：B字体优先（英文数字），A字体备用（中文）

3. **页脚区域**：
   - 使用配置的A/B字体组合

### 自动图标系统

图标获取优先级：
1. 配置的自定义图标
2. Font Awesome图标
3. xicons图标库
4. 多个图标服务商（按配置顺序）
5. 文字图标（首字母）

图标缓存机制：
- 获取的图标永久保存在 localStorage
- 支持手动清除缓存
- 缓存统计功能

### 背景系统

支持三种背景模式：
1. **静态图片**：设置 `image` 为图片URL
2. **视频背景**：设置 `image` 为视频URL（.mp4/.webm/.ogg）
3. **Bing壁纸**：启用 `bingWallpaper`，每30秒自动切换

## 🚀 部署指南

### GitHub Pages

```bash
# 1. 构建项目
npm run build

# 2. 进入构建目录
cd dist

# 3. 初始化git并推送
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:username/repo.git main:gh-pages

# 4. 在GitHub仓库设置中启用Pages，选择gh-pages分支
```

### Vercel

1. 导入GitHub仓库
2. 构建命令：`npm run build`
3. 输出目录：`dist`
4. 自动部署

### Netlify

1. 连接GitHub仓库
2. 构建命令：`npm run build`
3. 发布目录：`dist`
4. 自动部署

## 🛠️ 常见问题

### 字体不显示？
1. 检查字体文件路径是否正确
2. 确保字体文件在 `public/fonts/` 目录下
3. 远程字体需要支持CORS

### 视频背景不显示？
1. 检查视频URL是否可访问
2. 确保视频格式为 .mp4/.webm/.ogg
3. 检查浏览器控制台是否有错误

### 图标不显示？
1. 检查网络连接
2. 尝试切换图标服务商
3. 清除图标缓存后重试

### 配置修改不生效？
1. 开发环境：使用 `npm run dev:watch` 自动重载
2. 生产环境：重新构建 `npm run build`
3. 清除浏览器缓存

## 📚 相关文档

- [CONFIGURATION.md](CONFIGURATION.md) - 详细配置说明
- [AUTO-ICON-GUIDE.md](AUTO-ICON-GUIDE.md) - 自动图标使用指南
- [DEVELOPMENT.md](DEVELOPMENT.md) - 开发指南
- [CHANGELOG.md](CHANGELOG.md) - 更新日志

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 创建 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript的超集
- [xicons](https://xicons.org/) - SVG图标集合
- [Font Awesome](https://fontawesome.com/) - 图标库

## 📞 联系方式

- GitHub Issues: [提交问题](https://github.com/your-username/website-panel/issues)
- Email: your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
