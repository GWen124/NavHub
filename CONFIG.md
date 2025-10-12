# 配置说明文档

## 📋 目录
- [基础配置](#基础配置)
- [字体配置](#字体配置)
- [颜色配置](#颜色配置)
- [背景配置](#背景配置)
- [自动图标配置](#自动图标配置)
- [搜索配置](#搜索配置)
- [高级配置](#高级配置)

## 基础配置

### 页面信息
```yaml
# 页面标题（显示在浏览器标签页）
pageTitle: "Website Panel"

# 页面副标题（显示在页面顶部）
pageQuote: "人生寂寞，知己难求。"

# 标签页图标配置
favicon:
  # 图标路径或URL，留空表示使用默认图标
  # 本地图标示例: favicon.ico 或 images/icon.png
  # 网络图标示例: https://example.com/favicon.ico
  icon: "https://image.gw124.top/Avatar/imgbin_a1bee513649d120523b69c8584c25695.png"
```

### 时间日期模块
```yaml
# 时间日期模块配置
timeDate:
  # 是否显示时间日期模块
  # true: 显示时间日期模块
  # false: 隐藏时间日期模块，标题居中显示
  enabled: true
```

### Footer 信息
```yaml
# Footer 信息配置
footer:
  websiteText: "WEBSITE.GW124.TOP"
  websiteUrl: "https://gw124.top"
  # 注意：作者信息不可配置，始终保持默认值
```

### 版权信息
```yaml
# 版权信息配置
copyright:
  # 版权开始日期，格式：YYYY-MM-DD
  startDate: "2025-10-01"
  # 是否自动计算年份范围
  # true: 根据当前日期自动计算显示格式
  # false: 使用固定年份
  autoRange: true
```

## 字体配置

### 字体系统说明
项目支持 A/B 字体系统：
- **A 字体**：优先用于中文字符（中文、日文、韩文等）
- **B 字体**：优先用于英文和数字
- **智能选择**：浏览器会根据字符类型自动选择最合适的字体

### 头部字体配置
```yaml
# 字体配置
fonts:
  # 头部区域字体（主标题、时间、日期、搜索栏）
  header:
    # A字体：汉字优先级高（中文、日文、韩文等）
    # 本地路径示例: fonts/chinese.ttf 或 ./fonts/custom.woff2
    # 远程URL示例: https://github.com/GWen124/HomePage/blob/main/public/fonts/brand.ttf
    # 留空使用系统默认字体
    fontA: "fonts/AnJingChenXinShouJinTi.ttf"
    # B字体：英文和数字优先级高（英文、数字、符号等）
    # 留空则只使用A字体
    # 示例：使用Google Fonts的Roboto字体
    fontB: "fonts/brand.ttf"
    # 字体大小（可选，留空使用默认大小）
    size: ""
    # 字体粗细（可选，留空使用默认粗细）
    weight: ""
```

### 中部区域字体配置
```yaml
  # 中部区域字体（网站分类标题、网站卡片标题）
  content:
    # 分组标题字体
    category:
      # A字体：汉字优先级高
      fontA: "fonts/SanJiZhengYaHei-ZhongCu.ttf"
      # B字体：英文和数字优先级高
      fontB: ""
      size: ""
      weight: ""
    # 网站卡片标题字体
    site:
      # A字体：汉字优先级高
      fontA: "fonts/SanJiZhengYaHei-Xi.ttf"
      # B字体：英文和数字优先级高
      fontB: ""
      size: ""
      weight: ""
```

### Footer 字体配置
```yaml
  # Footer区域字体（版权信息、链接文字）
  footer:
    # A字体：汉字优先级高
    fontA: "https://raw.githubusercontent.com/GWen124/HomePage/main/public/fonts/brand.ttf"
    # B字体：英文和数字优先级高
    fontB: ""
    size: ""
    weight: ""
```

### 字体文件管理
1. **本地字体**：将字体文件放入 `public/fonts/` 目录
2. **远程字体**：使用完整的 URL 地址
3. **字体格式**：支持 TTF、WOFF、WOFF2 等格式
4. **字体加载**：字体会在页面加载时自动加载

## 颜色配置

### 自动颜色模式
```yaml
# 字体颜色配置
colors:
  # 自动变色开关
  # true: 根据背景亮度自动切换黑白文字（优先级最高）
  # false: 使用手动设置的颜色
  autoColor: true
```

### 手动颜色模式
```yaml
colors:
  autoColor: false
  # 手动颜色设置（仅在 autoColor: false 时生效）
  manual:
    # 1. 头部区域颜色（主标题、时间、日期、竖线分割线、搜索栏图标）
    header: "#000000"
    # 2. 中部区域颜色（网站分类标题、网站卡片标题）
    cardTitle: "#000000"
    # 3. Footer区域颜色（版权信息、链接文字）
    footer: "#666666"
```

### 颜色值格式
- **十六进制**：`#000000`、`#ffffff`
- **RGB**：`rgb(0, 0, 0)`、`rgb(255, 255, 255)`
- **RGBA**：`rgba(0, 0, 0, 0.8)`
- **颜色名称**：`black`、`white`、`red`

## 背景配置

### 自定义背景
```yaml
# 背景设置
background:
  # 自定义背景图片/视频
  # 支持格式：
  # - 图片：.jpg, .jpeg, .png, .gif, .webp
  # - 视频：.mp4, .webm, .ogg
  # 留空使用默认白色背景
  image: "https://image.gw124.top/Video/1.mp4"
```

### Bing 壁纸轮播
```yaml
background:
  # 是否启用 Bing 每日壁纸轮播
  bingWallpaper: true
  
  # Bing 壁纸模式
  bingMode: "localFirst"  # "localFirst" | "direct"
  # localFirst: 先显示本地背景，30秒后切换到Bing轮播
  # direct: 直接显示Bing轮播
```

### 背景设置说明
1. **优先级**：Bing 壁纸 > 自定义背景 > 默认背景
2. **视频背景**：支持自动播放、循环播放、静音播放
3. **图片背景**：自动适应屏幕尺寸
4. **轮播间隔**：Bing 壁纸每 30 秒切换一次

## 自动图标配置

### 图标模式说明
```yaml
# 自动图标配置
autoIcon:
  # 自动图标模式
  mode: 3  # 1 | 2 | 3
  # 1: 强制所有网站自动获取图标
  # 2: 空图标自动获取图标
  # 3: 非本地/链接图标自动获取图标
```

### 图标服务商优先级
```yaml
autoIcon:
  # 图标服务商优先级（按顺序执行）
  services:
    - "Google Favicon"      # Google 图标服务
    - "DuckDuckGo Favicon" # DuckDuckGo 图标服务
    - "Favicon.io"         # Favicon.io 服务
    - "icon.horse"         # icon.horse 服务
    - "Clearbit"           # Clearbit 品牌图标
    - "Brandfetch"         # Brandfetch 品牌图标
    - "Logo.dev"           # Logo.dev 服务
    - "Simple Icons"       # Simple Icons 图标库
    - "Iconify"            # Iconify 图标库
    - "Iconfont"           # 阿里巴巴图标库
    - "xicon"              # xicon 图标库
    - "Font Awesome"       # Font Awesome 图标库
    - "文字图标"            # 文字图标（网站名称首字母）
```

### 图标匹配规则
1. **形状优先级**：方形图标 > 圆形图标 > 其他形状
2. **质量优先级**：高清图标 > 普通图标
3. **缓存机制**：获取的图标永久缓存，避免重复请求
4. **智能匹配**：根据网站域名和名称智能匹配图标

## 搜索配置

### 搜索引擎列表
项目内置以下搜索引擎：
- **Google**：`https://www.google.com/search?q=`
- **百度**：`https://www.baidu.com/s?wd=`
- **Bing**：`https://www.bing.com/search?q=`
- **DuckDuckGo**：`https://duckduckgo.com/?q=`
- **GitHub**：`https://github.com/search?q=`
- **Stack Overflow**：`https://stackoverflow.com/search?q=`
- **YouTube**：`https://www.youtube.com/results?search_query=`
- **知乎**：`https://www.zhihu.com/search?q=`

### 搜索功能特性
1. **本地搜索**：支持网站名称和分组名称搜索
2. **搜索引擎切换**：点击搜索框左侧图标切换搜索引擎
3. **搜索历史**：自动保存搜索历史
4. **快捷键支持**：支持 Enter 键搜索

## 高级配置

### 开发环境配置
```yaml
# 开发环境特殊配置
development:
  # 是否启用调试模式
  debug: true
  # 是否显示性能信息
  performance: false
```

### 生产环境优化
```yaml
# 生产环境优化配置
production:
  # 是否启用代码分割
  codeSplitting: true
  # 是否启用资源压缩
  compression: true
  # 是否启用缓存
  caching: true
```

### 性能优化建议
1. **字体优化**：使用 WOFF2 格式字体，启用字体预加载
2. **图片优化**：使用 WebP 格式图片，启用图片懒加载
3. **代码分割**：按需加载组件，减少初始包大小
4. **缓存策略**：合理设置缓存时间，提高加载速度

## 故障排除

### 常见问题

#### 字体不显示
1. 检查字体文件路径是否正确
2. 确认字体文件格式是否支持
3. 检查网络连接（远程字体）

#### 图标不显示
1. 检查网络连接
2. 确认网站 URL 是否正确
3. 尝试手动刷新图标缓存

#### 背景不显示
1. 检查图片/视频 URL 是否可访问
2. 确认文件格式是否支持
3. 检查 CORS 设置

#### 配置不生效
1. 重启开发服务器
2. 清除浏览器缓存
3. 检查配置文件语法

### 调试技巧
1. **浏览器控制台**：查看错误信息和网络请求
2. **开发者工具**：检查元素样式和字体加载
3. **网络面板**：查看资源加载情况
4. **控制台日志**：查看应用运行状态

## 更新日志

### v1.0.0 (2025-01-01)
- 初始版本发布
- 支持基础网站导航功能
- 支持自定义字体配置
- 支持自动图标获取
- 支持 Bing 壁纸轮播

### 后续版本计划
- [ ] 支持更多搜索引擎
- [ ] 支持主题切换
- [ ] 支持数据导入导出
- [ ] 支持多语言界面
- [ ] 支持插件系统

---

如有其他问题，请查看 [README.md](README.md) 或提交 Issue。
