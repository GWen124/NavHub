# Website Panel

一个现代化的网站导航面板，基于 Vue 3 + TypeScript + Vite 构建。

## 🌟 功能特性

- 🎨 **现代化 UI 设计** - 简洁美观的界面设计
- 📱 **响应式布局** - 完美适配各种设备尺寸
- 🔍 **实时搜索功能** - 快速查找网站
- 🎯 **分类管理** - 清晰的网站分类组织
- ⚙️ **配置化管理** - 通过 YAML 文件轻松配置
- 🌐 **GitHub Pages 部署** - 自动部署到 GitHub Pages
- 🎬 **视频背景支持** - 支持图片和视频背景
- 🌅 **Bing 轮播背景** - 自动获取 Bing 每日图片
- 🎨 **颜色主题** - 可自定义头部、卡片、Footer 颜色
- 📅 **版权信息** - 自动计算版权年份

## 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **图标**: Xicons (Font Awesome)
- **样式**: CSS3 + CSS Variables
- **配置**: YAML

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## ⚙️ 配置说明

项目使用 `config.yml` 文件进行配置，支持以下设置：

### 基本配置

```yaml
# 网页标题
pageTitle: "Website Panel"

# 页面主标题文字
pageQuote: "人生寂寞，知己难求。"
```

### 标签页图标

```yaml
favicon:
  # 图标路径或URL，留空表示使用默认图标
  icon: "https://example.com/favicon.ico"
```

### 颜色配置

```yaml
colors:
  # 头部信息颜色
  headerColor: "#ffffff"
  # 网站卡片标题和网站名称颜色
  cardTitleColor: "#ffffff"
  # Footer 文字信息颜色
  footerColor: "#ffffff"
```

### Footer 信息

```yaml
footer:
  websiteText: "WEBSITE.GW124.TOP"
  websiteUrl: "https://website.gw124.top"
  # 注意：作者信息不可配置，始终保持默认值
```

### 版权信息

```yaml
copyright:
  # 版权开始日期，格式：YYYY-MM-DD
  startDate: "2025-01-01"
  # 是否自动计算年份范围
  autoRange: true
```

### 背景配置

```yaml
background:
  # Bing 轮播背景开关
  bingWallpaper: false
  # 图片或视频路径/URL，留空表示无背景
  # 支持的视频格式: mp4, webm, ogg, avi, mov, wmv, flv, mkv
  image: "https://example.com/background.mp4"
```

## 🚀 部署

### GitHub Pages

项目已配置 GitHub Actions 工作流，自动部署到 `Web` 分支：

1. 推送代码到 `main` 或 `master` 分支
2. GitHub Actions 自动构建并部署到 `Web` 分支
3. 访问 `https://website.gw124.top` 查看网站

### 自定义域名

项目已配置自定义域名 `website.gw124.top`，通过 `CNAME` 文件设置。

## 📁 项目结构

```
src/
├── components/          # Vue 组件
│   ├── SiteCard.vue    # 网站卡片组件
│   ├── CategorySection.vue  # 分类区域组件
│   └── ConfigPanel.vue     # 配置面板组件
├── views/              # 页面视图
│   └── HomeView.vue    # 首页视图
├── stores/             # Pinia 状态管理
│   ├── theme.ts        # 主题管理
│   └── search.ts       # 搜索功能
├── utils/              # 工具函数
│   ├── configLoader.ts # 配置加载器
│   └── icons.ts        # 图标管理
├── assets/             # 静态资源
├── config.ts           # 网站配置
└── main.ts             # 应用入口
```

## 🎨 图标支持

项目支持多种图标类型：

### Xicons (推荐)
```typescript
{
  name: "GitHub",
  url: "https://github.com",
  icon: "xicon:github"
}
```

### Font Awesome
```typescript
{
  name: "VS Code",
  url: "https://code.visualstudio.com",
  icon: "fas fa-code"
}
```

### 外部图片
```typescript
{
  name: "Google Drive",
  url: "https://drive.google.com",
  icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
}
```

### Emoji
```typescript
{
  name: "Slack",
  url: "https://slack.com",
  icon: "💬"
}
```

### 文字图标
```typescript
{
  name: "Trello",
  url: "https://trello.com",
  icon: "T"
}
```

## 🔧 开发指南

### 添加新网站

在 `src/config.ts` 中的相应分类下添加新的网站配置：

```typescript
{
  name: "网站名称",
  url: "https://example.com",
  icon: "xicon:github" // 或其他图标类型
}
```

### 添加新图标

1. 在 `src/utils/icons.ts` 中导入新图标
2. 添加到 `iconMap` 映射中
3. 在配置中使用 `xicon:图标名称`

### 自定义样式

项目使用 CSS Variables 进行主题管理，可以在 `config.yml` 中配置颜色：

```yaml
colors:
  headerColor: "#333333"
  cardTitleColor: "#333333"
  footerColor: "#000000"
```

## 📝 更新日志

### v1.0.0 (2025-01-01)
- ✨ 初始版本发布
- 🎨 现代化 UI 设计
- 📱 响应式布局
- 🔍 实时搜索功能
- ⚙️ 配置化管理
- 🌐 GitHub Pages 部署
- 🎬 视频背景支持
- 🌅 Bing 轮播背景
- 🎨 颜色主题自定义

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 网站: [website.gw124.top](https://website.gw124.top)
- GitHub: [@GWen124](https://github.com/GWen124)
- 邮箱: [联系我](mailto:your-email@example.com)

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [Xicons](https://www.xicons.org/) - 图标库
- [Font Awesome](https://fontawesome.com/) - 图标库

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
