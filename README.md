# Website Panel - 个人导航面板

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

一个现代化、高度可定制的个人网站导航面板，支持自动图标获取、智能搜索、主题切换等功能。

[在线演示](https://gwen124.github.io/Website-Panel/) | [功能特性](#功能特性) | [快速开始](#快速开始) | [配置指南](#配置指南)

</div>

---

## ✨ 功能特性

### 🎨 界面与主题
- **响应式设计** - 完美适配桌面端和移动端
- **自适应主题** - 根据背景亮度自动调整文字颜色
- **自定义背景** - 支持图片、视频、Bing 每日壁纸
- **字体定制** - 支持自定义标题、内容、页脚字体

### 🔍 搜索功能
- **多搜索引擎** - 集成 Google、Bing、百度等主流搜索引擎
- **智能过滤** - 实时搜索网站和分组
- **快捷切换** - 优雅的搜索引擎切换动画

### 🌐 网站管理
- **分组管理** - 按类别组织网站
- **自动排序** - 支持置顶、末尾、字母排序
- **自动图标** - 智能获取网站图标，支持多种图标源
- **外部配置** - 支持从外部 URL 加载网站配置

### ⚙️ 高度可配置
- **YAML 配置** - 通过 `config.yml` 轻松配置
- **构建时生成** - 配置在构建时嵌入，无需运行时加载
- **类型安全** - 完整的 TypeScript 类型支持

---

## 📸 截图预览

<details>
<summary>点击查看更多截图</summary>

### 桌面端
![Desktop View](./docs/screenshots/desktop.png)

### 移动端
![Mobile View](./docs/screenshots/mobile.png)

### 搜索功能
![Search Feature](./docs/screenshots/search.png)

</details>

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装

```bash
# 克隆项目
git clone https://github.com/GWen124/Website-Panel.git
cd Website-Panel

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:5173
```

### 构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 部署

构建完成后，`dist` 目录包含所有静态文件，可以部署到任何静态托管服务：

- **GitHub Pages** - 推荐，免费且稳定
- **Vercel** - 自动部署，零配置
- **Netlify** - 简单快速
- **自己的服务器** - 使用 Nginx 或 Apache

---

## ⚙️ 配置指南

### 基础配置

所有配置都在 `config.yml` 文件中：

```yaml
# 页面标题
pageTitle: "Website Panel"

# 页面引言
pageQuote: "人生寂寞，知己难求。"

# 背景配置
background:
  image: ""  # 自定义背景图片 URL
  bingWallpaper: false  # 是否使用 Bing 每日壁纸
  bingMode: "localFirst"  # Bing 模式：localFirst 或 direct

# 网站图标
favicon:
  enabled: true
  icon: "https://your-icon-url.png"

# 时间日期
timeDate:
  enabled: true

# 版权信息
copyright:
  startDate: "2025-10-01"
  autoRange: true  # 自动显示年份范围
  text: "All rights reserved."

# 页脚配置
footer:
  enabled: true
  websiteText: "Website Panel"
  websiteUrl: "https://your-website.com"
  authorText: "Your Name"
  authorUrl: "https://github.com/yourusername"
```

### 颜色配置

```yaml
colors:
  autoColor: true  # 自动根据背景调整文字颜色
  manual:  # 手动配置（autoColor 为 false 时生效）
    header: "#000000"
    cardTitle: "#000000"
    footer: "#000000"
```

### 字体配置

```yaml
fonts:
  header:  # 标题字体
    fontA: "/fonts/SanJiZhengYaHei-Xi.ttf"
    fontB: "/fonts/brand.ttf"
    size: "48"
    weight: "700"
  content:
    category:  # 分组标题字体
      fontA: "/fonts/SanJiZhengYaHei-ZhongCu.ttf"
      fontB: "/fonts/brand.ttf"
      size: "24"
      weight: "600"
    site:  # 网站名称字体
      fontA: "/fonts/SanJiZhengYaHei-Xi.ttf"
      fontB: "/fonts/brand.ttf"
      size: "14"
      weight: "400"
  footer:  # 页脚字体
    fontA: ""
    fontB: "/fonts/brand.ttf"
    size: "14"
    weight: "400"
```

### 分组排序

```yaml
categorySorting:
  autoSort: true  # 启用自动排序
  pinnedCategories:  # 置顶分组
    - "Favorites - 常用网站"
  bottomCategories:  # 末尾分组
    - "Other - 其他"
```

### 外部配置

支持从外部 URL 加载网站配置（在构建时拉取）：

```yaml
externalConfig:
  enabled: false  # 是否启用
  url: ""  # 外部配置 JSON 文件 URL
```

**使用步骤：**

1. 生成配置模板：
   ```bash
   # sites-config-template.json 已包含在项目中
   ```

2. 上传到公开 URL（如 GitHub Gist）

3. 在 `config.yml` 中配置：
   ```yaml
   externalConfig:
     enabled: true
     url: "https://gist.githubusercontent.com/.../sites.json"
   ```

4. 构建项目：
   ```bash
   npm run build
   ```

---

## 🌐 网站配置

### 添加网站

编辑 `src/config.ts` 文件：

```typescript
export const config: Category[] = [
  {
    name: "Favorites - 常用网站",
    sites: [
      {
        name: "Google",
        url: "https://www.google.com",
        icon: "",  // 留空自动获取图标
        autoIcon: true  // 强制自动获取
      },
      // 添加更多网站...
    ]
  },
  // 添加更多分组...
]
```

### 图标配置

项目支持多种图标获取方式：

1. **自动获取** - 留空 `icon` 字段，系统自动从多个源获取
2. **手动指定** - 提供完整的图标 URL
3. **CDN 图标** - 使用 jsDelivr 等 CDN 服务

**自动图标源：**
- Google Favicon API
- DuckDuckGo Icons
- Favicon.io
- Clearbit Logo API
- Brandfetch
- Logo.dev
- 等等...

---

## 📁 项目结构

```
Website-Panel/
├── public/              # 静态资源
│   └── fonts/          # 字体文件
├── src/
│   ├── assets/         # 样式和资源
│   ├── components/     # Vue 组件
│   │   ├── CategorySection.vue  # 分组组件
│   │   ├── SiteCard.vue        # 网站卡片
│   │   └── ...
│   ├── config/         # 配置模块
│   │   ├── index.ts           # 配置导出和排序
│   │   ├── configLoader.ts    # 配置加载器
│   │   ├── generated.ts       # 自动生成的配置
│   │   └── autoIconConfig.ts  # 自动图标配置
│   ├── stores/         # Pinia 状态管理
│   ├── utils/          # 工具函数
│   │   ├── searchEngines.ts  # 搜索引擎
│   │   ├── iconUtils.ts       # 图标工具
│   │   └── ...
│   ├── views/          # 页面视图
│   ├── config.ts       # 网站配置
│   └── main.ts         # 入口文件
├── scripts/            # 构建脚本
│   ├── generate-config.js  # 配置生成脚本
│   └── watch-config.js     # 配置监听脚本
├── config.yml          # 主配置文件
├── sites-config-template.json  # 网站配置模板
└── package.json
```

---

## 🛠️ 开发指南

### 添加新功能

1. **添加新组件**
   ```bash
   # 在 src/components/ 创建新组件
   ```

2. **添加新工具函数**
   ```bash
   # 在 src/utils/ 创建工具文件
   ```

3. **添加新配置项**
   ```yaml
   # 在 config.yml 添加配置
   # 在 src/config/configLoader.ts 添加类型定义
   ```

### 构建流程

1. **配置生成** - `scripts/generate-config.js` 读取 `config.yml`
2. **外部配置** - 如果启用，从外部 URL 拉取网站配置
3. **配置排序** - 根据 `categorySorting` 排序分组
4. **类型生成** - 生成 TypeScript 类型定义
5. **Vite 构建** - 打包生成生产文件

### 调试技巧

```bash
# 开发模式（热重载）
npm run dev

# 监听配置变化
npm run watch-config

# 类型检查
npm run type-check

# 代码格式化
npm run format
```

---

## 🎯 最佳实践

### 性能优化

1. **图标缓存** - 自动图标会缓存到 localStorage
2. **懒加载** - 图片和组件按需加载
3. **代码分割** - Vite 自动分割代码块

### 安全建议

1. **HTTPS** - 生产环境使用 HTTPS
2. **CSP** - 配置内容安全策略
3. **图标源** - 使用可信的图标 API

### 维护建议

1. **定期更新** - 保持依赖包最新
2. **备份配置** - 定期备份 `config.yml` 和 `config.ts`
3. **版本控制** - 使用 Git 管理代码

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 添加适当的注释
- 编写清晰的提交信息

---

## 📝 更新日志

### v1.0.0 (2025-10-13)

**新功能**
- ✨ 初始版本发布
- ✨ 支持自定义背景和 Bing 壁纸
- ✨ 智能搜索和多搜索引擎
- ✨ 自动图标获取系统
- ✨ 分组排序功能
- ✨ 外部配置支持
- ✨ 完整的 TypeScript 支持

**优化**
- 🎨 响应式设计优化
- ⚡ 性能优化和代码分割
- 🔧 配置系统重构

---

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

---

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Bing Wallpaper](https://www.bing.com/) - 每日壁纸

---

## 📮 联系方式

- **作者**: Wen
- **GitHub**: [@GWen124](https://github.com/GWen124)
- **网站**: [https://gw124.top](https://gw124.top)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**

Made with ❤️ by [Wen](https://github.com/GWen124)

</div>
