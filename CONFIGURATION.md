# 配置指南

## 📋 目录
- [基础配置](#基础配置)
- [网站配置](#网站配置)
- [图标配置](#图标配置)
- [搜索引擎配置](#搜索引擎配置)
- [背景配置](#背景配置)
- [颜色配置](#颜色配置)
- [高级配置](#高级配置)

## 🔧 基础配置

### 页面信息
```yaml
# 页面标题
pageTitle: "Website Panel"

# 页面图标
favicon:
  icon: "https://example.com/favicon.ico"

# 页面引用
pageQuote: "Website Panel"
```

### 页脚配置
```yaml
footer:
  websiteText: "WEBSITE.GW124.TOP"
  websiteUrl: "https://gw124.top"
  authorText: "Wen"
  authorUrl: "https://github.com/GWen124"
```

### 版权信息
```yaml
copyright:
  startDate: "2025-10-01"  # 版权开始年份
  autoRange: false         # 是否自动计算年份范围
```

## 🌐 网站配置

### 基本结构
```typescript
export default [
  {
    name: "分类名称",
    sites: [
      {
        name: "网站名称",
        url: "https://example.com",
        icon: "" // 留空自动获取
      }
    ]
  }
]
```

### 网站属性
- **name**: 网站显示名称
- **url**: 网站链接地址
- **icon**: 图标地址（留空自动获取）

### 分类管理
- 支持无限层级分类
- 每个分类可包含多个网站
- 支持分类重命名和排序

## 🎨 图标配置

### 自动图标模式
```yaml
autoIcon:
  mode: 3  # 1 | 2 | 3
```

#### 模式说明
- **模式1**: 强制所有网站自动获取图标
- **模式2**: 网站图标为空时自动获取
- **模式3**: 非本地或链接图标自动获取（智能回退）

### 图标获取优先级
1. **直接获取**: 从网站直接获取favicon
2. **服务商获取**: Clearbit、Google、DuckDuckGo等
3. **图标库获取**: xicons、Font Awesome等
4. **文字图标**: 自动生成文字图标

### 图标质量设置
- **形状优先级**: 方形 > 圆形 > 其他
- **质量优先级**: 高清 > 普通 > 任意
- **缓存设置**: 永久缓存获取的图标

## 🔍 搜索引擎配置

### 支持的搜索引擎
- Google
- 百度
- 必应
- DuckDuckGo
- GitHub
- Stack Overflow
- YouTube
- 知乎

### 搜索功能
- **本地搜索**: 搜索网站名称和分类
- **网络搜索**: 使用选定的搜索引擎
- **搜索历史**: 自动保存搜索记录

## 🌅 背景配置

### 基础设置
```yaml
background:
  # Bing轮播背景开关
  bingWallpaper: false
  # 自定义背景图片/视频
  image: "https://example.com/background.jpg"
  # Bing轮播模式
  bingMode: "localFirst" # "localFirst" | "direct"
```

### 背景类型
- **图片背景**: 支持JPG、PNG、GIF格式
- **视频背景**: 支持MP4格式
- **Bing轮播**: 每日自动更新精美图片

### Bing轮播模式
- **localFirst**: 先显示本地背景，30秒后切换到Bing轮播
- **direct**: 直接显示Bing轮播，不显示本地背景

## 🎨 颜色配置

### 自动颜色
```yaml
colors:
  autoColor: true  # 根据背景亮度自动切换
```

### 手动颜色
```yaml
colors:
  autoColor: false
  manual:
    header: "#000000"      # 标题颜色
    cardTitle: "#000000"   # 卡片标题颜色
    footer: "#000000"      # 页脚颜色
```

### 颜色格式
- **十六进制**: #000000
- **RGB**: rgb(0, 0, 0)
- **RGBA**: rgba(0, 0, 0, 0.5)
- **颜色名称**: black, white, red等

## ⚙️ 高级配置

### 性能优化
- **图标缓存**: 永久缓存获取的图标
- **懒加载**: 按需加载图片和资源
- **压缩优化**: 自动压缩和优化资源

### 响应式设置
- **桌面端**: 多列网格布局
- **平板端**: 自适应列数
- **移动端**: 单列布局

### 调试模式
- 开启浏览器开发者工具
- 查看控制台日志
- 检查网络请求状态

## 🔧 自定义配置

### 添加新网站
1. 编辑 `src/config.ts`
2. 在对应分类下添加网站信息
3. 图标字段留空自动获取

### 自定义样式
- 修改 `src/assets/styles/` 下的CSS文件
- 使用CSS变量进行主题定制
- 支持响应式断点自定义

### 添加新搜索引擎
1. 编辑 `src/utils/searchEngines.ts`
2. 添加搜索引擎配置
3. 更新搜索逻辑

## 📱 移动端配置

### 触摸优化
- **大按钮设计**: 适合手指点击
- **滑动支持**: 支持上下滑动浏览
- **手势识别**: 智能识别触摸操作

### 性能优化
- **懒加载**: 按需加载图片和资源
- **缓存机制**: 智能缓存提升加载速度
- **压缩优化**: 自动压缩和优化资源

## 🚀 部署配置

### 构建配置
```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 环境变量
```bash
# 开发环境
NODE_ENV=development

# 生产环境
NODE_ENV=production
```

### 部署设置
- **GitHub Pages**: 自动部署到gh-pages分支
- **Vercel**: 自动部署到Vercel平台
- **Netlify**: 自动部署到Netlify平台

## 🔍 故障排除

### 常见问题
1. **图标不显示**: 检查网络连接，尝试刷新页面
2. **搜索不工作**: 检查搜索引擎配置
3. **背景不显示**: 检查图片URL是否有效
4. **移动端显示异常**: 清除浏览器缓存

### 调试步骤
1. 打开浏览器开发者工具
2. 查看控制台错误信息
3. 检查网络请求状态
4. 验证配置文件格式

## 📞 技术支持

如有配置问题，请：
- 查看本文档
- 提交Issue
- 发送邮件
- 参与讨论

---

**配置指南** - 让Website Panel更符合你的需求！
