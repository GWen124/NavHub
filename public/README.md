# Public 目录说明

此目录用于存放公共资源文件，这些文件会在构建时被处理。

## 📁 文件说明

### Website.json（可选）

第三方仓库可以通过此文件自定义网站配置，而无需修改源代码。

**优先级：**
1. ✅ **public/Website.json**（最高优先级）- 本地配置文件
2. ⬇️ **外部 URL 配置**（config.yml 中的 externalConfig.url）
3. ⬇️ **src/config.ts**（默认配置）

**使用方法：**

1. 复制 `Website.json.example` 为 `Website.json`
2. 根据需要修改网站列表
3. 运行构建命令

**文件格式：**

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

**注意事项：**

- ⚠️ `Website.json` 不会被提交到 Git（已被 .gitignore 忽略）
- ✅ 只有 `Website.json.example` 会被提交作为示例
- 🔄 删除 `Website.json` 后，系统会自动回退到其他配置源

### footer-links.json

Footer 底部链接配置文件，构建时会自动加载。

### fonts/

字体文件目录，存放自定义字体文件。

## 🚀 第三方仓库使用指南

如果你 fork 了此项目并想自定义网站列表：

**方法一：使用 Website.json（推荐）**

```bash
# 1. 复制示例文件
cp public/Website.json.example public/Website.json

# 2. 编辑你的网站配置
vim public/Website.json

# 3. 构建项目
npm run build
```

**方法二：使用外部配置 URL**

在 `config.yml` 中设置：

```yaml
externalConfig:
  url: "https://example.com/sites-config.json"
```

**方法三：直接修改源代码**

修改 `src/config.ts` 文件（不推荐，会增加维护难度）

## 🔍 构建时的配置来源检测

运行 `npm run build` 时，系统会按以下顺序检测配置：

```
1. 检查 public/Website.json 是否存在
   ↓ 存在？使用它
   ↓ 不存在？继续

2. 检查 config.yml 中的 externalConfig.url
   ↓ 有 URL？尝试拉取
   ↓ 失败或为空？继续

3. 使用默认的 src/config.ts
```

构建日志会清晰显示使用了哪个配置源。

