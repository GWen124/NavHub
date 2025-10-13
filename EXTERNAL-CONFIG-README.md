# 外部配置功能 - 快速参考

## 📦 已生成的文件

- ✅ `sites-config-template.json` - 当前网站配置的 JSON 模板（56 个分组）
- ✅ `EXTERNAL-CONFIG-GUIDE.md` - 详细使用指南
- ✅ `EXTERNAL-CONFIG-TEST.md` - 测试指南

## 🚀 快速开始

### 1. 上传配置模板

将 `sites-config-template.json` 上传到：
- GitHub Gist (推荐)
- 你的服务器
- jsDelivr CDN

### 2. 配置 config.yml

```yaml
externalConfig:
  enabled: true
  url: "你的配置文件 URL"
```

### 3. 构建和部署

```bash
npm run build    # 构建时会自动拉取外部配置
npm run deploy   # 或手动部署 dist 目录
```

## 🔧 工作原理

```
构建开始
  ↓
检查 config.yml 中的 externalConfig
  ↓
[enabled: true] → 从 URL 拉取配置
  ↓
成功 → 使用外部配置 | 失败 → 回退到本地配置
  ↓
应用分组排序（如果启用）
  ↓
生成静态文件
  ↓
构建完成
```

## ✨ 特性

- ✅ **构建时拉取** - 在构建阶段从外部 URL 加载配置
- ✅ **自动回退** - 拉取失败时自动使用本地配置
- ✅ **支持排序** - 完全兼容分组排序功能
- ✅ **自动备份** - 首次使用时自动备份原始配置
- ✅ **详细日志** - 构建时显示详细的配置加载信息

## 📝 配置说明

### config.yml 配置项

```yaml
externalConfig:
  enabled: false    # 是否启用外部配置（true/false）
  url: ""          # 外部配置文件 URL
```

### 回退策略

当 `enabled: true` 但外部配置不可用时：
1. 显示警告信息
2. 自动恢复本地 config.ts（如果有备份）
3. 继续构建，不会失败

## 📊 构建日志示例

### 使用本地配置

```
📝 使用本地 config.ts 配置

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 配置摘要:
   配置来源: 本地文件
   分组排序: 启用
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 使用外部配置

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

## 🔗 相关文档

- **详细指南**: 查看 `EXTERNAL-CONFIG-GUIDE.md`
- **测试方法**: 查看 `EXTERNAL-CONFIG-TEST.md`
- **配置模板**: 查看 `sites-config-template.json`

## ⚠️ 注意事项

1. **构建时需要网络** - 如果启用外部配置，构建时需要能访问外部 URL
2. **需要重新构建** - 修改外部配置后，需要重新构建才能生效
3. **保留备份文件** - 不要删除 `src/config.ts.backup`，以便随时回退
4. **GitHub Actions** - 在 CI/CD 环境中可以正常使用，确保 URL 公开可访问

## 🎯 使用场景

### 适合使用外部配置

- ✅ 网站列表经常变动
- ✅ 多人协作维护网站列表
- ✅ 希望集中管理配置
- ✅ 需要在不同项目间共享配置

### 适合使用本地配置

- ✅ 网站列表基本不变
- ✅ 个人项目，不需要协作
- ✅ 构建环境无网络访问
- ✅ 希望完全离线构建

