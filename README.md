# NavHub - 个性化导航主页

<div align="center">

一个现代化、高度可定制的网站导航面板，支持响应式设计、自动图标获取、多种配置方式。

[![GitHub stars](https://img.shields.io/github/stars/GWen124/NavHub?style=social)](https://github.com/GWen124/NavHub)
[![GitHub forks](https://img.shields.io/github/forks/GWen124/NavHub?style=social)](https://github.com/GWen124/NavHub)
[![GitHub license](https://img.shields.io/github/license/GWen124/NavHub)](https://github.com/GWen124/NavHub/blob/main/LICENSE)

[在线演示](https://navhub.gw124.top) | [快速开始](#-快速开始) | [功能详解](FEATURES.md) | [配置指南](#-配置指南) | [部署文档](DEPLOYMENT.md)

</div>

## ✨ 核心特性

### 🎨 视觉设计
- **响应式布局** - 完美适配桌面、平板、移动端
- **毛玻璃效果** - 现代化半透明设计
- **自定义主题** - 支持背景、颜色、字体全面定制
- **流畅动画** - 6种精美加载动画，平滑的过渡效果
- **自动变色** - 根据背景亮度自动切换文字颜色

### 🔧 强大功能
- **智能侧边栏** - 桌面端悬停展开，移动端滑动操作
- **自动图标** - 多源图标获取，智能回退机制
- **搜索集成** - 内置10+搜索引擎，一键切换
- **OAuth登录** - GitHub OAuth支持，白名单管理，隐藏分组
- **灵活配置** - 支持YAML配置、JSON文件、外部URL
- **Service Worker** - 离线访问支持

> 📚 **详细功能说明请查看 [功能文档](FEATURES.md)**

### 📦 配置方式

项目支持多种配置方式，适应不同场景需求：

| 配置方式 | 适用场景 | 优先级 |
|---------|---------|--------|
| `public/Website.json` | Fork后自定义网站列表 | 最高 ⭐ |
| `Website.json`（根目录） | 本地开发测试 | 高 |
| 外部URL配置 | 远程配置管理 | 中 |
| `src/config.ts` | 默认配置 | 低 |

## 🚀 快速开始

### 环境要求
- **Node.js** 16+ 
- **npm** 或 **yarn**

### 本地运行

```bash
# 1. 克隆项目
git clone https://github.com/GWen124/NavHub.git
cd NavHub

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 访问应用
# 打开浏览器访问 http://localhost:5173
```

### Fork后自定义

如果你想Fork此项目并自定义网站列表：

```bash
# 1. Fork并克隆你的仓库
git clone https://github.com/YOUR_USERNAME/NavHub.git
cd NavHub
npm install

# 2. 复制示例配置
cp Website.json.example public/Website.json

# 3. 编辑网站列表
vim public/Website.json

# 4. 修改项目配置（可选）
vim config.yml

# 5. 启动预览
npm run dev
```

配置文件格式：

```json
[
  {
    "name": "分组名称",
    "sites": [
      {
        "name": "网站名称",
        "url": "https://example.com",
        "icon": "https://example.com/favicon.ico"
      }
    ]
  }
]
```

## ⚙️ 配置指南

### 基础配置 (`config.yml`)

项目的核心配置文件，包含：

```yaml
# 页面标题和元信息
pageTitle: "发现 · 收藏 · 出发"
pageQuote: "你所喜爱的网站，一站汇聚。"

# 部署配置
deployment:
  customDomain: "your-domain.com"  # 自定义域名

# 背景配置
background:
  bingWallpaper: false  # 是否启用Bing每日壁纸
  image: ""  # 自定义背景图片URL
  bingMode: "localFirst"  # local先显示本地，30秒后切换

# 字体颜色配置
colors:
  autoColor: true  # 根据背景自动切换文字颜色
  manual:  # autoColor: false时生效
    header: "#000000"
    cardTitle: "#000000"
    footer: "#000000"

# 字体配置
fonts:
  header:
    fontA: "fonts/AnJingChenXinShouJinTi.ttf"  # 中文字体
    fontB: "fonts/brand.ttf"  # 英文/数字字体

# 自动图标配置
autoIcon:
  mode: 2  # 1=强制所有 2=空时获取 3=智能回退

# 分组排序
categorySorting:
  autoSort: true  # 自动按首字母排序
  pinnedCategories:  # 置顶分组
    - "Favorites - 常用网站"
  bottomCategories:  # 末尾分组
    - "Other - 其他"

# 网站排序
siteSorting:
  mode: 2  # 1=混合排序 2=中文在前 3=保持原序

# 外部配置（可选）
externalConfig:
  url: ""  # 外部网站配置URL

externalProjectConfig:
  url: ""  # 外部项目配置URL
```

### 网站配置

#### 方式一：public/Website.json（推荐）

```bash
# 复制示例
cp Website.json.example public/Website.json

# 编辑配置
# 此文件不会被Git跟踪，适合Fork后自定义
```

#### 方式二：根目录Website.json

```bash
# 复制示例
cp Website.json.example Website.json

# 编辑配置
# 同样被Git忽略
```

#### 方式三：外部URL配置

```yaml
# config.yml
externalConfig:
  url: "https://example.com/sites.json"
```

支持的外部URL：
- GitHub Gist
- 自建API
- CDN托管的JSON文件

#### 方式四：直接修改源码

```bash
# 编辑源文件
vim src/config.ts
```

### 图标配置

项目支持多种图标格式：

```json
{
  "name": "Google",
  "url": "https://google.com",
  "icon": "https://google.com/favicon.ico"  // 直接URL
}
```

```json
{
  "name": "GitHub", 
  "url": "https://github.com",
  "icon": "xicon:github"  // 使用xicon图标库
}
```

```json
{
  "name": "Vue",
  "url": "https://vuejs.org",
  "icon": ""  // 留空，自动获取图标
}
```

自动图标模式（`config.yml`）：
- `mode: 1` - 强制所有网站使用自动获取（忽略自定义图标）
- `mode: 2` - 仅当图标为空时自动获取（推荐）
- `mode: 3` - 智能回退（服务商失败时使用xicon/FontAwesome）

### Footer链接配置

编辑 `public/footer-links.json`：

```json
{
  "links": [
    {
      "name": "GitHub",
      "url": "https://github.com/GWen124",
      "icon": "fa-brands fa-github"
    },
    {
      "name": "邮箱",
      "url": "mailto:example@example.com",
      "icon": "fa-solid fa-envelope"
    }
  ]
}
```

## 🌐 部署指南

### GitHub Pages 部署

项目已配置自动部署到GitHub Pages：

1. **Fork本项目**

2. **配置GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `GitHub Actions`

3. **自定义配置（可选）**
   ```bash
   # 修改config.yml
   vim config.yml
   
   # 或创建Website.json
   cp Website.json.example public/Website.json
   vim public/Website.json
   ```

4. **推送触发部署**
   ```bash
   git add .
   git commit -m "自定义配置"
   git push
   ```

5. **手动触发（可选）**
   - 进入 Actions 标签
   - 选择 "Deploy to GitHub Pages"
   - 点击 "Run workflow"
   - 可在此填写外部配置URL

### 自定义域名

在 `config.yml` 中配置：

```yaml
deployment:
  customDomain: "nav.yourdomain.com"
```

然后在域名DNS添加CNAME记录指向：
```
USERNAME.github.io
```

### Docker 部署

```bash
# 构建镜像
docker build -t navhub .

# 运行容器
docker run -d -p 8080:80 navhub

# 使用docker-compose
docker-compose up -d
```

详细部署文档请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

## 📚 核心功能速览

| 功能类别 | 功能列表 |
|---------|---------|
| **搜索引擎** | Google, Bing, Baidu, GitHub, Stack Overflow, YouTube 等10+ |
| **背景系统** | Bing每日壁纸、自定义图片、视频背景、自动变色 |
| **图标来源** | Google Favicon, DuckDuckGo, Icon Horse, Clearbit, Brandfetch, xicon, Font Awesome |
| **分组管理** | 自动排序、置顶分组、末尾分组、隐藏分组 |
| **OAuth登录** | GitHub OAuth、白名单管理、访问控制 |
| **响应式设计** | 桌面端、平板端、移动端完美适配 |
| **字体系统** | A/B双字体、自定义字体、智能回退 |
| **性能优化** | 图标缓存、懒加载、Service Worker、代码分割 |

> 📖 **完整功能介绍和使用方法请查看 [FEATURES.md](FEATURES.md)**

## 🛠️ 开发指南

### 项目结构

```
NavHub/
├── public/              # 静态资源
│   ├── fonts/          # 字体文件
│   ├── footer-links.json
│   └── Website.json    # 网站配置(可选)
├── src/
│   ├── components/     # Vue组件
│   ├── config/         # 配置加载器
│   ├── stores/         # Pinia状态管理
│   ├── utils/          # 工具函数
│   └── views/          # 页面视图
├── scripts/            # 构建脚本
│   └── generate-config.js
├── config.yml          # 主配置文件
├── Website.json.example # 配置示例
└── package.json
```

### 开发命令

```bash
# 开发模式
npm run dev

# 类型检查
npm run type-check

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

### 配置生成

项目使用 `scripts/generate-config.js` 生成运行时配置：

```bash
# 手动生成配置
node scripts/generate-config.js

# 监听配置变化
node scripts/watch-config.js
```

### 自定义开发

1. **添加新组件**
   ```bash
   # 在src/components/下创建组件
   touch src/components/MyComponent.vue
   ```

2. **修改样式**
   ```bash
   # 编辑全局样式
   vim src/assets/main.css
   ```

3. **添加工具函数**
   ```bash
   # 在src/utils/下添加
   touch src/utils/myUtil.ts
   ```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue状态管理
- [Font Awesome](https://fontawesome.com/) - 图标库
- [xicons](https://www.xicons.org/) - Vue图标组件集合

## 📮 联系方式

- 项目地址: [https://github.com/GWen124/NavHub](https://github.com/GWen124/NavHub)
- 问题反馈: [Issues](https://github.com/GWen124/NavHub/issues)
- 在线演示: [https://navhub.gw124.top](https://navhub.gw124.top)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**

Made with ❤️ by [Wen](https://gw124.top)

</div>
