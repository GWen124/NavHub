# Website Hub - 个性化网站导航面板

一个现代化的、高度可定制的网站导航面板，支持多设备响应式设计、自动图标获取、主题定制等功能。

## ✨ 主要特性

### 🎨 视觉设计
- **响应式设计**：完美适配桌面端、平板端、移动端
- **毛玻璃效果**：现代化的半透明背景设计
- **自定义主题**：支持颜色、字体、背景图片等全面定制
- **动画效果**：流畅的过渡动画和交互反馈

### 🔧 功能特性
- **智能侧边栏**：桌面端悬停展开，移动端触摸滑动
- **自动图标获取**：支持多种图标源，自动获取网站图标
- **搜索引擎集成**：内置多种搜索引擎选择
- **配置管理**：YAML格式配置文件，易于编辑
- **字体支持**：支持自定义字体和字体回退

### 📱 设备适配
- **桌面端**：鼠标悬停展开侧边栏，支持键盘导航
- **平板端**：触摸滑动展开/收起侧边栏
- **移动端**：汉堡菜单按钮，全屏侧边栏

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd Website-Hub
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:5173`

### 生产部署

1. **构建项目**
```bash
npm run build
```

2. **部署文件**
将 `dist` 目录中的文件部署到你的Web服务器

## ⚙️ 配置说明

### 配置文件结构

项目使用 `config.yml` 作为主配置文件，支持以下配置项：

#### 基础配置
```yaml
# 页面标题
title: "我的网站导航"

# 页面描述
description: "个性化网站导航面板"

# 作者信息
author: "Your Name"
```

#### 主题配置
```yaml
theme:
  # 主色调
  primaryColor: "#3b82f6"
  # 背景色
  backgroundColor: "#f8fafc"
  # 文字颜色
  textColor: "#1e293b"
```

#### 字体配置
```yaml
fonts:
  # 标题字体
  header:
    fontA: "fonts/custom-font.ttf"  # 中文字体
    fontB: "Arial, sans-serif"      # 英文字体
  
  # 内容字体
  content:
    category:
      fontA: "fonts/category-font.ttf"
      fontB: "Arial, sans-serif"
    site:
      fontA: "fonts/site-font.ttf"
      fontB: "Arial, sans-serif"
```

#### 侧边栏配置
```yaml
sidebar:
  # 字体配置
  fontA: "fonts/sidebar-font.ttf"
  fontB: "Arial, sans-serif"
  # 背景透明度
  backgroundOpacity: 0.3
  # 毛玻璃效果
  blurAmount: 20
  saturation: 150
```

#### 网站配置
```yaml
sites:
  - name: "常用网站"
    sites:
      - name: "Google"
        url: "https://www.google.com"
        icon: "https://www.google.com/favicon.ico"
      - name: "GitHub"
        url: "https://github.com"
        icon: "https://github.com/favicon.ico"
```

### 自动图标配置

项目支持自动获取网站图标，配置如下：

```yaml
autoIcon:
  # 自动图标模式
  mode: 1  # 1: 强制自动获取 2: 智能模式 3: 仅回退
  
  # 图标源配置
  sources:
    - "google"      # Google Favicon
    - "duckduckgo"  # DuckDuckGo
    - "favicon.io"  # Favicon.io
    - "clearbit"    # Clearbit Logo
    - "brandfetch"  # Brandfetch
    - "iconify"     # Iconify
  
  # 缓存配置
  cache:
    enabled: true
    expiry: 7  # 缓存天数
```

## 🎯 使用指南

### 添加新网站

1. **编辑配置文件**
打开 `config.yml` 文件，在 `sites` 部分添加新网站：

```yaml
sites:
  - name: "新分类"
    sites:
      - name: "网站名称"
        url: "https://example.com"
        icon: "https://example.com/favicon.ico"  # 可选，不填会自动获取
```

2. **保存并刷新**
保存配置文件后，页面会自动重新加载显示新网站

### 自定义主题

1. **修改颜色**
在 `config.yml` 的 `theme` 部分修改颜色值：

```yaml
theme:
  primaryColor: "#your-color"      # 主色调
  backgroundColor: "#your-bg"      # 背景色
  textColor: "#your-text"         # 文字颜色
```

2. **添加自定义字体**
将字体文件放入 `public/fonts/` 目录，然后在配置中引用：

```yaml
fonts:
  header:
    fontA: "fonts/your-font.ttf"
```

### 移动端优化

项目已针对移动端进行优化：

- **触摸友好**：按钮大小适合手指点击
- **滑动操作**：平板端支持滑动展开侧边栏
- **响应式布局**：自动适配不同屏幕尺寸

## 🔧 开发指南

### 项目结构

```
src/
├── components/          # Vue组件
│   ├── Sidebar.vue     # 侧边栏组件
│   ├── SiteCard.vue    # 网站卡片组件
│   ├── AutoIcon.vue    # 自动图标组件
│   └── ...
├── config/             # 配置相关
│   ├── configLoader.ts # 配置加载器
│   ├── generated.ts    # 生成的配置
│   └── ...
├── utils/              # 工具函数
│   ├── iconUtils.ts    # 图标工具
│   ├── searchEngines.ts # 搜索引擎
│   └── ...
└── views/              # 页面视图
    └── HomeView.vue    # 主页
```

### 添加新功能

1. **创建组件**
在 `src/components/` 目录下创建新的Vue组件

2. **添加配置**
在 `config.yml` 中添加相关配置项

3. **更新类型定义**
在 `src/config/index.ts` 中添加TypeScript类型定义

### 构建和部署

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

## 🐛 故障排除

### 常见问题

1. **图标不显示**
   - 检查网络连接
   - 确认图标URL有效
   - 查看浏览器控制台错误信息

2. **字体不生效**
   - 确认字体文件路径正确
   - 检查字体文件格式（支持ttf、woff、woff2）
   - 清除浏览器缓存

3. **配置不生效**
   - 检查YAML语法是否正确
   - 确认配置文件保存成功
   - 重启开发服务器

### 调试模式

开发模式下，可以在浏览器控制台查看详细的配置加载和错误信息。

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

## 📞 支持

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-repo/issues)
- 发送邮件至 your-email@example.com

---

**Website Hub** - 让网站导航更简单、更美观、更个性化！
# Docker 构建测试
# 触发 Docker 构建
# 重新触发 Docker 构建
