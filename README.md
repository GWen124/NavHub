# NavHub - 个性化网站导航面板

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
git clone https://github.com/GWen124/NavHub.git
cd NavHub
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
# 网页标题
pageTitle: "Discover. Save. Go."

# 页面主标题文字
pageQuote: "人生寂寞，知己难求。"

# 标签页图标配置
favicon:
  icon: "https://example.com/favicon.ico"
```

#### 背景配置
```yaml
background:
  # Bing 轮播背景开关
  bingWallpaper: false
  # 背景图片或视频
  image: "https://example.com/background.jpg"
  # Bing轮播模式
  bingMode: "localFirst"
```

#### 字体配置
```yaml
fonts:
  # 头部区域字体
  header:
    fontA: "fonts/AnJingChenXinShouJinTi.ttf"  # 中文字体
    fontB: "fonts/brand.ttf"                    # 英文字体
  
  # 中部区域字体
  content:
    category:
      fontA: "fonts/SanJiZhengYaHei-ZhongCu.ttf"
      fontB: "Arial, sans-serif"
    site:
      fontA: "fonts/SanJiZhengYaHei-Xi.ttf"
      fontB: "Arial, sans-serif"
  
  # Footer区域字体
  footer:
    fontA: "fonts/brand.ttf"
    fontB: ""
```

#### 颜色配置
```yaml
colors:
  # 自动变色开关
  autoColor: true
  # 手动颜色设置
  manual:
    header: "#000000"
    cardTitle: "#000000"
    footer: "#000000"
```

## 🎯 使用指南

### 添加新网站

1. **编辑配置文件**
打开 `config.yml` 文件，在相应分类下添加新网站：

```yaml
# 网站配置在 src/config/config.ts 中管理
# 支持分组管理和自动排序
```

2. **保存并刷新**
保存配置文件后，页面会自动重新加载显示新网站

### 自定义主题

1. **修改颜色**
在 `config.yml` 的 `colors` 部分修改颜色值：

```yaml
colors:
  autoColor: false  # 关闭自动变色
  manual:
    header: "#your-color"      # 头部颜色
    cardTitle: "#your-color"    # 卡片标题颜色
    footer: "#your-color"       # 底部颜色
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
│   ├── CategorySection.vue # 分类组件
│   ├── SiteCard.vue    # 网站卡片组件
│   └── ...
├── config/             # 配置相关
│   ├── configLoader.ts # 配置加载器
│   ├── generated.ts    # 生成的配置
│   └── config.ts       # 网站配置
├── utils/              # 工具函数
│   ├── searchEngines.ts # 搜索引擎
│   └── ...
└── views/              # 页面视图
    └── HomeView.vue    # 主页
```

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

本项目采用 MIT 许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

---

**NavHub** - 让网站导航更简单、更美观、更个性化！
