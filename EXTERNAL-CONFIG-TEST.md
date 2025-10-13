# 外部配置功能测试

## 测试外部配置拉取

### 方法 1: 使用公开的测试 URL

你可以临时启用外部配置测试功能：

```bash
# 1. 将 sites-config-template.json 上传到 GitHub Gist
# 2. 修改 config.yml:
#    externalConfig:
#      enabled: true
#      url: "你的 Gist Raw URL"
# 3. 运行构建脚本
node scripts/generate-config.js
```

### 方法 2: 使用本地 HTTP 服务器测试

```bash
# 启动本地服务器
npx http-server . -p 8080 --cors

# 在另一个终端修改 config.yml:
# externalConfig:
#   enabled: true
#   url: "http://localhost:8080/sites-config-template.json"

# 运行构建脚本
node scripts/generate-config.js
```

## 预期输出

### 成功拉取外部配置

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

✅ 配置已生成到 src/config/generated.ts
```

### 拉取失败（回退到本地配置）

```
📦 检测到外部配置已启用
🌐 正在从外部 URL 拉取配置: https://...
❌ 拉取外部配置失败: HTTP 404: Not Found
⚠️  外部配置拉取失败，回退到本地 config.ts
💡 将继续使用本地配置文件构建项目

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 配置摘要:
   配置来源: 本地文件
   分组排序: 启用
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 配置已生成到 src/config/generated.ts
```

## 验证步骤

1. **检查 src/config.ts**
   - 如果使用外部配置，文件开头会有注释：`// 网站配置数据 (从外部配置生成)`
   - 如果使用本地配置，保持原样

2. **检查备份文件**
   - 首次使用外部配置后，会生成 `src/config.ts.backup`

3. **构建项目**
   ```bash
   npm run build
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

## 恢复本地配置

如果想恢复到本地配置：

```bash
# 方法 1: 禁用外部配置
# 在 config.yml 中设置: externalConfig.enabled: false
# 然后运行
node scripts/generate-config.js

# 方法 2: 手动恢复备份
cp src/config.ts.backup src/config.ts
```

