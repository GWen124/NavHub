# Website.json 配置指南

本文档详细说明如何使用 `Website.json` 文件自定义你的网站列表。

## 📍 文件位置

项目支持两个位置的 `Website.json`（按优先级排序）：

1. **`public/Website.json`** ⭐ 推荐
   - 适合Fork后的自定义
   - 不会被Git跟踪
   - 不会出现在部署的网站中

2. **`Website.json`**（项目根目录）
   - 适合本地开发测试
   - 同样被Git忽略

## 🚀 快速开始

### 方法一：使用 public/Website.json（推荐）

```bash
# 1. 复制示例文件
cp Website.json.example public/Website.json

# 2. 编辑配置
vim public/Website.json

# 3. 启动预览
npm run dev
```

### 方法二：使用根目录Website.json

```bash
# 1. 复制示例文件
cp Website.json.example Website.json

# 2. 编辑配置
vim Website.json

# 3. 启动预览
npm run dev
```

## 📋 配置格式

### 基础结构

```json
[
  {
    "name": "分组名称",
    "sites": [
      {
        "name": "网站名称",
        "url": "https://example.com",
        "icon": "图标URL或标识"
      }
    ]
  }
]
```

### 完整示例

```json
[
  {
    "name": "常用工具",
    "sites": [
      {
        "name": "Google",
        "url": "https://google.com",
        "icon": "https://google.com/favicon.ico"
      },
      {
        "name": "GitHub", 
        "url": "https://github.com",
        "icon": "xicon:github"
      },
      {
        "name": "Vue.js",
        "url": "https://vuejs.org",
        "icon": ""
      }
    ]
  },
  {
    "name": "开发资源",
    "sites": [
      {
        "name": "MDN",
        "url": "https://developer.mozilla.org",
        "icon": "https://developer.mozilla.org/favicon.ico"
      },
      {
        "name": "Stack Overflow",
        "url": "https://stackoverflow.com",
        "icon": "xicon:stackoverflow"
      }
    ]
  }
]
```

## 🎨 图标配置

### 方式一：直接URL

```json
{
  "name": "Google",
  "url": "https://google.com",
  "icon": "https://google.com/favicon.ico"
}
```

### 方式二：使用xicon图标库

```json
{
  "name": "GitHub",
  "url": "https://github.com",
  "icon": "xicon:github"
}
```

常用xicon图标：
- `xicon:github` - GitHub
- `xicon:google` - Google
- `xicon:twitter` - Twitter
- `xicon:facebook` - Facebook
- `xicon:youtube` - YouTube
- `xicon:stackoverflow` - Stack Overflow
- `xicon:reddit` - Reddit
- `xicon:discord` - Discord

更多图标查看：[xicons.org](https://www.xicons.org/)

### 方式三：自动获取

```json
{
  "name": "Vue.js",
  "url": "https://vuejs.org",
  "icon": ""
}
```

留空时系统会自动从网站获取图标。

### 方式四：Font Awesome

```json
{
  "name": "设置",
  "url": "#",
  "icon": "fa fa-cog"
}
```

## ⚙️ 自动图标模式

在 `config.yml` 中配置自动图标行为：

```yaml
autoIcon:
  mode: 2
```

**模式说明：**

- **mode: 1** - 强制自动获取
  - 忽略所有自定义图标
  - 所有网站都使用自动获取的图标

- **mode: 2** - 智能混合（推荐）
  - 有图标：使用自定义图标
  - 无图标（空字符串）：自动获取
  - 最佳灵活性

- **mode: 3** - 智能回退
  - 优先使用自定义图标
  - 自定义图标加载失败时自动回退
  - 回退顺序：服务商 → xicon → Font Awesome → 文字图标

## 📦 配置优先级

系统按以下顺序查找配置：

```
1. public/Website.json       ← 最高优先级
   ↓ 不存在？
2. Website.json (根目录)
   ↓ 不存在？
3. externalConfig.url (config.yml中配置的外部URL)
   ↓ 不存在或失败？
4. src/config.ts             ← 默认配置
```

## 🔍 常见问题

### Q: 为什么推荐使用 public/Website.json？

**A:** 因为：
1. ✅ Fork后不影响原项目
2. ✅ 不会被Git跟踪，保护隐私
3. ✅ 不会出现在部署的网站中
4. ✅ 构建时自动检测和使用

### Q: 图标显示不出来怎么办？

**A:** 按以下步骤排查：
1. 检查图标URL是否正确
2. 检查网站是否允许跨域访问图标
3. 尝试留空让系统自动获取
4. 使用xicon图标库替代

### Q: 能否使用本地图标？

**A:** 可以，将图标放在 `public/` 目录：

```json
{
  "name": "我的网站",
  "url": "https://example.com",
  "icon": "/my-icon.png"
}
```

### Q: 如何批量获取图标？

**A:** 将所有网站的 `icon` 字段设为空字符串，然后设置：

```yaml
# config.yml
autoIcon:
  mode: 1  # 强制自动获取所有图标
```

### Q: 配置修改后需要重启吗？

**A:** 
- 开发模式（npm run dev）：需要刷新页面
- 生产模式：需要重新构建（npm run build）

## 🎯 最佳实践

### 1. 合理组织分组

```json
[
  {
    "name": "Favorites - 常用网站",
    "sites": []
  },
  {
    "name": "Development - 开发工具",
    "sites": []
  },
  {
    "name": "Social - 社交媒体",
    "sites": []
  },
  {
    "name": "Entertainment - 娱乐",
    "sites": []
  },
  {
    "name": "Other - 其他",
    "sites": []
  }
]
```

### 2. 使用置顶和末尾分组

在 `config.yml` 中配置：

```yaml
categorySorting:
  autoSort: true
  pinnedCategories:
    - "Favorites - 常用网站"
    - "Development - 开发工具"
  bottomCategories:
    - "Other - 其他"
```

### 3. 图标选择建议

- **优先使用xicon**：加载快，无跨域问题
- **知名网站**：直接使用官方favicon
- **小众网站**：留空自动获取
- **自定义内容**：使用Font Awesome图标

### 4. 性能优化

- 避免使用过大的图标文件
- 优先使用CDN托管的图标
- 合理控制网站数量（建议每组10-20个）

## 📝 完整模板

```json
[
  {
    "name": "Favorites - 常用网站",
    "sites": [
      {
        "name": "Google",
        "url": "https://google.com",
        "icon": "xicon:google"
      },
      {
        "name": "GitHub",
        "url": "https://github.com",
        "icon": "xicon:github"
      }
    ]
  },
  {
    "name": "Development - 开发工具",
    "sites": [
      {
        "name": "Vue.js",
        "url": "https://vuejs.org",
        "icon": ""
      },
      {
        "name": "MDN",
        "url": "https://developer.mozilla.org",
        "icon": ""
      },
      {
        "name": "Stack Overflow",
        "url": "https://stackoverflow.com",
        "icon": "xicon:stackoverflow"
      }
    ]
  },
  {
    "name": "Social - 社交媒体",
    "sites": [
      {
        "name": "Twitter",
        "url": "https://twitter.com",
        "icon": "xicon:twitter"
      },
      {
        "name": "YouTube",
        "url": "https://youtube.com",
        "icon": "xicon:youtube"
      }
    ]
  },
  {
    "name": "Other - 其他",
    "sites": [
      {
        "name": "Wikipedia",
        "url": "https://wikipedia.org",
        "icon": ""
      }
    ]
  }
]
```

## 🔗 相关文档

- [README.md](README.md) - 项目总览
- [config.yml 配置说明](README.md#-配置指南) - 项目配置
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南
- [DEVELOPMENT.md](DEVELOPMENT.md) - 开发指南

---

<div align="center">

需要帮助？[提交Issue](https://github.com/GWen124/NavHub/issues)

</div>
