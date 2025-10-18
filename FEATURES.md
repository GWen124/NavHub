# NavHub 功能详解

本文档详细介绍NavHub的所有功能特性和使用方法。

## 📑 目录

- [核心功能](#核心功能)
- [界面特性](#界面特性)
- [配置系统](#配置系统)
- [图标管理](#图标管理)
- [搜索功能](#搜索功能)
- [OAuth登录](#oauth登录)
- [高级特性](#高级特性)

---

## 核心功能

### 1. 响应式布局

NavHub采用现代响应式设计，完美适配各种设备：

- **桌面端**（> 1024px）：完整功能，侧边栏悬停展开
- **平板端**（768-1024px）：侧边栏滑动操作，优化触控体验
- **移动端**（< 768px）：汉堡菜单，全屏侧边栏

### 2. 智能侧边栏

#### 桌面端
- 鼠标悬停左侧触发区域自动展开
- 显示所有分组名称和网站数量
- 点击分组名称平滑滚动到对应位置
- 鼠标移开自动收起

#### 平板端
- 支持滑动手势：
  - 从左边缘向右滑：展开侧边栏
  - 从侧边栏向左滑：收起侧边栏
- 点击触发区域切换展开/收起

#### 移动端
- 左上角汉堡菜单按钮
- 全屏侧边栏显示
- 半透明遮罩层
- 点击遮罩或外部区域关闭

### 3. 加载动画

6种精美的加载动画随机显示：

1. **呼吸光环** - 吐纳天地精华
2. **螺旋星系** - 旋转星系之核
3. **心跳律动** - 倾听心跳声音
4. **无限符号** - 无限可能无限精彩
5. **指南针** - 指引方向导航人生
6. **沙漏** - 时光流转不负韶华

每个动画都有：
- 独特的主题文案
- 5个加载阶段提示
- 流畅的动画效果
- 配套的欢迎语

---

## 界面特性

### 1. 背景系统

#### Bing每日壁纸
```yaml
background:
  bingWallpaper: true
  bingMode: "localFirst"  # 或 "direct"
```

- **localFirst**：先显示本地背景30秒，然后切换到Bing壁纸
- **direct**：直接显示Bing壁纸

#### 自定义背景

支持图片和视频：

```yaml
background:
  image: "https://example.com/bg.jpg"
  # 或
  image: "https://example.com/video.mp4"
```

支持的视频格式：
- MP4
- WebM
- OGG
- AVI
- MOV
- WMV
- FLV
- MKV

### 2. 自动变色

根据背景亮度自动切换文字颜色：

```yaml
colors:
  autoColor: true  # 启用自动变色
```

系统会：
1. 分析背景图片/视频的平均亮度
2. 自动选择黑色或白色文字
3. 每3秒检测一次（应对Bing壁纸切换）
4. 添加平滑过渡效果

#### 手动颜色配置

```yaml
colors:
  autoColor: false
  manual:
    header: "#000000"      # 头部区域（主标题、时间、搜索栏）
    cardTitle: "#000000"   # 网站卡片标题
    footer: "#000000"      # Footer区域
```

### 3. 字体系统

支持A/B双字体配置：

```yaml
fonts:
  header:
    fontA: "fonts/AnJingChenXinShouJinTi.ttf"  # 中文字体
    fontB: "fonts/brand.ttf"                    # 英文/数字字体
  content:
    category:
      fontA: "fonts/SanJiZhengYaHei-ZhongCu.ttf"
      fontB: ""
    site:
      fontA: "fonts/SanJiZhengYaHei-Xi.ttf"
      fontB: ""
  footer:
    fontA: "fonts/brand.ttf"
    fontB: ""
  sidebar:
    fontA: "fonts/SanJiZhengYaHei-ZhongCu.ttf"
    fontB: ""
```

**字体优先级**：
- fontB：英文字母、数字、符号
- fontA：中文、日文、韩文等

### 4. 时间日期模块

```yaml
timeDate:
  enabled: true  # 是否显示时间日期
```

显示内容：
- 当前时间（24小时制，实时更新）
- 月-日
- 星期

禁用时，主标题会居中显示。

---

## 配置系统

### 1. 配置文件优先级

**网站配置**（从高到低）：
1. `public/Website.json`
2. `Website.json`（根目录）
3. 外部URL配置
4. `src/config.ts`

**项目配置**：
1. 外部YAML URL
2. `config.yml`

### 2. 网站配置格式

```json
[
  {
    "name": "开发工具",
    "sites": [
      {
        "name": "GitHub",
        "url": "https://github.com",
        "icon": "xicon:github"
      },
      {
        "name": "VS Code",
        "url": "https://code.visualstudio.com",
        "icon": "https://code.visualstudio.com/favicon.ico"
      },
      {
        "name": "Stack Overflow",
        "url": "https://stackoverflow.com",
        "icon": ""  // 自动获取
      }
    ]
  }
]
```

### 3. 外部配置

#### 网站配置
```yaml
externalConfig:
  url: "https://gist.githubusercontent.com/user/xxx/raw/sites.json"
```

#### 项目配置
```yaml
externalProjectConfig:
  url: "https://example.com/config.yml"
```

**特点**：
- 拉取失败自动回退到本地配置
- 支持GitHub Gist、自建API等
- 便于远程管理和多项目共享

### 4. 分组排序

```yaml
categorySorting:
  autoSort: true  # 自动按首字母排序
  pinnedCategories:  # 置顶分组（不参与排序）
    - "Favorites - 常用网站"
  bottomCategories:  # 末尾分组（不参与排序）
    - "Other - 其他"
```

排序规则：
- 置顶分组永远在最前
- 中间分组按首字母排序
- 末尾分组永远在最后

### 5. 网站排序

```yaml
siteSorting:
  mode: 2
```

**模式说明**：
- **1**：混合排序 - 中英文混合，统一按首字母
- **2**：中文在前 - 中文网站在前，英文网站在后，各自按首字母排序
- **3**：保持原序 - 按配置文件中的顺序

### 6. 隐藏分组

通过OAuth登录控制分组可见性：

```json
{
  "name": "🔒 私密网站",
  "sites": [...],
  "hidden": true  // 未登录时隐藏
}
```

---

## 图标管理

### 1. 自动图标模式

```yaml
autoIcon:
  mode: 2
```

**模式说明**：

#### Mode 1：强制所有
- 忽略所有自定义图标
- 所有网站都自动获取图标
- 适合：想统一使用某个图标源

#### Mode 2：空时获取（推荐）
- 保留自定义图标
- 仅当`icon`为空时自动获取
- 适合：部分自定义，部分自动

#### Mode 3：智能回退
- 非本地或链接图标都自动获取
- 获取失败时智能回退：
  1. 服务商API
  2. xicon图标库
  3. Font Awesome
  4. 文字图标

### 2. 图标格式支持

#### 直接URL
```json
{
  "icon": "https://example.com/favicon.ico"
}
```

#### xicon图标库
```json
{
  "icon": "xicon:github"
}
```

可用图标：
- github, gitlab, google, youtube
- facebook, twitter, instagram, linkedin
- apple, microsoft, amazon, netflix
- 等200+图标

#### Font Awesome
```json
{
  "icon": "fa-brands fa-github"
}
```

#### 自动获取
```json
{
  "icon": ""  // 留空
}
```

### 3. 图标获取源

**按优先级排序**：

1. **Google Favicon API**
   - 速度快，成功率高
   - `https://www.google.com/s2/favicons?domain=example.com&sz=128`

2. **DuckDuckGo**
   - 隐私友好
   - `https://icons.duckduckgo.com/ip3/example.com.ico`

3. **Icon Horse**
   - 高质量图标
   - `https://icon.horse/icon/example.com`

4. **Clearbit Logo API**
   - 品牌logo
   - `https://logo.clearbit.com/example.com`

5. **Brandfetch**
   - 企业品牌资产
   - `https://img.brandfetch.io/example.com`

6. **Logo.dev**
   - 开源logo数据库
   - `https://img.logo.dev/example.com?token=pk_xxx`

### 4. 图标缓存

系统自动缓存图标到localStorage：

- 缓存时间：7天
- 自动清理过期缓存
- 提高加载速度
- 减少网络请求

---

## 搜索功能

### 1. 搜索引擎

内置搜索引擎：

| 引擎 | 说明 | 图标 |
|------|------|------|
| Google | 全球最大搜索引擎 | 🔍 |
| Bing | 微软搜索引擎 | 🔎 |
| Baidu | 百度搜索 | 🔎 |
| GitHub | 代码搜索 | 💻 |
| Stack Overflow | 编程问答 | 📚 |
| YouTube | 视频搜索 | 🎥 |
| Wikipedia | 维基百科 | 📖 |
| Reddit | 社区搜索 | 💬 |
| Twitter | 社交搜索 | 🐦 |
| Amazon | 购物搜索 | 🛒 |

### 2. 搜索交互

#### 切换搜索引擎
1. 点击搜索框左侧的引擎图标
2. 从展开的列表中选择
3. 悬停显示引擎名称提示

#### 搜索方式
- **站内搜索**：输入关键词筛选网站
- **引擎搜索**：按回车使用当前搜索引擎

#### 特性
- 实时搜索（输入时即时筛选）
- 支持搜索分组名称
- 高亮匹配结果
- 清除按钮快速重置

---

## OAuth登录

### 1. 功能说明

OAuth登录用于：
- 隐藏私密分组
- 控制访问权限
- 白名单管理

### 2. 配置步骤

#### 1) 创建GitHub OAuth App

访问 https://github.com/settings/developers

创建新的OAuth App：
```
Application name: NavHub
Homepage URL: https://your-domain.com
Authorization callback URL: https://your-domain.com
```

获得：
- Client ID
- Client Secret

#### 2) 部署Cloudflare Worker

```bash
cd cloudflare-worker
npm install
npm run deploy
```

配置环境变量：
```
CLIENT_ID=你的GitHub Client ID
CLIENT_SECRET=你的GitHub Client Secret
ALLOWED_ORIGIN=https://your-domain.com
```

#### 3) 配置NavHub

```yaml
oauth:
  enabled: true
  clientId: "你的GitHub Client ID"
  workerUrl: "https://navhub-oauth.your-username.workers.dev"
  redirectUri: "https://your-domain.com"
  allowedUsers:  # 白名单
    - "GWen124"
    - "user2"
```

### 3. 使用流程

#### 登录
1. 点击Footer的"Login"按钮
2. 跳转到GitHub授权页面
3. 授权后自动返回
4. 显示隐藏分组

#### 登出
1. 点击Footer的"Exit"按钮
2. 确认退出
3. 自动跳转GitHub logout
4. 清除授权状态

### 4. 白名单机制

**未配置白名单**：
```yaml
allowedUsers: []  # 允许所有人登录
```

**配置白名单**：
```yaml
allowedUsers:
  - "user1"
  - "user2"
```
- 只有列表中的用户可以登录
- 非白名单用户会看到权限提示
- 自动跳转到GitHub logout

### 5. 隐藏分组

```json
{
  "name": "🔒 私密网站",
  "hidden": true,
  "sites": [...]
}
```

- `hidden: true`：未登录时隐藏
- 登录后自动显示
- 支持多个隐藏分组

---

## 高级特性

### 1. Service Worker

支持离线访问：

```javascript
// public/sw.js
// 自动缓存静态资源
// 离线时从缓存加载
```

### 2. 自定义域名

```yaml
deployment:
  customDomain: "nav.yourdomain.com"
```

构建时自动生成CNAME文件。

### 3. Footer链接

```json
{
  "links": [
    {
      "name": "GitHub",
      "url": "https://github.com/GWen124",
      "icon": "fa-brands fa-github"
    }
  ]
}
```

支持Font Awesome图标。

### 4. 版权信息

```yaml
copyright:
  startDate: "2025-10-01"
  autoRange: true
```

- `autoRange: true`：自动计算年份范围（如：2025-2026）
- `autoRange: false`：只显示开始年份

### 5. 禁用选中和右键

全站禁用：
- 文本选中（搜索框除外）
- 右键菜单（搜索框除外）

提供更干净的用户体验。

### 6. 页面标题配置

```yaml
pageTitleConfig:
  hideQuote: true  # 是否隐藏主标题
```

- `true`：隐藏"你所喜爱的网站，一站汇聚。"
- `false`：显示主标题

### 7. Footer第二行

```yaml
footer:
  secondLine:
    enabled: true  # 是否显示第二行
```

第二行包含：
- 自定义链接（from footer-links.json）
- OAuth登录按钮（如果启用）

---

## 性能优化

### 1. 图标缓存
- localStorage缓存
- 7天过期时间
- 自动清理机制

### 2. 懒加载
- 图标按需加载
- 外部配置按需拉取
- Service Worker缓存

### 3. 响应式图片
- 根据设备尺寸加载
- 优化图片大小
- 减少带宽消耗

### 4. 代码分割
- Vue组件懒加载
- 路由级代码分割
- 动态import

### 5. 构建优化
- Terser压缩
- Tree Shaking
- CSS提取和压缩

---

## 浏览器兼容性

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| Opera | 76+ | ✅ 完全支持 |

移动端：
- iOS Safari 14+
- Chrome for Android 90+
- Samsung Internet 15+

---

## 常见问题

### 1. 图标不显示？

**解决方案**：
1. 检查网络连接
2. 清除图标缓存：开发者工具 → Application → localStorage
3. 尝试不同的自动图标模式
4. 手动指定图标URL

### 2. OAuth登录失败？

**解决方案**：
1. 检查GitHub OAuth App配置
2. 确认Cloudflare Worker已部署
3. 检查白名单配置
4. 查看浏览器控制台错误信息

### 3. 背景图片不加载？

**解决方案**：
1. 检查图片URL是否可访问
2. 确认CORS设置
3. 尝试使用CDN链接
4. 检查config.yml配置

### 4. 字体不显示？

**解决方案**：
1. 确认字体文件在`public/fonts/`目录
2. 检查字体路径配置
3. 清除浏览器缓存
4. 使用绝对URL

### 5. 分组排序不生效？

**解决方案**：
1. 检查`autoSort`配置
2. 确认分组名称格式
3. 查看是否在置顶/末尾列表中

---

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md)（如有）

---

## 技术栈

- **前端框架**：Vue 3 + TypeScript
- **构建工具**：Vite 7
- **状态管理**：Pinia
- **路由**：Vue Router
- **图标**：Font Awesome + xicons
- **样式**：CSS3 + CSS Variables
- **后端**：Cloudflare Workers（OAuth）

---

<div align="center">

**📖 更多文档**

[README](README.md) | [部署指南](DEPLOYMENT.md) | [开发文档](DEVELOPMENT.md) | [OAuth配置](OAUTH_LOGIN_GUIDE.md)

</div>

