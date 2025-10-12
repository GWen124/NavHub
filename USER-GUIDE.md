# 📖 Website Panel 使用指南

本指南将详细介绍如何使用和配置 Website Panel 的各项功能。

## 目录

- [快速入门](#快速入门)
- [基础配置](#基础配置)
- [字体配置](#字体配置)
- [背景配置](#背景配置)
- [颜色配置](#颜色配置)
- [自动图标配置](#自动图标配置)
- [添加网站](#添加网站)
- [搜索功能](#搜索功能)
- [高级技巧](#高级技巧)
- [常见问题](#常见问题)

## 快速入门

### 1. 安装项目

```bash
# 克隆项目
git clone https://github.com/your-username/website-panel.git
cd website-panel

# 安装依赖
npm install
```

### 2. 启动开发服务器

```bash
# 启动开发服务器（支持配置热重载）
npm run dev:watch
```

访问 http://localhost:5173 查看效果。

### 3. 修改配置

编辑项目根目录的 `config.yml` 文件，保存后页面会自动刷新。

## 基础配置

### 页面标题和副标题

```yaml
# 浏览器标签页标题
pageTitle: "我的导航"

# 页面顶部显示的主标题
pageQuote: "人生寂寞，知己难求。"
```

**效果**：
- `pageTitle` 显示在浏览器标签页
- `pageQuote` 显示在页面顶部中央

### 网站图标（Favicon）

```yaml
favicon:
  # 本地图标
  icon: "favicon.ico"
  
  # 或使用网络图标
  icon: "https://example.com/favicon.ico"
```

**提示**：
- 本地图标放在 `public/` 目录下
- 支持 .ico、.png、.svg 格式
- 推荐尺寸：32x32 或 64x64

### 时间日期模块

```yaml
timeDate:
  # 显示时间日期
  enabled: true
  
  # 隐藏时间日期，主标题居中显示
  enabled: false
```

**效果**：
- `enabled: true`：显示时间、日期和星期
- `enabled: false`：隐藏时间日期，主标题居中

### 版权信息

```yaml
copyright:
  # 起始年份
  year: 2024
  
  # 版权文字
  text: "All rights reserved."
  
  # 自动年份范围
  autoRange: true
```

**显示效果**：
- `autoRange: true`：显示 "© 2024-2025 All rights reserved."
- `autoRange: false`：显示 "© 2024 All rights reserved."

### Footer信息

```yaml
footer:
  # 网站名称
  websiteText: "WEBSITE.GW124.TOP"
  
  # 网站链接
  websiteUrl: "https://gw124.top"
```

**注意**：作者信息（"Designed by GWen"）不可修改。

## 字体配置

### 字体系统说明

Website Panel 使用 A/B 双字体系统：
- **A字体**：主要用于中文字符
- **B字体**：主要用于英文和数字

系统会自动识别字符类型并应用对应字体。

### 头部区域字体

```yaml
fonts:
  header:
    # A字体：中文字体
    fontA: "fonts/AnJingChenXinShouJinTi.ttf"
    
    # B字体：英文数字字体
    fontB: "fonts/brand.ttf"
    
    # 字体大小（可选，留空使用默认）
    size: "24"
    
    # 字体粗细（可选，留空使用默认）
    weight: "bold"
```

**应用范围**：
- 主标题（pageQuote）
- 时间显示（数字使用B字体）
- 日期显示（数字使用B字体，"星期X"使用A字体）

### 中部区域字体

```yaml
fonts:
  content:
    # 分类标题字体
    category:
      fontA: "fonts/SanJiZhengYaHei-ZhongCu.ttf"
      fontB: ""  # 留空则不使用B字体
      size: ""
      weight: ""
    
    # 网站卡片标题字体
    site:
      fontA: "fonts/SanJiZhengYaHei-Xi.ttf"
      fontB: ""
      size: ""
      weight: ""
```

**应用范围**：
- `category`：分类标题（如"常用网站"）
- `site`：网站卡片标题

### 页脚字体

```yaml
fonts:
  footer:
    # 支持远程字体URL
    fontA: "https://example.com/font.ttf"
    fontB: ""
    size: ""
    weight: ""
```

**应用范围**：Footer 区域的所有文字

### 使用本地字体

1. 将字体文件放入 `public/fonts/` 目录
2. 在配置中使用相对路径：

```yaml
fontA: "fonts/your-font.ttf"
```

**支持的字体格式**：
- .ttf (TrueType Font)
- .otf (OpenType Font)
- .woff (Web Open Font Format)
- .woff2 (Web Open Font Format 2)

### 使用远程字体

直接使用完整URL：

```yaml
fontA: "https://example.com/fonts/your-font.ttf"
```

**注意**：远程字体需要支持CORS跨域访问。

### 字体使用技巧

1. **纯中文内容**：只配置 fontA，fontB 留空
2. **纯英文内容**：只配置 fontB，fontA 留空
3. **中英混合**：同时配置 fontA 和 fontB，系统自动识别

**示例**：
```yaml
# 中文标题
category:
  fontA: "fonts/chinese-font.ttf"
  fontB: ""

# 英文标题
category:
  fontA: ""
  fontB: "fonts/english-font.ttf"

# 中英混合
category:
  fontA: "fonts/chinese-font.ttf"
  fontB: "fonts/english-font.ttf"
```

## 背景配置

### 静态图片背景

```yaml
background:
  # 本地图片
  image: "background.jpg"
  
  # 或网络图片
  image: "https://example.com/background.jpg"
  
  bingWallpaper: false
```

**支持的图片格式**：
- .jpg / .jpeg
- .png
- .gif
- .webp

### 视频背景

```yaml
background:
  # 本地视频
  image: "video.mp4"
  
  # 或网络视频
  image: "https://example.com/video.mp4"
  
  bingWallpaper: false
```

**支持的视频格式**：
- .mp4 (推荐)
- .webm
- .ogg

**视频要求**：
- 自动播放、循环播放、静音
- 建议分辨率：1920x1080
- 建议文件大小：< 10MB

### Bing 每日壁纸

```yaml
background:
  image: ""  # 可以留空或设置备用背景
  bingWallpaper: true
  
  # 轮播模式
  bingMode: "localFirst"  # 或 "direct"
```

**bingMode 说明**：
- `localFirst`：先显示 `image` 配置的背景，30秒后切换到Bing壁纸
- `direct`：直接显示Bing壁纸，立即开始轮播

**轮播规则**：
- 每30秒自动切换一张
- 随机选择Bing近期壁纸
- 获取失败时使用 `image` 配置的背景

### 白色背景

```yaml
background:
  image: ""
  bingWallpaper: false
```

将 `image` 留空且 `bingWallpaper` 设为 false，即可使用纯白色背景。

## 颜色配置

### 自动颜色模式（推荐）

```yaml
colors:
  autoColor: true
```

**工作原理**：
- 系统自动检测背景亮度
- 亮色背景：使用黑色文字
- 暗色背景：使用白色文字
- 实时响应背景变化

**适用场景**：
- 使用Bing壁纸轮播
- 背景经常变化
- 不确定背景颜色

### 手动颜色模式

```yaml
colors:
  autoColor: false
  
  manual:
    # 头部文字颜色（主标题、时间、日期）
    header: "#000000"
    
    # 卡片标题颜色（分类标题、网站标题）
    cardTitle: "#000000"
    
    # 页脚文字颜色
    footer: "#666666"
```

**颜色格式**：
- 十六进制：`#000000`、`#fff`
- RGB：`rgb(0, 0, 0)`
- RGBA：`rgba(0, 0, 0, 0.8)`

**使用技巧**：
```yaml
# 深色主题
manual:
  header: "#ffffff"
  cardTitle: "#ffffff"
  footer: "#cccccc"

# 浅色主题
manual:
  header: "#000000"
  cardTitle: "#333333"
  footer: "#666666"

# 彩色主题
manual:
  header: "#ff6b6b"
  cardTitle: "#4ecdc4"
  footer: "#95e1d3"
```

## 自动图标配置

### 自动图标模式

```yaml
autoIcon:
  # 模式选择
  mode: 3
```

**模式说明**：
- `mode: 1` - 强制模式：所有网站都自动获取图标（忽略已配置的图标）
- `mode: 2` - 补充模式：仅为 `icon: ""` 的网站自动获取
- `mode: 3` - 智能模式：为空图标和非本地/链接图标的网站自动获取（推荐）

**选择建议**：
- 首次使用：选择 `mode: 2` 或 `mode: 3`
- 更新图标：选择 `mode: 1`
- 日常使用：选择 `mode: 3`

### 图标服务商配置

```yaml
autoIcon:
  mode: 3
  
  # 服务商优先级（从上到下依次尝试）
  services:
    - "Google Favicon"      # Google图标服务
    - "DuckDuckGo Favicon"  # DuckDuckGo图标服务
    - "Favicon.io"          # Favicon.io服务
    - "icon.horse"          # Icon Horse服务
    - "Clearbit"            # Clearbit Logo API
    - "Brandfetch"          # Brandfetch Logo API
    - "Logo.dev"            # Logo.dev服务
    - "Simple Icons"        # Simple Icons图标库
    - "Iconify"             # Iconify图标库
    - "Iconfont"            # 阿里图标库
    - "xicon"               # xicons图标库
    - "Font Awesome"        # Font Awesome图标库
    - "文字图标"             # 文字图标（首字母）
```

**服务商特点**：
- **Google Favicon**：速度快，覆盖广，推荐首选
- **DuckDuckGo Favicon**：隐私友好，质量高
- **Clearbit**：企业Logo，高清晰度
- **Simple Icons**：品牌图标，SVG格式
- **文字图标**：最终备选，永不失败

**自定义顺序**：
根据需求调整服务商顺序，系统会按顺序尝试，直到成功获取图标。

### 图标缓存管理

访问 `clear-cache.html` 页面管理图标缓存：

```
http://localhost:5173/clear-cache.html
```

**功能**：
- 查看缓存统计（数量、大小）
- 清除所有缓存
- 重新获取图标

## 添加网站

### 基本添加

编辑 `src/config.ts` 文件：

```typescript
export default [
  {
    name: "常用网站",  // 分类名称
    sites: [
      {
        name: "Google",                    // 网站名称
        url: "https://www.google.com",    // 网站链接
        icon: ""                          // 图标（留空自动获取）
      }
    ]
  }
]
```

### 使用自定义图标

#### 方法1：图片URL

```typescript
{
  name: "GitHub",
  url: "https://github.com",
  icon: "https://github.com/favicon.ico"
}
```

#### 方法2：Font Awesome图标

```typescript
{
  name: "GitHub",
  url: "https://github.com",
  icon: "fab fa-github"  // Font Awesome图标类名
}
```

**常用 Font Awesome 图标**：
- `fab fa-github` - GitHub
- `fab fa-google` - Google
- `fab fa-twitter` - Twitter
- `fab fa-facebook` - Facebook
- `fab fa-youtube` - YouTube
- `fas fa-home` - 主页
- `fas fa-envelope` - 邮件
- `fas fa-cog` - 设置

#### 方法3：xicons图标

```typescript
{
  name: "设置",
  url: "/settings",
  icon: "carbon:settings"  // xicons图标名称
}
```

**xicons 格式**：`库名:图标名`
- `carbon:settings` - Carbon设计系统
- `fluent:home-24-regular` - Fluent UI
- `material-symbols:search` - Material Symbols

### 添加多个分类

```typescript
export default [
  {
    name: "常用网站",
    sites: [
      { name: "Google", url: "https://google.com", icon: "" },
      { name: "GitHub", url: "https://github.com", icon: "" }
    ]
  },
  {
    name: "社交媒体",
    sites: [
      { name: "Twitter", url: "https://twitter.com", icon: "fab fa-twitter" },
      { name: "Facebook", url: "https://facebook.com", icon: "fab fa-facebook" }
    ]
  },
  {
    name: "开发工具",
    sites: [
      { name: "VS Code", url: "https://code.visualstudio.com", icon: "" },
      { name: "Stack Overflow", url: "https://stackoverflow.com", icon: "" }
    ]
  }
]
```

### 网站排序

网站按照在数组中的顺序显示，可以通过调整位置来排序：

```typescript
sites: [
  { name: "最常用", url: "...", icon: "" },  // 第一个
  { name: "次常用", url: "...", icon: "" },  // 第二个
  { name: "偶尔用", url: "...", icon: "" }   // 第三个
]
```

## 搜索功能

### 搜索引擎切换

点击搜索框左侧的图标，可以切换搜索引擎：

**支持的搜索引擎**：
1. Google - 全球搜索
2. 百度 - 中文搜索
3. Bing - 微软搜索
4. DuckDuckGo - 隐私搜索
5. GitHub - 代码搜索
6. Stack Overflow - 技术问答
7. YouTube - 视频搜索
8. 知乎 - 中文问答

### 本地搜索

在搜索框输入关键词，系统会自动搜索：
- 网站名称
- 分类名称

**搜索特点**：
- 实时搜索，即时显示结果
- 高亮匹配的关键词
- 支持中英文搜索
- 不区分大小写

### 搜索快捷键

- `Ctrl + K` 或 `Cmd + K`：快速打开搜索框
- `Esc`：关闭搜索框
- `Enter`：使用当前搜索引擎搜索

## 高级技巧

### 1. 混合使用本地和远程资源

```yaml
fonts:
  header:
    fontA: "fonts/local-font.ttf"  # 本地字体
    fontB: "https://example.com/remote-font.ttf"  # 远程字体

background:
  image: "https://example.com/background.mp4"  # 远程视频

favicon:
  icon: "favicon.ico"  # 本地图标
```

### 2. 响应式字体大小

```yaml
fonts:
  header:
    size: "32"  # 桌面端
  content:
    category:
      size: "24"  # 中等
    site:
      size: "16"  # 较小
```

### 3. 图标优先级策略

```yaml
autoIcon:
  mode: 3
  services:
    # 优先使用高质量服务
    - "Clearbit"
    - "Brandfetch"
    # 然后是通用服务
    - "Google Favicon"
    - "DuckDuckGo Favicon"
    # 最后是图标库
    - "Simple Icons"
    - "Font Awesome"
    - "文字图标"
```

### 4. 性能优化

**减少字体文件大小**：
- 使用 .woff2 格式（最小）
- 只包含需要的字符
- 使用字体子集

**优化背景**：
- 图片：压缩后 < 500KB
- 视频：压缩后 < 10MB
- 使用 CDN 加速

**缓存策略**：
- 启用自动图标缓存
- 定期清理无用缓存
- 使用浏览器缓存

### 5. 主题切换

创建多个配置文件：

```bash
config-light.yml  # 浅色主题
config-dark.yml   # 深色主题
config-custom.yml # 自定义主题
```

需要切换时，重命名为 `config.yml` 并重新构建。

## 常见问题

### Q1: 字体不显示怎么办？

**解决方法**：
1. 检查字体文件路径是否正确
2. 确认字体文件在 `public/fonts/` 目录
3. 检查字体文件格式是否支持
4. 查看浏览器控制台是否有错误
5. 尝试使用绝对路径

### Q2: 视频背景不播放？

**解决方法**：
1. 确认视频格式为 .mp4/.webm/.ogg
2. 检查视频URL是否可访问
3. 视频文件不要太大（< 10MB）
4. 确保视频编码格式浏览器支持
5. 检查 `index.html` 中 body 背景是否透明

### Q3: 自动图标获取失败？

**解决方法**：
1. 检查网络连接
2. 尝试切换图标服务商顺序
3. 清除图标缓存后重试
4. 使用手动指定图标
5. 检查网站URL是否正确

### Q4: 配置修改后不生效？

**解决方法**：
1. 开发环境：使用 `npm run dev:watch`
2. 确认配置文件语法正确（YAML格式）
3. 重启开发服务器
4. 清除浏览器缓存
5. 检查浏览器控制台错误

### Q5: 页面显示异常？

**解决方法**：
1. 清除浏览器缓存
2. 使用无痕模式测试
3. 检查浏览器兼容性
4. 更新到最新版本浏览器
5. 查看控制台错误信息

### Q6: Bing壁纸无法加载？

**解决方法**：
1. 检查网络连接
2. 确认可以访问 Bing
3. 尝试使用代理
4. 设置备用背景图片
5. 切换到 `bingMode: "localFirst"`

### Q7: 移动端显示问题？

**解决方法**：
1. 确认使用响应式设计
2. 检查视口设置
3. 测试不同设备尺寸
4. 调整字体大小
5. 优化触摸操作

### Q8: 如何备份配置？

**方法**：
```bash
# 备份配置文件
cp config.yml config.backup.yml

# 备份网站配置
cp src/config.ts src/config.backup.ts

# 备份字体文件
cp -r public/fonts public/fonts.backup
```

### Q9: 如何重置配置？

**方法**：
1. 删除 `config.yml`
2. 从项目模板复制默认配置
3. 或者手动恢复默认值
4. 重启开发服务器

### Q10: 如何提高加载速度？

**优化建议**：
1. 压缩图片和视频
2. 使用 CDN 加速
3. 启用浏览器缓存
4. 减少字体文件大小
5. 优化图标服务商顺序
6. 使用生产构建 `npm run build`

## 获取帮助

如果遇到问题：

1. 查看 [README.md](README.md) 基础文档
2. 查看 [CONFIGURATION.md](CONFIGURATION.md) 配置文档
3. 查看 [AUTO-ICON-GUIDE.md](AUTO-ICON-GUIDE.md) 图标指南
4. 提交 [GitHub Issue](https://github.com/your-username/website-panel/issues)
5. 发送邮件：your-email@example.com

---

**Website Panel** - 让网站导航更简单、更美观、更高效！

