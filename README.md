# Website Panel

一个现代化的网站导航面板，基于 Vue 3 构建，支持 Bing 轮播背景和智能颜色自适应。

## ✨ 特性

- 🎨 **智能颜色自适应**：根据背景亮度自动调整文字颜色
- 🌅 **Bing 轮播背景**：每日图片自动轮播，支持自定义背景
- 🔍 **实时搜索**：快速搜索网站和分类
- 📱 **响应式设计**：完美适配桌面和移动设备
- ⚡ **高性能**：Vue 3 + TypeScript + Vite 构建
- 🎯 **简洁配置**：通过 `config.yml` 轻松自定义

## 🚀 快速开始

### 环境要求

- Node.js 20+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
Website Panel/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── SiteCard.vue    # 网站卡片组件
│   │   ├── CategorySection.vue # 分类区域组件
│   │   └── ConfigPanel.vue # 配置面板组件
│   ├── views/              # 页面视图
│   │   └── HomeView.vue    # 主页视图
│   ├── stores/             # Pinia 状态管理
│   │   ├── search.ts       # 搜索状态
│   │   └── theme.ts        # 主题状态
│   ├── utils/              # 工具函数
│   │   ├── configLoader.ts # 配置加载器
│   │   └── icons.ts        # 图标管理
│   ├── assets/             # 静态资源
│   └── config.ts           # 网站配置
├── config.yml              # 配置文件
├── .github/workflows/      # GitHub Actions
└── README.md
```

## ⚙️ 配置说明

### config.yml 配置

```yaml
# 网页标题
pageTitle: "Website Panel"

# 标签页图标配置
favicon:
  icon: "https://example.com/favicon.ico"

# 页面主标题文字
pageQuote: "人生寂寞，知己难求。"

# Footer 信息配置
footer:
  websiteText: "WEBSITE.GW124.TOP"
  websiteUrl: "https://gw124.top"

# 版权信息配置
copyright:
  startDate: "2025-10-01"
  autoRange: true

# 背景图片配置
background:
  bingWallpaper: true  # 启用 Bing 轮播
  image: "https://example.com/bg.jpg"  # 自定义背景
```

### 配置项说明

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `pageTitle` | string | 网页标题 |
| `favicon.icon` | string | 标签页图标 URL |
| `pageQuote` | string | 主标题文字 |
| `footer.websiteText` | string | Footer 网站文本 |
| `footer.websiteUrl` | string | Footer 网站链接 |
| `copyright.startDate` | string | 版权开始日期 |
| `copyright.autoRange` | boolean | 是否自动计算年份范围 |
| `background.bingWallpaper` | boolean | 是否启用 Bing 轮播 |
| `background.image` | string | 自定义背景图片/视频 URL |

## 🎨 功能特性

### 智能颜色自适应

系统会根据背景亮度自动调整文字颜色：
- 亮背景：黑色文字
- 暗背景：白色文字
- 支持图片和视频背景

### Bing 轮播背景

- 自动获取 Bing 每日图片
- 30秒轮播间隔
- 智能错误处理和重试机制
- 支持自定义背景作为备用

### 图标系统

支持多种图标类型：
- **Xicons**：`xicon:icon-name`
- **Font Awesome**：`fas fa-icon`
- **Emoji**：`😀`
- **外部图片**：`https://example.com/icon.png`
- **文本图标**：`T`

### 搜索功能

- 实时搜索网站名称
- 支持分类过滤
- 高亮显示匹配文本

## 🛠️ 技术栈

- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite
- **类型检查**：TypeScript
- **状态管理**：Pinia
- **路由**：Vue Router
- **图标库**：Xicons (@vicons/fa)
- **样式**：CSS3 + CSS Variables

## 📦 部署

### GitHub Pages

项目配置了 GitHub Actions 自动部署：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建
3. 部署到 `Web` 分支
4. GitHub Pages 自动更新

### 自定义域名

在 `config.yml` 中配置自定义域名，GitHub Actions 会自动生成 `CNAME` 文件。

## 🔧 开发指南

### 添加新网站

在 `src/config.ts` 中添加：

```typescript
{
  name: "网站名称",
  url: "https://example.com",
  icon: "xicon:icon-name" // 或其他图标类型
}
```

### 添加新图标

在 `src/utils/icons.ts` 中：

```typescript
import { NewIcon } from '@vicons/fa'

export const iconMap = {
  // ... 现有图标
  'new-icon': NewIcon
}
```

### 自定义样式

通过 CSS 变量自定义主题：

```css
:root {
  --header-color: #000000;
  --card-title-color: #000000;
  --footer-color: #000000;
  --icon-color: #000000;
}
```

## 🐛 问题排查

### 常见问题

1. **背景不显示**
   - 检查 `config.yml` 中的 `background.image` 配置
   - 确认图片 URL 可访问

2. **图标不显示**
   - 检查图标名称是否正确
   - 确认图标库已正确导入

3. **搜索不工作**
   - 检查网站配置是否正确
   - 确认搜索状态管理正常

### 调试模式

开发模式下可以在浏览器控制台查看详细日志。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- 项目地址：[GitHub](https://github.com/GWen124/Website-Panel)
- 在线演示：[website.gw124.top](https://website.gw124.top)

---

**Website Panel** - 让网站导航更简单、更美观！