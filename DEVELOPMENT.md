# 开发指南

本文档为 Website Panel 项目的开发者提供详细的开发指南和最佳实践。

## 🛠️ 开发环境设置

### 环境要求

- **Node.js**: 16.0+ 
- **npm**: 8.0+ 或 **yarn**: 1.22+
- **Git**: 2.0+

### 项目初始化

```bash
# 克隆项目
git clone <repository-url>
cd Website-Panel

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 开发工具推荐

- **IDE**: VS Code
- **插件**:
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin (Volar)
  - ESLint
  - Prettier
  - Auto Rename Tag
  - Bracket Pair Colorizer

## 📁 项目架构

### 目录结构

```
Website-Panel/
├── public/                 # 静态资源
│   ├── fonts/             # 字体文件
│   └── favicon.ico        # 网站图标
├── src/                   # 源代码
│   ├── components/        # Vue 组件
│   │   ├── Sidebar.vue    # 侧边栏组件
│   │   ├── SiteCard.vue   # 网站卡片组件
│   │   ├── AutoIcon.vue   # 自动图标组件
│   │   ├── ConfigPanel.vue # 配置面板组件
│   │   └── ...
│   ├── config/            # 配置相关
│   │   ├── configLoader.ts # 配置加载器
│   │   ├── generated.ts   # 生成的配置
│   │   ├── autoIconConfig.ts # 自动图标配置
│   │   └── ...
│   ├── utils/             # 工具函数
│   │   ├── iconUtils.ts   # 图标工具
│   │   ├── searchEngines.ts # 搜索引擎
│   │   ├── icons.ts       # 图标相关
│   │   └── xicons.ts      # X Icons 集成
│   ├── stores/            # 状态管理
│   │   ├── search.ts      # 搜索状态
│   │   └── theme.ts       # 主题状态
│   ├── views/             # 页面视图
│   │   └── HomeView.vue   # 主页
│   ├── router/            # 路由配置
│   │   └── index.ts       # 路由定义
│   ├── assets/            # 资源文件
│   │   ├── base.css       # 基础样式
│   │   ├── main.css       # 主样式
│   │   └── logo.svg       # Logo
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── config.ts          # 配置类型定义
├── config.yml             # 主配置文件
├── package.json           # 项目配置
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
└── README.md              # 项目说明
```

### 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式**: CSS3 + CSS Variables
- **状态管理**: Pinia
- **路由**: Vue Router
- **图标**: X Icons + 自定义图标
- **配置**: YAML

## 🎯 核心组件

### Sidebar 组件

负责侧边栏的显示和交互逻辑。

**主要功能**:
- 响应式设计（桌面/平板/移动端）
- 触摸滑动交互
- 鼠标悬停展开
- 键盘导航支持

**关键 Props**:
```typescript
interface Props {
  categories: Category[]
}
```

**关键方法**:
- `handleMouseEnter()`: 鼠标进入处理
- `handleMouseLeave()`: 鼠标离开处理
- `handleTouchStart()`: 触摸开始处理
- `handleTouchMove()`: 触摸移动处理
- `handleTouchEnd()`: 触摸结束处理

### SiteCard 组件

网站卡片组件，显示网站信息。

**主要功能**:
- 网站图标显示
- 自动图标获取
- 点击跳转
- 悬停效果

**关键 Props**:
```typescript
interface Props {
  site: Site
  categoryName: string
}
```

### AutoIcon 组件

自动图标获取组件。

**主要功能**:
- 多源图标获取
- 图标缓存管理
- 回退机制
- 加载状态显示

## ⚙️ 配置系统

### 配置加载流程

1. **YAML 解析**: 将 `config.yml` 解析为 JavaScript 对象
2. **类型验证**: 使用 TypeScript 类型验证配置
3. **CSS 变量设置**: 将配置转换为 CSS 变量
4. **组件更新**: 通知组件配置变更

### 配置类型定义

```typescript
interface AppConfig {
  title: string
  description: string
  author: string
  theme: ThemeConfig
  fonts: FontConfig
  sidebar: SidebarConfig
  sites: Category[]
  autoIcon: AutoIconConfig
  search: SearchConfig
  background: BackgroundConfig
}
```

### 添加新配置项

1. **更新类型定义**
```typescript
// src/config/index.ts
interface AppConfig {
  // 添加新配置项
  newFeature: NewFeatureConfig
}
```

2. **更新配置加载器**
```typescript
// src/config/configLoader.ts
export async function loadConfig(): Promise<void> {
  // 添加新配置项的加载逻辑
  if (config.newFeature) {
    // 处理新配置
  }
}
```

3. **更新 YAML 模板**
```yaml
# config.yml
newFeature:
  enabled: true
  options:
    - "option1"
    - "option2"
```

## 🎨 样式系统

### CSS 变量系统

项目使用 CSS 变量实现主题定制：

```css
:root {
  --primary-color: #3b82f6;
  --background-color: #f8fafc;
  --text-color: #1e293b;
  --sidebar-bg-opacity: 0.3;
  --sidebar-blur: 20px;
  --sidebar-saturation: 150%;
}
```

### 响应式设计

使用 CSS 媒体查询实现响应式设计：

```css
/* 移动端 */
@media (max-width: 768px) {
  .sidebar {
    /* 移动端样式 */
  }
}

/* 平板端 */
@media (min-width: 768px) and (max-width: 1024px) {
  .sidebar {
    /* 平板端样式 */
  }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .sidebar {
    /* 桌面端样式 */
  }
}
```

### 添加新样式

1. **创建样式文件**
```css
/* src/assets/components/new-component.css */
.new-component {
  /* 组件样式 */
}
```

2. **导入样式**
```typescript
// 在组件中导入
import './new-component.css'
```

## 🔧 工具函数

### 图标工具 (iconUtils.ts)

提供图标获取和管理功能：

```typescript
// 获取网站图标
export async function getWebsiteIcon(url: string): Promise<string>

// 获取缓存图标
export function getCachedIcon(url: string): string | null

// 保存图标缓存
export function saveIconCache(url: string, iconUrl: string): void
```

### 搜索引擎工具 (searchEngines.ts)

管理搜索引擎配置：

```typescript
// 获取搜索引擎列表
export function getSearchEngines(): SearchEngine[]

// 执行搜索
export function performSearch(query: string, engine: string): void
```

## 🧪 测试

### 单元测试

```bash
# 运行测试
npm run test

# 测试覆盖率
npm run test:coverage
```

### 组件测试示例

```typescript
import { mount } from '@vue/test-utils'
import SiteCard from '@/components/SiteCard.vue'

describe('SiteCard', () => {
  it('renders site name correctly', () => {
    const site = {
      name: 'Test Site',
      url: 'https://example.com',
      icon: 'https://example.com/icon.png'
    }
    
    const wrapper = mount(SiteCard, {
      props: { site, categoryName: 'Test Category' }
    })
    
    expect(wrapper.text()).toContain('Test Site')
  })
})
```

## 📦 构建和部署

### 开发构建

```bash
# 开发模式
npm run dev

# 构建预览
npm run build
npm run preview
```

### 生产构建

```bash
# 生产构建
npm run build

# 分析构建结果
npm run build:analyze
```

### 环境变量

创建 `.env` 文件配置环境变量：

```bash
# .env
VITE_API_BASE_URL=https://api.example.com
VITE_DEBUG_MODE=false
```

## 🐛 调试技巧

### Vue DevTools

安装 Vue DevTools 浏览器扩展进行调试：

1. 检查组件状态
2. 查看事件触发
3. 分析性能问题

### 控制台调试

```typescript
// 在组件中添加调试信息
console.log('Component mounted:', this.$data)

// 使用 Vue 的调试工具
this.$nextTick(() => {
  console.log('DOM updated')
})
```

### 网络调试

使用浏览器开发者工具：

1. **Network 标签**: 检查 API 请求
2. **Console 标签**: 查看错误信息
3. **Performance 标签**: 分析性能问题

## 📝 代码规范

### ESLint 配置

项目使用 ESLint 进行代码检查：

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint:fix
```

### 代码风格

- 使用 2 空格缩进
- 使用单引号
- 行尾不加分号
- 使用 TypeScript 严格模式

### Git 提交规范

使用 Conventional Commits 规范：

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

## 🚀 性能优化

### 代码分割

使用动态导入实现代码分割：

```typescript
// 懒加载组件
const LazyComponent = defineAsyncComponent(() => import('./LazyComponent.vue'))
```

### 图片优化

```typescript
// 图片懒加载
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      img.src = img.dataset.src!
      imageObserver.unobserve(img)
    }
  })
})
```

### 缓存策略

```typescript
// 图标缓存
const iconCache = new Map<string, string>()

export function getCachedIcon(url: string): string | null {
  return iconCache.get(url) || null
}
```

## 🤝 贡献指南

### 提交流程

1. **Fork 项目**
2. **创建功能分支**
```bash
git checkout -b feature/new-feature
```
3. **提交更改**
```bash
git commit -m "feat: add new feature"
```
4. **推送分支**
```bash
git push origin feature/new-feature
```
5. **创建 Pull Request**

### 代码审查

- 确保代码符合项目规范
- 添加必要的测试
- 更新相关文档
- 检查性能影响

## 📞 支持

如有开发问题，请：

1. 查看本文档
2. 搜索现有 Issue
3. 创建新的 Issue
4. 联系维护者

---

**Happy Coding!** 🎉
