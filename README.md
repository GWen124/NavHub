# Website Panel

一个现代化的网站导航面板，支持自定义网站、自动图标获取、搜索引擎集成等功能。

## ✨ 功能特性

### 🎨 界面设计
- **响应式设计**：完美适配桌面端、平板端、移动端
- **现代化UI**：简洁美观的卡片式布局
- **自适应布局**：智能调整卡片大小和排列
- **深色/浅色主题**：自动根据背景亮度切换文字颜色

### 🔍 搜索引擎集成
- **多引擎支持**：Google、百度、必应、DuckDuckGo、GitHub、Stack Overflow、YouTube、知乎
- **智能搜索**：支持本地网站搜索和搜索引擎搜索
- **搜索历史**：自动保存搜索记录
- **快捷键支持**：Enter键快速搜索

### 🎯 自动图标系统
- **智能获取**：自动从多个服务商获取高质量图标
- **多种模式**：
  - 模式1：强制所有网站自动获取图标
  - 模式2：网站图标为空时自动获取
  - 模式3：非本地或链接图标自动获取（智能回退）
- **图标缓存**：永久缓存获取的图标，提升加载速度
- **质量优先**：优先选择高清、方形图标

### 🌅 背景系统
- **自定义背景**：支持图片和视频背景
- **Bing轮播**：每日自动更新Bing精美图片
- **智能切换**：根据背景亮度自动调整文字颜色
- **性能优化**：智能缓存和懒加载

### 📱 移动端优化
- **触摸友好**：优化的触摸交互体验
- **手势支持**：支持滑动和点击操作
- **性能优化**：针对移动设备的性能优化

## 🚀 快速开始

### 环境要求
- Node.js 16.0+
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

### 预览生产版本
```bash
npm run preview
```

## ⚙️ 配置说明

### 基础配置 (config.yml)

```yaml
# 页面标题
pageTitle: "Website Panel"

# 页面图标
favicon:
  icon: "https://example.com/favicon.ico"

# 页面引用
pageQuote: "Website Panel"

# 页脚配置
footer:
  websiteText: "WEBSITE.GW124.TOP"
  websiteUrl: "https://gw124.top"
  authorText: "Wen"
  authorUrl: "https://github.com/GWen124"

# 版权信息
copyright:
  startDate: "2025-10-01"
  autoRange: false

# 背景配置
background:
  # Bing轮播背景开关
  bingWallpaper: false
  # 自定义背景图片/视频
  image: "https://example.com/background.jpg"
  # Bing轮播模式
  bingMode: "localFirst" # "localFirst" | "direct"

# 颜色配置
colors:
  # 自动颜色切换
  autoColor: true
  # 手动颜色设置
  manual:
    header: "#000000"
    cardTitle: "#000000"
    footer: "#000000"

# 自动图标配置
autoIcon:
  # 自动图标模式
  mode: 3 # 1 | 2 | 3
```

### 网站配置 (src/config.ts)

```typescript
export default [
  {
    name: "Favorites - 常用网站",
    sites: [
      {
        name: "Google",
        url: "https://www.google.com",
        icon: "" // 留空自动获取
      }
    ]
  }
]
```

## 🎨 自定义主题

### 颜色配置
- **自动模式**：根据背景亮度自动切换文字颜色
- **手动模式**：自定义标题、卡片、页脚颜色

### 背景配置
- **图片背景**：支持本地和网络图片
- **视频背景**：支持MP4格式视频
- **Bing轮播**：每日自动更新精美图片

## 🔧 高级功能

### 自动图标系统
支持多种图标获取方式：
1. **直接获取**：从网站直接获取favicon
2. **服务商获取**：从Clearbit、Google、DuckDuckGo等服务商获取
3. **图标库获取**：从xicons、Font Awesome等图标库获取
4. **文字图标**：自动生成文字图标作为备选

### 搜索引擎集成
- **本地搜索**：搜索网站名称和分类
- **网络搜索**：集成8个主流搜索引擎
- **搜索历史**：自动保存和显示搜索记录

### 响应式设计
- **桌面端**：多列网格布局，最佳浏览体验
- **平板端**：自适应列数，触摸友好
- **移动端**：单列布局，优化触摸操作

## 📱 移动端特性

### 触摸优化
- **大按钮设计**：适合手指点击
- **滑动支持**：支持上下滑动浏览
- **手势识别**：智能识别触摸操作

### 性能优化
- **懒加载**：按需加载图片和资源
- **缓存机制**：智能缓存提升加载速度
- **压缩优化**：自动压缩和优化资源

## 🛠️ 开发指南

### 项目结构
```
src/
├── components/          # Vue组件
│   ├── AutoIcon.vue    # 自动图标组件
│   ├── SiteCard.vue    # 网站卡片组件
│   └── ...
├── config/             # 配置文件
│   ├── configLoader.ts # 配置加载器
│   └── generated.ts   # 生成的配置
├── utils/              # 工具函数
├── views/              # 页面视图
└── main.ts            # 入口文件
```

### 添加新网站
1. 编辑 `src/config.ts`
2. 在对应分类下添加网站信息
3. 图标字段留空自动获取

### 自定义样式
- 修改 `src/assets/styles/` 下的CSS文件
- 使用CSS变量进行主题定制
- 支持响应式断点自定义

## 🚀 部署指南

### GitHub Pages
1. 构建项目：`npm run build`
2. 推送dist目录到gh-pages分支
3. 在GitHub仓库设置中启用Pages

### Vercel部署
1. 连接GitHub仓库
2. 设置构建命令：`npm run build`
3. 设置输出目录：`dist`
4. 自动部署

### Netlify部署
1. 连接GitHub仓库
2. 设置构建命令：`npm run build`
3. 设置发布目录：`dist`
4. 自动部署

## 🔍 故障排除

### 常见问题
1. **图标不显示**：检查网络连接，尝试刷新页面
2. **搜索不工作**：检查搜索引擎配置
3. **背景不显示**：检查图片URL是否有效
4. **移动端显示异常**：清除浏览器缓存

### 调试模式
- 打开浏览器开发者工具
- 查看控制台错误信息
- 检查网络请求状态

## 📄 许可证

MIT License

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📞 支持

如有问题或建议，请：
- 提交Issue
- 发送邮件
- 参与讨论

---

**Website Panel** - 让网站导航更简单、更美观、更高效！