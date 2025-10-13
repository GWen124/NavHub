# 外部网站配置使用指南

本项目支持在**构建时**从外部 URL 加载网站配置，让你可以轻松管理和更新网站列表，无需手动修改代码。

## 功能特点

- ✅ 构建时从外部 URL 动态拉取网站配置
- ✅ 拉取失败时自动回退到本地配置
- ✅ 支持分组排序功能
- ✅ 支持 JSON 格式的配置文件
- ✅ 自动备份和恢复本地配置
- ✅ 构建时显示详细的配置摘要

## 工作原理

### 构建时拉取（推荐）

1. **构建前**: 运行 `npm run build` 时，构建脚本会检查 `config.yml` 中的 `externalConfig` 配置
2. **拉取配置**: 如果启用了外部配置，脚本会从指定 URL 下载配置文件
3. **更新配置**: 下载成功后，会临时替换 `src/config.ts` 的内容（原始文件会备份）
4. **应用排序**: 如果启用了分组排序，会在构建时应用排序规则
5. **构建项目**: 使用更新后的配置构建静态文件
6. **自动回退**: 如果外部配置拉取失败，自动恢复本地 `config.ts` 并继续构建

## 使用步骤

### 1. 生成配置模板

运行以下命令生成当前配置的 JSON 模板：

```bash
node generate-template.js
```

这会在项目根目录生成 `sites-config-template.json` 文件。

### 2. 上传配置文件

将生成的 `sites-config-template.json` 上传到可公开访问的 URL，例如：

**选项 1: GitHub Gist**
1. 访问 https://gist.github.com
2. 创建新 Gist，粘贴 `sites-config-template.json` 内容
3. 点击 "Create public gist"
4. 点击 "Raw" 按钮获取原始文件 URL

**选项 2: 自己的服务器**
1. 上传到你的服务器
2. 确保文件可以通过 HTTP/HTTPS 访问
3. 需要正确设置 CORS 头部

**选项 3: 其他托管服务**
- jsDelivr: https://www.jsdelivr.com/
- Cloudflare Pages
- Vercel
- Netlify

### 3. 配置 config.yml

在 `config.yml` 中启用外部配置：

```yaml
externalConfig:
  # 是否启用外部配置
  enabled: true
  # 外部配置文件的 URL
  url: "https://gist.githubusercontent.com/你的用户名/xxx/raw/sites-config-template.json"
```

### 4. 构建项目

运行构建命令：

```bash
npm run build
```

构建过程中，你会看到类似的输出：

```
📦 检测到外部配置已启用
🌐 正在从外部 URL 拉取配置: https://...
✅ 成功拉取外部配置，包含 56 个分组
💾 已备份原始 config.ts 到 config.ts.backup
✅ 已使用外部配置更新 src/config.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 配置摘要:
   配置来源: 外部 URL
   URL: https://...
   分组排序: 启用
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 5. 部署

构建完成后，部署 `dist` 目录到你的服务器或 GitHub Pages。

## 自动回退机制

如果外部配置拉取失败，构建脚本会自动执行以下操作：

1. 显示警告信息：`⚠️ 外部配置拉取失败，回退到本地 config.ts`
2. 如果存在备份文件，自动恢复：`🔄 已从备份恢复本地配置`
3. 继续使用本地配置构建项目
4. 构建不会中断，确保项目可以正常部署

## 配置文件格式

外部配置文件必须是 JSON 格式的数组，每个元素代表一个分组：

```json
[
  {
    "name": "Favorites - 常用网站",
    "sites": [
      {
        "name": "Google",
        "url": "https://www.google.com",
        "icon": "https://example.com/icon.png"
      }
    ]
  }
]
```

### 字段说明

- `name`: 分组名称（必填）
- `sites`: 网站数组（必填）
  - `name`: 网站名称（必填）
  - `url`: 网站地址（必填）
  - `icon`: 图标 URL（可选，留空则自动获取）
  - `autoIcon`: 是否强制自动获取图标（可选）

## 更新配置流程

要更新网站列表：

1. **修改外部 JSON 文件**（在 Gist 或你的服务器上）
2. **重新构建项目**：`npm run build`
3. **部署更新**：将新的 `dist` 目录部署到服务器

注意：与浏览器缓存方式不同，构建时拉取需要重新构建才能应用更新。

## 优势对比

### 构建时拉取 vs 浏览器缓存

| 特性 | 构建时拉取（当前实现） | 浏览器缓存 |
|------|----------------------|-----------|
| 配置加载时机 | 构建时 | 用户访问时 |
| 支持分组排序 | ✅ 是 | ❌ 否 |
| 构建产物大小 | 静态，包含完整配置 | 静态，更小 |
| 更新方式 | 重新构建 | 刷新页面 |
| 网络依赖 | 构建时需要 | 用户访问时需要 |
| SEO 友好 | ✅ 是 | ⚠️ 延迟渲染 |
| 回退机制 | 构建时自动 | 运行时处理 |

## 高级用法

### 多环境配置

你可以为不同环境准备不同的配置文件：

**生产环境 (config.yml)**
```yaml
externalConfig:
  enabled: true
  url: "https://example.com/prod-sites.json"
```

**开发环境**
```yaml
externalConfig:
  enabled: false  # 使用本地配置，方便调试
```

### 配置文件版本管理

建议在外部配置中添加版本信息：

```json
[
  {
    "name": "version-info",
    "sites": [
      {
        "name": "配置版本",
        "url": "v1.0.0",
        "icon": ""
      }
    ]
  },
  ...其他分组
]
```

## 常见问题

### Q: 外部配置不生效？
A: 
1. 检查构建日志中是否有错误信息
2. 确认 URL 可以直接在浏览器中访问
3. 验证 JSON 格式是否正确（使用 JSONLint 等工具）
4. 确保 `externalConfig.enabled` 设置为 `true`

### Q: 如何切换回本地配置？
A: 
1. 在 `config.yml` 中设置 `externalConfig.enabled: false`
2. 如果需要，从 `config.ts.backup` 恢复原始配置
3. 重新构建项目

### Q: 构建失败怎么办？
A: 
外部配置拉取失败不会导致构建失败，脚本会自动回退到本地配置。
如果构建仍然失败，检查其他构建错误。

### Q: 可以使用私有配置吗？
A: 
构建时拉取方式不需要 CORS，但 URL 必须在构建环境中可访问。
如果使用 CI/CD（如 GitHub Actions），可以使用密钥管理私有 URL。

### Q: 配置文件太大怎么办？
A: 
1. 移除不常用的网站
2. 使用 CDN 托管以提高拉取速度
3. 考虑拆分为多个配置文件（需要自定义脚本）

### Q: GitHub Actions 构建时如何使用外部配置？
A: 
GitHub Actions 环境可以访问公开 URL，无需特殊配置。
确保外部配置 URL 是公开可访问的即可。

## 示例

### GitHub Gist 示例

```yaml
externalConfig:
  enabled: true
  url: "https://gist.githubusercontent.com/username/abc123def456/raw/sites.json"
```

### jsDelivr CDN 示例

```yaml
externalConfig:
  enabled: true
  url: "https://cdn.jsdelivr.net/gh/username/repo@main/sites-config.json"
```

### 自建服务器示例

```yaml
externalConfig:
  enabled: true
  url: "https://your-domain.com/sites-config.json"
```

## 最佳实践

1. **定期备份**：定期备份你的外部配置文件和本地 `config.ts.backup`
2. **版本控制**：使用 GitHub 等服务管理配置文件版本
3. **测试先行**：修改配置后，先本地构建测试，确认无误再部署
4. **监控构建**：关注 CI/CD 构建日志，确保外部配置正常拉取
5. **保留本地配置**：不要删除 `config.ts.backup`，以便随时回退

## 技术支持

如有问题，请查看：
- 构建日志输出
- `config.yml` 配置注释
- 项目 GitHub Issues

